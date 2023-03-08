import {Gender} from "@domain/models";
import {Type} from "class-transformer";
import {IsDate, IsEmail, IsString} from "class-validator";

export class RegisterUserRequestDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @Type(() => Date)
  @IsDate()
  readonly birthDate: Date;

  @IsString()
  readonly gender: Gender;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly emailAddress: string;

  @IsString()
  readonly phoneNumber: string;
}
