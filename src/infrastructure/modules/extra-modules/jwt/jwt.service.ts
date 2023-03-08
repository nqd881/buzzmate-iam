import {Injectable} from "@nestjs/common";
import {IJwtService, JwtToken} from "src/application/ports/interface/jwt";
import jwt from "jsonwebtoken";
import {ConfigService} from "@nestjs/config";
import {EnvNames} from "src/infrastructure/env/env.name";
import {User} from "@domain/models";

export interface JwtAccessTokenPayload {
  userId: string;
  name: string;
  emailAddress: string;
  status: string;
}

export interface JwtRefreshTokenPayload {
  userId: string;
}

@Injectable()
export class JwtService
  implements IJwtService<JwtAccessTokenPayload, JwtRefreshTokenPayload>
{
  constructor(private env: ConfigService) {}

  private getAccessTokenPayload(user: User): JwtAccessTokenPayload {
    return {
      userId: user.id.value,
      name: user.person.name.fullName,
      emailAddress: user.email.address,
      status: user.status,
    };
  }

  private getRefershTokenPayload(user: User): JwtRefreshTokenPayload {
    return {
      userId: user.id.value,
    };
  }

  signAccessToken(user: User) {
    const payload = this.getAccessTokenPayload(user);

    return jwt.sign(payload, this.env.get(EnvNames.JWT_ACCESS_TOKEN_SECRET));
  }

  signRefreshToken(user: User) {
    const payload = this.getRefershTokenPayload(user);

    return jwt.sign(payload, this.env.get(EnvNames.JWT_REFRESH_TOKEN_SECRET));
  }

  verifyAccessToken(token: JwtToken) {
    return jwt.verify(
      token,
      this.env.get(EnvNames.JWT_ACCESS_TOKEN_SECRET)
    ) as JwtAccessTokenPayload;
  }

  verifyRefreshToken(token: any) {
    return jwt.verify(
      token,
      this.env.get(EnvNames.JWT_REFRESH_TOKEN_SECRET)
    ) as JwtRefreshTokenPayload;
  }
}
