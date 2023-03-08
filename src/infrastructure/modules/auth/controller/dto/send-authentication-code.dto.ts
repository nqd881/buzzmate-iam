import {IsEnum, IsString} from "class-validator";
import {SendAuthenticationCodeChannels} from "src/application/commands/auth/send-authentication-code/send-authentication-code.command";

export class SendAuthenticationCodeRequestDto {
  @IsEnum(SendAuthenticationCodeChannels)
  channel: SendAuthenticationCodeChannels;

  @IsString()
  destination: string;
}
