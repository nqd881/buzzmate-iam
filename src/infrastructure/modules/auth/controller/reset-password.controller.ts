import {Body, Controller, Post, Query} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {ResetPasswordCommand} from "src/application/commands/auth/reset-password/reset-password.command";
import {ResetPasswordRequestDto} from "./dto/reset-password.dto";

@Controller("auth")
export class ResetPasswordController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("password_reset")
  async resetPassword(@Body() body: ResetPasswordRequestDto) {
    const {emailAddress, code, newPassword} = body;

    const command = new ResetPasswordCommand({emailAddress, code, newPassword});

    await this.commandBus.execute(command);

    return;
  }
}
