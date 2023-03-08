import {User} from "../models";
import {Password} from "../models/user/password";
import {PasswordHashingService} from "./password-hashing";

export class AuthenDomainService {
  static async authenticate(
    anUser: User,
    aPassword: Password
  ): Promise<boolean> {
    const hashedPassword = await PasswordHashingService.hashPassword(aPassword);

    return anUser.password.equals(hashedPassword);
  }
}
