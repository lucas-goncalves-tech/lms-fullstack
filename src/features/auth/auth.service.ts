import { ConflictError } from "../../shared/errors/conflict.error";
import { UserRepository } from "../user/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUserDto) {
    const result = await this.userRepository.createUser({ ...user, password_hash: user.password });
    if (!result) throw new ConflictError("Usuário já cadastrado");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password_hash, id, ...rest } = result;
    return rest;
  }
}
