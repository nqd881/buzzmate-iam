import {IsEmail} from "class-validator";

export class SendResetPasswordCodeRequestDto {
  @IsEmail()
  emailAddress: string;
}
