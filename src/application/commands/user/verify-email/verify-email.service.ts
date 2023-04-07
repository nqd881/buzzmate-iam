import {UserId} from "@domain/models";
import {IUserRepo} from "@domain/models/user/user-repo.interface";
import {Inject} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Repositories} from "src/application/di-tokens/repositories";
import {Ports} from "src/application/ports/constants";
import {
  IVerificationTokenService,
  VerificationTokenTypes,
} from "src/application/ports/interface/verification-token";
import {VerifyEmailCommand} from "./verify-email.command";

@CommandHandler(VerifyEmailCommand)
export class VerifyEmailService implements ICommandHandler {
  constructor(
    @Inject(Repositories.User) private userRepo: IUserRepo,
    @Inject(Ports.VerificationTokenService)
    private verificationTokenService: IVerificationTokenService
  ) {}

  async execute(aCommand: VerifyEmailCommand) {
    const {userId, verificationCode} = aCommand;

    const user = await this.userRepo.findOneById(new UserId(userId));

    if (!user) throw new Error("User not found");

    this.verificationTokenService.verify(
      VerificationTokenTypes.USER_REGISTRATION,
      user.id.value,
      verificationCode
    );

    user.verifyEmail();

    await this.userRepo.save(user);

    return;
  }
}
