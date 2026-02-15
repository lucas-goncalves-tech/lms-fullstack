import { ConflictError } from "../../shared/errors/conflict.error";
import { ForbiddenError } from "../../shared/errors/forbidden.error";
import { UnauthorizedError } from "../../shared/errors/unauthorized.error";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { ICreateUserInput } from "../user/interface/user.interface";
import { UserRepository } from "../user/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";

export class AuthService {
  private readonly cryptoService = new CryptoService();
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: CreateUserDto) {
    const userExist = await this.userRepository.findByKey("email", userData.email);
    if (userExist) throw new ConflictError("Email já cadastrado");

    const hashedPassword = await this.cryptoService.hash(userData.password);
    const newUser: ICreateUserInput = {
      name: userData.name,
      email: userData.email,
      password_hash: hashedPassword,
    };
    const result = await this.userRepository.create(newUser);
    if (!result) throw new ConflictError("Email já cadastrado");
    return result;
  }

  async loginUser(userData: LoginUserDto) {
    const userExist = await this.userRepository.findByKey("email", userData.email);
    if (!userExist) throw new UnauthorizedError("Email ou senha inválidos");
    if (userExist.isActive === 0)
      throw new ForbiddenError("Conta desativada, entre em contato com o suporte");
    const isPasswordValid = await this.cryptoService.compareHash(
      userData.password,
      userExist.password_hash
    );
    if (!isPasswordValid) throw new UnauthorizedError("Email ou senha inválidos");

    return userExist.id;
  }
}
