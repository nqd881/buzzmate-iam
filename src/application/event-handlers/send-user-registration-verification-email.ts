import {UserCreatedDomainEvent} from "@domain/events/user/user-created";
import {Inject, Injectable} from "@nestjs/common";
import {OnEvent} from "@nestjs/event-emitter";
import {Ports} from "../ports/constants";
import {IEmailService} from "../ports/interface/email";
import {
  IVerificationTokenService,
  VerificationTokenTypes,
} from "../ports/interface/verification-token";

@Injectable()
export class SendUserRegistrationVerificationEmail {
  constructor(
    @Inject(Ports.EmailService) private emailService: IEmailService,
    @Inject(Ports.VerificationTokenService)
    private verificationTokenService: IVerificationTokenService
  ) {}

  @OnEvent(UserCreatedDomainEvent.name, {async: true, promisify: true})
  async handle(event: UserCreatedDomainEvent) {
    const {emailAddress, userId} = event;

    const code = await this.verificationTokenService.generate(
      VerificationTokenTypes.USER_REGISTRATION,
      userId
    );

    this.emailService.sendUserRegistrationVerificationEmail(
      emailAddress,
      userId,
      code
    );
  }
}
