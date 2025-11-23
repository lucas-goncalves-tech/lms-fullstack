import { ConflictError } from "../../shared/errors/conflict.error";
import { UnauthorizedError } from "../../shared/errors/unauthorized.error";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { UserRepository } from "../user/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

export class AuthService {
  private readonly cryptoService = new CryptoService();
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUserDto) {
    const hashedPassword = await this.cryptoService.hash(user.password);
    const result = await this.userRepository.createUser({ ...user, password_hash: hashedPassword });
    if (!result) throw new ConflictError("Usuário já cadastrado");
    return result;
  }

  async loginUser(userData: LoginUserDto) {
    const userExist = await this.userRepository.findUserByEmail(userData.email);
    if (!userExist) throw new UnauthorizedError("Email ou senha inválidos");
    const isPasswordValid = await this.cryptoService.compareHash(
      userData.password,
      userExist.password_hash
    );
    if (!isPasswordValid) throw new UnauthorizedError("Email ou senha inválidos");
    return userExist;
  }
}
