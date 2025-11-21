import { CreateUserInput } from "./create-user.interface";
import { User } from "./user.interface";

export interface IUserRepository {
  createUser(user: CreateUserInput): Promise<User | null>;
}
