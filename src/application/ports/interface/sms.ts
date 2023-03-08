export interface ISmsService {
  sendVerificationSigninSms(phoneNumber: string, code: string): void;
}
