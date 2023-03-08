import {User} from "@domain/models";

export interface ITfaService {
  generateCode(user: User, type: string): string;

  verifyCode(user: User, type: string, code: string): boolean;
}
