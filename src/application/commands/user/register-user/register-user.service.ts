import {
  BirthDate,
  EmailAddress,
  Name,
  PhoneNumber,
  UserStatus,
} from "@domain/models";
import {Password} from "@domain/models/user/password";
import {IUserRepo} from "@domain/models/user/user-repo.interface";
import {UserDomainService} from "@domain/services/user";
import {Inject} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Repositories} from "src/application/di-tokens/repositories";
import {RegisterUserCommand} from "./register-user.command";

@CommandHandler(RegisterUserCommand)
export class RegisterUserService implements ICommandHandler {
  constructor(@Inject(Repositories.User) private userRepo: IUserRepo) {}

  private async checkUsername(username: string) {
    const user = await this.userRepo.findOneByUsername(username);

    if (user) throw new Error("Username have been used");
  }

  private async checkEmailAddress(emailAddress: string) {
    const emailAddresses = EmailAddress.allOf(emailAddress);

    const user = await this.userRepo.findOneByEmail(...emailAddresses);

    if (user) throw new Error("Email address have been used");
  }

  async execute(aCommand: RegisterUserCommand) {
    const {
      username,
      password,
      emailAddress,
      phoneNumber,
      firstName,
      lastName,
      birthDate,
      gender,
    } = aCommand;

    await this.checkUsername(username);
    await this.checkEmailAddress(emailAddress);

    const newUser = await UserDomainService.create({
      username,
      password: Password.withRaw(password),
      email: EmailAddress.withUnverified(emailAddress),
      phone: phoneNumber ? PhoneNumber.withUnverified(phoneNumber) : null,
      person: null,
      status: UserStatus.DISABLED,
      tfaEnabled: false,
    });

    newUser.initPerson(
      new Name({firstName, lastName}),
      BirthDate.from(birthDate),
      gender,
      null
    );

    await this.userRepo.save(newUser);

    return newUser;
  }
}
