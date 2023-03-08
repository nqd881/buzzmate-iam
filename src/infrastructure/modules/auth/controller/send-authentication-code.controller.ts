import {Body, Controller, Post} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {SendAuthenticationCodeCommand} from "src/application/commands/auth/send-authentication-code/send-authentication-code.command";
import {SendAuthenticationCodeRequestDto} from "./dto/send-authentication-code.dto";

@Controller("auth")
export class SendAuthenticationCodeController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("signin/code")
  async send(@Body() body: SendAuthenticationCodeRequestDto) {
    const command = new SendAuthenticationCodeCommand(body);

    await this.commandBus.execute(command);

    return;
  }
}
