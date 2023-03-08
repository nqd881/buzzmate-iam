import {Controller, Get, Param, Query} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {VerifyEmailCommand} from "src/application/commands/user/verify-email/verify-email.command";

@Controller("user")
export class VerifyEmailController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get(":user_id/email/verification")
  async verify(
    @Param("user_id") userId: string,
    @Query("code") verificationCode: string
  ) {
    const command = new VerifyEmailCommand({userId, verificationCode});

    try {
      await this.commandBus.execute(command);
    } catch (err) {
      console.log(err);
    }
  }
}
