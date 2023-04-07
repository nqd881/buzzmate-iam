import {EmailAddress, PhoneNumber} from "@domain/models";
import {IUserRepo} from "@domain/models/user/user-repo.interface";
import {Inject} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Repositories} from "src/application/di-tokens/repositories";
import {Ports} from "src/application/ports/constants";
import {IEmailService} from "src/application/ports/interface/email";
import {
  IVerificationTokenService,
  VerificationTokenTypes,
} from "src/application/ports/interface/verification-token";
import {
  SendAuthenticationCodeChannels,
  SendAuthenticationCodeCommand,
} from "./send-authentication-code.command";

@CommandHandler(SendAuthenticationCodeCommand)
export class SendAuthenticationCodeService implements ICommandHandler {
  constructor(
    @Inject(Repositories.User) private readonly userRepo: IUserRepo,
    @Inject(Ports.EmailService) private readonly emailService: IEmailService,
    @Inject(Ports.VerificationTokenService)
    private readonly verificationTokenService: IVerificationTokenService
  ) {}

  private async findUser(
    channel: SendAuthenticationCodeChannels,
    destination: string
  ) {
    switch (channel) {
      case SendAuthenticationCodeChannels.EMAIL: {
        return this.userRepo.findOneByEmail(
          EmailAddress.withVerified(destination)
        );
      }
      case SendAuthenticationCodeChannels.SMS: {
        return this.userRepo.findOneByPhone(
          PhoneNumber.withVerified(destination)
        );
      }
    }
  }

  private sendAuthenticationCode(
    channel: SendAuthenticationCodeChannels,
    destination: string,
    authenticationCode: string
  ) {
    switch (channel) {
      case SendAuthenticationCodeChannels.EMAIL: {
        this.sendAuthenticationCodeViaEmail(destination, authenticationCode);
        return;
      }
      case SendAuthenticationCodeChannels.SMS: {
        this.sendAuthenticationCodeViaSms(destination, authenticationCode);
        return;
      }
    }
  }

  private sendAuthenticationCodeViaEmail(
    destination: string,
    authenticationCode: string
  ) {
    this.emailService.sendAuthenticationEmail(destination, authenticationCode);
  }

  private sendAuthenticationCodeViaSms(
    destination: string,
    authenticationCode: string
  ) {
    console.log("Sending signin code to phone number %s", destination);
  }

  async execute(aCommand: SendAuthenticationCodeCommand) {
    const {channel, destination} = aCommand;

    const user = await this.findUser(channel, destination);

    if (!user) throw new Error("User not found");

    const authenticationCode = await this.verificationTokenService.generate(
      VerificationTokenTypes.AUTHENTICATION,
      user.id.value
    );

    this.sendAuthenticationCode(channel, destination, authenticationCode);
  }
}
