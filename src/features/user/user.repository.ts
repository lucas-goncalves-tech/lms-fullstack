import { DataBase } from "../../db";
import { users } from "../../db/schema";
import { IUserRepository } from "./interface/user-repo.interface";
import { CreateUserInput, User } from "./interface/user.interface";

export class UserRepository implements IUserRepository {
  constructor(private readonly db: DataBase) {}

  async createUser(user: CreateUserInput): Promise<User> {
    try {
      const newUser = this.db.connection.insert(users).values(user).returning().get();
      return newUser;
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      throw err;
    }
  }
}
