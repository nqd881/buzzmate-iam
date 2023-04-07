import {
  AccessTokenPayload,
  AuthToken,
  IAuthTokenService,
  RefreshTokenPayload,
} from "@application/ports/interface/auth-token";
import {User} from "@domain/models";
import {Injectable} from "@nestjs/common";
import fs from "fs";
import jwt from "jsonwebtoken";

@Injectable()
export class JwtService implements IAuthTokenService {
  private PRIVATE_KEY: Buffer = null;
  private PUBLIC_KEY: Buffer = null;

  constructor() {
    this.PRIVATE_KEY = fs.readFileSync(
      "src/infrastructure/env/jwt-keys/private.key"
    );

    this.PUBLIC_KEY = fs.readFileSync(
      "src/infrastructure/env/jwt-keys/public.key"
    );
  }

  private getAccessTokenPayload(user: User): AccessTokenPayload {
    return {
      rootUserId: user.id.value,
      name: user.person.name.fullName,
      emailAddress: user.email.address,
      status: user.status,
    };
  }

  private getRefershTokenPayload(user: User): RefreshTokenPayload {
    return {
      rootUserId: user.id.value,
    };
  }

  signAccessToken(user: User) {
    const payload = this.getAccessTokenPayload(user);

    return jwt.sign(payload, this.PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: "1d",
    });
  }

  signRefreshToken(user: User) {
    const payload = this.getRefershTokenPayload(user);

    return jwt.sign(payload, this.PRIVATE_KEY, {
      algorithm: "RS256",
      expiresIn: "30d",
    });
  }

  verifyAccessToken(token: AuthToken) {
    return jwt.verify(token, this.PUBLIC_KEY) as AccessTokenPayload;
  }

  verifyRefreshToken(token: AuthToken) {
    return jwt.verify(token, this.PUBLIC_KEY) as RefreshTokenPayload;
  }
}
