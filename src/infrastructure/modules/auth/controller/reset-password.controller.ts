import {Body, Controller, Post, Query} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {ResetPasswordCommand} from "src/application/commands/auth/reset-password/reset-password.command";
import {ResetPasswordRequestDto} from "./dto/reset-password.dto";

@Controller("auth")
export class ResetPasswordController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("password_reset")
  async resetPassword(
    @Query("user_id") userId: string,
    @Query("code") code: string,
    @Body() body: ResetPasswordRequestDto
  ) {
    const {newPassword} = body;

    const command = new ResetPasswordCommand({userId, code, newPassword});

    await this.commandBus.execute(command);

    return;
  }
}
