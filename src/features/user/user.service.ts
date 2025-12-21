import path from "node:path";
import { ConflictError } from "../../shared/errors/conflict.error";
import { NotfoundError } from "../../shared/errors/not-found.error";
import { UnauthorizedError } from "../../shared/errors/unauthorized.error";
import { UnprocessableEntityError } from "../../shared/errors/unprocessable-entity.error";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { UploadService } from "../upload/upload.service";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { UserRepository } from "./user.repository";

export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService,
    private readonly uploadService: UploadService
  ) {}

  async updatePassword(userId: string, updatePasswordData: UpdatePasswordDto) {
    const userExist = await this.userRepository.findByKey("id", userId);
    if (!userExist) throw new UnauthorizedError("Sessão inválida");

    const isPasswordValid = await this.cryptoService.compareHash(
      updatePasswordData.currentPassword,
      userExist.password_hash
    );
    if (!isPasswordValid) throw new UnprocessableEntityError("Senha atual inválida");
    const newHashedPassword = await this.cryptoService.hash(updatePasswordData.newPassword);

    await this.userRepository.update(userExist.id, { password_hash: newHashedPassword });
  }

  async updateEmail(userId: string, newEmail: string) {
    const userExist = await this.userRepository.findByKey("id", userId);
    if (!userExist) throw new UnauthorizedError("Sessão inválida");
    const emailExist = await this.userRepository.findByKey("email", newEmail);
    if (emailExist) throw new ConflictError("Email já está em uso");

    await this.userRepository.update(userExist.id, { email: newEmail });
  }

  async updateAvatar(userId: string, newAvatarPath: string) {
    const userExist = await this.userRepository.findByKey("id", userId);
    if (!userExist) throw new UnauthorizedError("Sessão inválida");
    const avatarExist = await this.uploadService.fileExist(newAvatarPath);
    if (!avatarExist) throw new NotfoundError("Avatar não encontrado");

    if (userExist.avatar && userExist.avatar !== newAvatarPath) {
      await this.uploadService.rm(userExist.avatar);
    }

    await this.userRepository.update(userExist.id, { avatar: newAvatarPath });
  }

  async findAvatarPath(userId: string) {
    const userExist = await this.userRepository.findByKey("id", userId);
    if (!userExist) throw new UnauthorizedError("Sessão inválida");
    if (!userExist.avatar) {
      return null;
    }
    const fileExist = await this.uploadService.fileExist(userExist.avatar);
    if (!fileExist) throw new NotfoundError("Avatar não encontrado");
    const absolutePath = path.resolve(`./${userExist.avatar}`);
    return absolutePath;
  }
}
