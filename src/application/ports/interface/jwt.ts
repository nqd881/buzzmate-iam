import {User} from "@domain/models";

export type JwtToken = string;

export interface IJwtService<
  AccessTokenPayload = any,
  RefreshTokenPayload = any
> {
  signAccessToken(user: User): JwtToken;
  signRefreshToken(user: User): JwtToken;

  verifyAccessToken(token: JwtToken): AccessTokenPayload;
  verifyRefreshToken(token: JwtToken): RefreshTokenPayload;
}
