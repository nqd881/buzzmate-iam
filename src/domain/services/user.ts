import {IUserProps, User} from "../models";
import {Password} from "../models/user/password";
import {PasswordHashingService} from "./password-hashing";

export class UserDomainService {
  static async create(props: IUserProps) {
    const hashedPassword = await PasswordHashingService.hashPassword(
      props.password
    );

    return User.create({...props, password: hashedPassword});
  }

  static async changePassword(anUser: User, newPassword: Password) {
    const hashedPassword = await PasswordHashingService.hashPassword(
      newPassword
    );

    anUser.changePassword(hashedPassword);
  }
}
