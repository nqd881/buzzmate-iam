import {IsEmail, IsString} from "class-validator";

export class ResetPasswordRequestDto {
  @IsEmail()
  emailAddress: string;

  @IsString()
  code: string;

  @IsString()
  newPassword: string;
}
