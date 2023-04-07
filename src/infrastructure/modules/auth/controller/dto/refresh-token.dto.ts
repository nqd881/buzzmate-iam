import {IsOptional, IsString} from "class-validator";

export class RefreshTokenRequestDto {
  @IsString()
  @IsOptional()
  refreshToken: string;
}
