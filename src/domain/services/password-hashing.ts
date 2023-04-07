import {Password} from "../models/user/password";
import bcrypt from "bcrypt";

export abstract class PasswordHashingDomainService {
  private static PASSWORD_SALT_ROUND = 12;

  private static hashPlainTextPassword(plainTextPassword: string) {
    return bcrypt.hash(plainTextPassword, this.PASSWORD_SALT_ROUND);
  }

  static async hashPassword(aPassword: Password): Promise<Password> {
    if (aPassword.isHashed) throw new Error("The password is already hashed");

    const hashedValue = await this.hashPlainTextPassword(aPassword.value);

    return Password.withHashed(hashedValue);
  }
}
