import {EmailAddress, UserId} from "@domain/models";
import {Password} from "@domain/models/user/password";
import {IUserRepo} from "@domain/models/user/user-repo.interface";
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
    const {emailAddress, code, newPassword} = aCommand;

    const user = await this.userRepo.findOneByEmail(
      EmailAddress.withVerified(emailAddress)
    );

    if (!user) throw new Error("User not found");

    const isCodeValid = await this.verificationTokenService.verify(
      VerificationTokenTypes.RESET_PASSWORD,
      user.id.value,
      code
    );
          
    if (!isCodeValid) throw new Error("Invalid reset password code");

    await UserDomainService.changePassword(user, Password.withRaw(newPassword));

    await this.userRepo.save(user);
  }
}
