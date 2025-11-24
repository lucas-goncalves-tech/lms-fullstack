import { DataBase } from "../../db";
import { certificates } from "../../db/schema";

export class CertificateRepository {
  constructor(private readonly db: DataBase) {}

  async create(userId: string, courseId: string) {
    try {
      return this.db.connection
        .insert(certificates)
        .values({ userId, courseId })
        .onConflictDoNothing()
        .returning({ id: certificates.id })
        .get();
    } catch (error) {
      console.error("Error ao criar certificado", error);
      throw error;
    }
  }
}
