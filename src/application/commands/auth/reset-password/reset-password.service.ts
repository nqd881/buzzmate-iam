import {UserId} from "@domain/models";
import {Password} from "@domain/models/user/password";
import {IUserRepo} from "@domain/repository/user-repo.interface";
import {UserDomainService} from "@domain/services/user";
import {Inject} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Repositories} from "src/application/di-tokens/repositories";
import {Ports} from "src/application/ports/constants";
import {
  IVerificationTokenService,
  VerificationTokenTypes,
} from "src/application/ports/interface/verification-token";
import {ResetPasswordCommand} from "./reset-password.command";

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordService implements ICommandHandler {
  constructor(
    @Inject(Repositories.User) private userRepo: IUserRepo,
    @Inject(Ports.VerificationTokenService)
    private verificationTokenService: IVerificationTokenService
  ) {}

  async execute(aCommand: ResetPasswordCommand) {
    const {userId, code, newPassword} = aCommand;

    const user = await this.userRepo.findOneById(new UserId(userId));

    if (!user) throw new Error("User not found");

    const isCodeValid = await this.verificationTokenService.verify(
      VerificationTokenTypes.RESET_PASSWORD,
      userId,
      code
    );

    if (!isCodeValid) throw new Error("Invalid reset password code");

    UserDomainService.changePassword(user, Password.withRaw(newPassword));

    await this.userRepo.save(user);
  }
}
