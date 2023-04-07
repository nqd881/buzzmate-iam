import {User} from "../models";
import {Password} from "../models/user/password";
import bcrypt from "bcrypt";

export class AuthenDomainService {
  static async authenticate(
    anUser: User,
    aPassword: Password
  ): Promise<boolean> {
    if (aPassword.isHashed)
      throw new Error("Cannot pass hashed password to authenticate");

    return bcrypt.compare(aPassword.value, anUser.password.value);
  }
}
