import { CreateUserInput, User } from "./user.interface";

export interface IUserRepository{
    createUser(user: CreateUserInput): Promise<User>
}