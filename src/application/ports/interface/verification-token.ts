import {MaybePromise} from "@libs/utilities/types";

export enum VerificationTokenTypes {
  AUTHENTICATION = "authentication_token",
  USER_REGISTRATION = "user_registration_token",
  USER_DISABLEMENT = "user_disablement_token",
  RESET_PASSWORD = "reset_password_token",
}

export interface IVerificationTokenService {
  generate(type: VerificationTokenTypes, userId: string): MaybePromise<string>;

  verify(
    type: VerificationTokenTypes,
    userId: string,
    code: string
  ): MaybePromise<boolean>;
}
