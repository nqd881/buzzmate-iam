import {Type} from "class-transformer";
import {IsOptional, IsString, ValidateNested} from "class-validator";

export class TfaCodeDto {
  @IsString()
  type: string;

  @IsString()
  value: string;
}

export class AuthenticationRequestDto {
  @IsString()
  usernameOrEmail: string;

  @IsString()
  password: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => TfaCodeDto)
  code: TfaCodeDto;
}
