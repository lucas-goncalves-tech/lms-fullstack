import { DataBase } from "../../db";
import { users } from "../../db/schema";
import { CreateUserInput } from "./interface/create-user.interface";
import { IUserRepository } from "./interface/user-repo.interface";

export class UserRepository implements IUserRepository {
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
