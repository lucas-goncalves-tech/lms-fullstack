import { User } from "./user.interface";

export type CreateUserInput = Pick<User, "name" | "email" | "password_hash">;
