import {UserId} from "@domain/models";
import {Password} from "@domain/models/user/password";
import {IUserRepo} from "@domain/repository/user-repo.interface";
import {AuthenDomainService} from "@domain/services/authentication";
import {UserDomainService} from "@domain/services/user";
import {Inject} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Repositories} from "src/application/di-tokens/repositories";
import {ChangePasswordCommand} from "./change-password.command";

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordService implements ICommandHandler {
  constructor(
    @Inject(Repositories.User) private readonly userRepo: IUserRepo
  ) {}

  async execute(aCommand: ChangePasswordCommand) {
    const {userId, oldPassword, newPassword} = aCommand;

    const user = await this.userRepo.findOneById(new UserId(userId));

    if (!user) throw new Error("User not found");

    const isCorrectOldPassword = AuthenDomainService.authenticate(
      user,
      Password.withRaw(oldPassword)
    );

    if (!isCorrectOldPassword) throw new Error("Incorrect old password");

    UserDomainService.changePassword(user, Password.withRaw(newPassword));

    await this.userRepo.save(user);
  }
}
