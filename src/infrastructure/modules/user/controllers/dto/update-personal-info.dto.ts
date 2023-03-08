import {Gender} from "@domain/models";
import {Type} from "class-transformer";
import {IsOptional, IsString} from "class-validator";

export class UpdatePersonalInfoRequestDto {
  @IsOptional()
  @IsString()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @Type(() => Date)
  @IsString()
  @IsOptional()
  birthDate: Date;

  @IsString()
  @IsOptional()
  gender: Gender;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  streetLine1: string;

  @IsString()
  @IsOptional()
  streetLine2: string;

  @IsString()
  @IsOptional()
  postalCode: string;
}
