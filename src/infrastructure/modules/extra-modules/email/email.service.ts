import {MailerService} from "@nestjs-modules/mailer";
import {Injectable} from "@nestjs/common";
import {IEmailService} from "src/application/ports/interface/email";

@Injectable()
export class EmailService implements IEmailService {
  constructor(private readonly mailerService: MailerService) {}

  sendUserRegistrationVerificationEmail(
    emailAddress: string,
    userId: string,
    verificationCode: string
  ) {
    this.mailerService.sendMail({
      to: emailAddress,
      subject: "Verify Registration",
      template: "user-registration-verification",
      context: {
        userId,
        verificationCode,
      },
    });
  }

  sendAuthenticationEmail(emailAddress: string, code: string): void {
    this.mailerService.sendMail({
      to: emailAddress,
      subject: "Authentication",
      template: "authentication",
      context: {
        code,
      },
    });
  }

  sendResetPasswordEmail(
    emailAddress: string,
    userId: string,
    code: string
  ): void {
    this.mailerService.sendMail({
      to: emailAddress,
      subject: "Reset Password",
      template: "reset-password",
      context: {
        userId,
        code,
      },
    });
  }
}
