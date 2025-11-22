import { users } from "../../../db/schema";

export type IUser = typeof users.$inferSelect;
export type CreateUserInput = Pick<IUser, "name" | "email" | "password_hash">;
