import { eq, sql } from "drizzle-orm";
import { DataBase } from "../../db";
import { users } from "../../db/schema";
import {
  IAdminCreateUserInput,
  ICreateUserInput,
  IUpdateUserInput,
} from "./interface/user.interface";

export class UserRepository {
  constructor(private readonly db: DataBase) {}

  async findMany() {
    try {
      return this.db.connection
        .select({
          id: users.id,
          name: users.name,
          email: users.email,
          role: users.role,
          isActive: users.isActive,
        })
        .from(users)
        .all();
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
      throw err;
    }
  }

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
          isActive: users.isActive,
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

  async createUser(user: ICreateUserInput | IAdminCreateUserInput) {
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

  async updateUser(userId: string, userData: Partial<IUpdateUserInput>) {
    try {
      await this.db.connection.update(users).set(userData).where(eq(users.id, userId)).execute();
    } catch (err) {
      console.error(`Erro ao atualizar usuário:`, err);
      throw err;
    }
  }

  async toggleUserStatus(userId: string) {
    try {
      return this.db.connection
        .update(users)
        .set({ isActive: sql`NOT ${users.isActive}` })
        .where(eq(users.id, userId))
        .returning({
          name: users.name,
          isActive: users.isActive,
        })
        .get();
    } catch (err) {
      console.error(`Erro ao alterar status do usuário:`, err);
      throw err;
    }
  }
}
