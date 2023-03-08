import {Inject} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Ports} from "src/application/ports/constants";
import {
  IVerificationTokenService,
  VerificationTokenTypes,
} from "src/application/ports/interface/verification-token";
import {DisableUserCommand} from "./disable-user.command";

@CommandHandler(DisableUserCommand)
export class DisableUserService implements ICommandHandler {
  constructor(
    @Inject(Ports.VerificationTokenService)
    private readonly verificationTokenService: IVerificationTokenService
  ) {}

  async execute(aCommand: DisableUserCommand) {
    const {userId, code} = aCommand;

    // const user =
    this.verificationTokenService.verify(
      VerificationTokenTypes.USER_DISABLEMENT,
      userId,
      code
    );
  }
}
