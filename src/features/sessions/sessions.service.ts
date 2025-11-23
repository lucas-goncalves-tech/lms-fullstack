import { SessionError } from "../../shared/errors/session.error";
import { CryptoService } from "../../shared/security/crypto-service.security";
import { UserRepository } from "../user/user.repository";
import { ISessionData } from "./interface/sessions.interface";
import { SessionsRepository } from "./sessions.repository";

export class SessionsService {
  private readonly ttl15d = 1000 * 60 * 60 * 24 * 15;
  constructor(
    private readonly sessionsRepository: SessionsRepository,
    private readonly userRepository: UserRepository,
    private readonly cryptoService: CryptoService
  ) {}

  async createSession(sessionData: ISessionData) {
    const sid = (await this.cryptoService.randomBytesAsync(32)).toString("base64url");
    const sidHash = this.cryptoService.sha256(sid);
    const expires_ms = Date.now() + this.ttl15d;

    await this.sessionsRepository.createSession({
      sidHash,
      expires_ms,
      ...sessionData,
    });

    return sid;
  }

  async validateSession(sid: string) {
    const now = Date.now();
    const sidHash = this.cryptoService.sha256(sid);
    const session = await this.sessionsRepository.findSessionBySidHash(sidHash);
    if (!session || session.revoked === 1) {
      throw new SessionError();
    }

    if (now >= session.expires_ms) {
      await this.sessionsRepository.revokeSessionByKey("sidHash", sidHash);
      throw new SessionError();
    }
    const timeUntilExpire = session.expires_ms - now;
    let expires_ms = session.expires_ms;
    let renewed = false;
    if (timeUntilExpire < this.ttl15d / 2) {
      expires_ms = now + this.ttl15d;
      await this.sessionsRepository.updateExpiresBySidHash(sidHash, expires_ms);
      renewed = true;
    }
    const userRole = await this.userRepository.findUserRole(session.userId);
    if (!userRole) {
      await this.sessionsRepository.revokeSessionByKey("userId", session.userId);
      throw new SessionError();
    }

    return {
      userId: session.userId,
      expires_ms: expires_ms - now,
      userRole,
      renewed,
    };
  }

  async revokeSession(sid: string) {
    const sidHash = this.cryptoService.sha256(sid);
    await this.sessionsRepository.revokeSessionByKey("sidHash", sidHash);
  }
}
