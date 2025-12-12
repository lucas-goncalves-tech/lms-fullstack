import { ConflictError } from "../../shared/errors/conflict.error";
import { UnauthorizedError } from "../../shared/errors/unauthorized.error";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { ICreateUserInput } from "../user/interface/user.interface";
import { UserRepository } from "../user/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";

export class AuthService {
  private readonly cryptoService = new CryptoService();
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: CreateUserDto) {
    const userExist = await this.userRepository.findUserByKey("email", userData.email);
    if (userExist) throw new ConflictError("Email já cadastrado");

    const hashedPassword = await this.cryptoService.hash(userData.password);
    const newUser: ICreateUserInput = {
      name: userData.name,
      email: userData.email,
      password_hash: hashedPassword,
    };
    const result = await this.userRepository.createUser(newUser);
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
