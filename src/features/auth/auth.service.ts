import { ConflictError } from "../../shared/errors/conflict.error";
import { UnauthorizedError } from "../../shared/errors/unauthorized.error";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { CreateUserInput } from "../user/interface/user.interface";
import { UserRepository } from "../user/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";

export class AuthService {
  private readonly cryptoService = new CryptoService();
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(user: CreateUserDto) {
    const userExist = await this.userRepository.findUserByKey("email", user.email);
    if (userExist) throw new ConflictError("Email já cadastrado");

    const hashedPassword = await this.cryptoService.hash(user.password);
    const userData: CreateUserInput = {
      name: user.name,
      email: user.email,
      password_hash: hashedPassword,
    };
    const result = await this.userRepository.createUser(userData);
    if (!result) throw new ConflictError("Email já cadastrado");
    return result;
  }

  async loginUser(userData: LoginUserDto) {
    const userExist = await this.userRepository.findUserByKey("email", userData.email);
    if (!userExist) throw new UnauthorizedError("Email ou senha inválidos");
    const isPasswordValid = await this.cryptoService.compareHash(
      userData.password,
      userExist.password_hash
    );
    if (!isPasswordValid) throw new UnauthorizedError("Email ou senha inválidos");

    return userExist.id;
  }

  async updatePassword(userId: string, updatePasswordData: UpdatePasswordDto) {
    const userExist = await this.userRepository.findUserByKey("id", userId);
    if (!userExist) throw new UnauthorizedError("Sessão inválida");

    const isPasswordValid = await this.cryptoService.compareHash(
      updatePasswordData.currentPassword,
      userExist.password_hash
    );
    if (!isPasswordValid) throw new UnauthorizedError("Senha atual inválida");
    const newHashedPassword = await this.cryptoService.hash(updatePasswordData.newPassword);

    await this.userRepository.updateUserPassword(userId, newHashedPassword);
  }
}
