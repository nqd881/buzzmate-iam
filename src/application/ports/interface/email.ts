export interface IEmailService {
  sendUserRegistrationVerificationEmail(
    emailAddress: string,
    userId: string,
    code: string
  ): void;

  sendAuthenticationEmail(emailAddress: string, code: string): void;

  sendResetPasswordEmail(
    emailAddress: string,
    userId: string,
    code: string
  ): void;
}
