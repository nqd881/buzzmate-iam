import {IUserProps, User} from "../models";
import {Password} from "../models/user/password";
import {PasswordHashingDomainService} from "./password-hashing";

export class UserDomainService {
  static async create(props: IUserProps) {
    const hashedPassword = await PasswordHashingDomainService.hashPassword(
      props.password
    );

    return User.create({...props, password: hashedPassword});
  }

  static async changePassword(anUser: User, newPassword: Password) {
    const hashedPassword = await PasswordHashingDomainService.hashPassword(
      newPassword
    );

    anUser.changePassword(hashedPassword);
  }
}
