import { DataBase } from "../../db";
import { users } from "../../db/schema";
import { CreateUserInput } from "./interface/user.interface";

export class UserRepository {
  constructor(private readonly db: DataBase) {}

  async createUser(user: CreateUserInput) {
    try {
      const result = this.db.connection
        .insert(users)
        .values(user)
        .onConflictDoNothing()
        .returning()
        .get();
      if (!result) {
        return null;
      }
      return result;
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      throw err;
    }
  }
}
