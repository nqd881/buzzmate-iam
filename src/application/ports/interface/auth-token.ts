import {User} from "@domain/models";

export interface AccessTokenPayload {
  rootUserId: string;
  name: string;
  emailAddress: string;
  status: string;
}

export interface RefreshTokenPayload {
  rootUserId: string;
}

export type AuthToken = string;

export interface IAuthTokenService {
  signAccessToken(user: User): AuthToken;
  signRefreshToken(user: User): AuthToken;

  verifyAccessToken(token: AuthToken): AccessTokenPayload;
  verifyRefreshToken(token: AuthToken): RefreshTokenPayload;
}
