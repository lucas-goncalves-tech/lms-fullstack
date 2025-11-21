import { users } from "../../../db/schema";

export type User = typeof users.$inferSelect
export type CreateUserInput = Pick<User, 'name' | 'email' | 'password_hash'> 