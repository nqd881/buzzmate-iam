import {Body, Controller, Post, Res} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {Response} from "express";
import {AuthenticateUserCommand} from "src/application/commands/auth/authenticate-user/authenticate-user.command";
import {SigninRequestDto} from "./dto/signin.dto";

@Controller("auth")
export class SigninController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("signin")
  async signin(
    @Res({passthrough: true}) res: Response,
    @Body() body: SigninRequestDto
  ) {
    const command = new AuthenticateUserCommand(body);

    const result = await this.commandBus.execute(command);

    const refreshToken = result?.refreshToken;

    if (refreshToken) {
      res.cookie("buzzmate-refresh-token", refreshToken, {
        httpOnly: true,
        // secure: true,
      });

      res.cookie("x-csrf-token", "123123");
    }

    return result;
  }
}
