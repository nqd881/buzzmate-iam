import {Body, Controller, Post} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {SendResetPasswordCodeCommand} from "src/application/commands/auth/send-reset-password-code/send-reset-password-code.command";
import {SendResetPasswordCodeRequestDto} from "./dto/send-reset-password-code.dto";

@Controller("auth")
export class SendResetPasswordCodeController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("password_reset/code")
  async send(@Body() body: SendResetPasswordCodeRequestDto) {
    const command = new SendResetPasswordCodeCommand(body);

    await this.commandBus.execute(command);

    return;
  }
}
