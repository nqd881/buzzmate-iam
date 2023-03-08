import {EmailAddress, PhoneNumber, User, UserId} from "@domain/models";
import {IRepositoryBase} from "@libs/ddd/repository";

export interface IUserRepo extends IRepositoryBase<User> {
  findOneByUsername(...username: string[]): Promise<User>;
  findOneByEmail(...emailAddresses: EmailAddress[]): Promise<User>;
  findOneByPhone(...phoneNumber: PhoneNumber[]): Promise<User>;
}
