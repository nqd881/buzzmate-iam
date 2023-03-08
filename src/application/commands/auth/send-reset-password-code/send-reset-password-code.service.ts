import {EmailAddress} from "@domain/models";
import {IUserRepo} from "@domain/repository/user-repo.interface";
import {Inject} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Repositories} from "src/application/di-tokens/repositories";
import {Ports} from "src/application/ports/constants";
import {IEmailService} from "src/application/ports/interface/email";
import {
  IVerificationTokenService,
  VerificationTokenTypes,
} from "src/application/ports/interface/verification-token";
import {SendResetPasswordCodeCommand} from "./send-reset-password-code.command";

@CommandHandler(SendResetPasswordCodeCommand)
export class SendResetPasswordCodeService implements ICommandHandler {
  constructor(
    @Inject(Repositories.User) private userRepo: IUserRepo,
    @Inject(Ports.EmailService) private emailService: IEmailService,
    @Inject(Ports.VerificationTokenService)
    private verificationTokenService: IVerificationTokenService
  ) {}

  async execute(aCommand: SendResetPasswordCodeCommand) {
    const {emailAddress} = aCommand;

    const user = await this.userRepo.findOneByEmail(
      EmailAddress.withVerified(emailAddress)
    );

    if (!user) throw new Error("User not found");

    const resetPasswordCode = await this.verificationTokenService.generate(
      VerificationTokenTypes.RESET_PASSWORD,
      user.id.value
    );

    this.emailService.sendResetPasswordEmail(
      emailAddress,
      user.id.value,
      resetPasswordCode
    );
  }
}
