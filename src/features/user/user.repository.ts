import { eq } from "drizzle-orm";
import { DataBase } from "../../db";
import { users } from "../../db/schema";
import { CreateUserInput } from "./interface/user.interface";

export class UserRepository {
  constructor(private readonly db: DataBase) {}

  async findUserByKey(key: "email" | "id", value: string) {
    try {
      const result = this.db.connection.select().from(users).where(eq(users[key], value)).get();
      return result ?? null;
    } catch (err) {
      console.error(`Erro ao buscar usuário por ${key}:`, err);
      throw err;
    }
  }

  async findUserSessionInfo(userId: string) {
    try {
      const result = this.db.connection
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
        })
        .from(users)
        .where(eq(users.id, userId))
        .get();
      return result ?? null;
    } catch (err) {
      console.error(`Erro ao buscar informações de sessão do usuário:`, err);
      throw err;
    }
  }

  async createUser(user: CreateUserInput) {
    try {
      const result = this.db.connection
        .insert(users)
        .values(user)
        .onConflictDoNothing()
        .returning({
          name: users.name,
          email: users.email,
          role: users.role,
        })
        .get();
      return result ?? null;
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      throw err;
    }
  }

  async updateUserPassword(userId: string, password_hash: string) {
    try {
      await this.db.connection
        .update(users)
        .set({ password_hash })
        .where(eq(users.id, userId))
        .execute();
    } catch (err) {
      console.error(`Erro ao atualizar senha do usuário:`, err);
      throw err;
    }
  }
}
