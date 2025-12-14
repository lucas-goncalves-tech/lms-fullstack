import { fileTypeFromBuffer } from "file-type";
import path from "node:path";
import { envCheck } from "../../shared/helper/env-check.helper";
import { randomUUID } from "node:crypto";
import { Transform } from "node:stream";
import { BadRequestError } from "../../shared/errors/bad-request.error";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { access, mkdir, rename, rm } from "node:fs/promises";

export class VideoService {
  private readonly MAX_BYTES = 500 * 1024 * 1024; // 500 mb
  private readonly ALLOWED_TYPES = ["video/mp4", "video/webm"];
  private readonly UPLOAD_DEST = envCheck().UPLOAD_DEST;
  private readonly TMP_UPLOAD_DEST = envCheck().TMP_UPLOAD_DEST;
  constructor() {}

  async save(stream: NodeJS.ReadableStream, fileName: string) {
    const ext = path.extname(fileName) ?? ".mp4";
    const uniqueName = `${randomUUID()}${ext}`;
    const tmpPath = path.join(this.TMP_UPLOAD_DEST, `/${uniqueName}.tmp`);
    const finalPath = path.join(this.UPLOAD_DEST, `/${uniqueName}`);

    let fileSize = 0;
    let isFirstChunk = true;
    const maxBytes = this.MAX_BYTES;
    const allowedTypes = this.ALLOWED_TYPES;

    const validator = new Transform({
      async transform(chunk, _enc, next) {
        fileSize += chunk.length;

        if (fileSize > maxBytes) {
          new BadRequestError(`Tamanho de arquivo ultrapassa os ${maxBytes}mb`);
        }

        if (isFirstChunk) {
          isFirstChunk = false;
          const fileType = await fileTypeFromBuffer(chunk);

          if (!fileType || !allowedTypes.includes(fileType?.mime)) {
            next(new BadRequestError(`Somente ${allowedTypes.join(", ")} são permitidos`));
          }
        }

        next(null, chunk);
      },
    });

    await mkdir(path.dirname(tmpPath), { recursive: true });
    await mkdir(path.dirname(finalPath), { recursive: true });
    const writeStream = createWriteStream(tmpPath, { flags: "wx" });

    try {
      await pipeline(stream, validator, writeStream);
      await rename(tmpPath, finalPath);
      return { path: finalPath };
    } catch (error) {
      await rm(tmpPath, { force: true }).catch(() => {});
      throw error;
    }
  }

  async rm(filePath: string) {
    const absolutePath = path.resolve(filePath);
    const uploadsDir = path.resolve(this.UPLOAD_DEST);

    if (!absolutePath.startsWith(uploadsDir)) {
      throw new BadRequestError("Path inválido");
    }

    await rm(absolutePath, { force: true });
  }

  async fileExist(filePath: string) {
    try {
      await access(filePath);
      return true;
    } catch {
      return false;
    }
  }
}
