import {Body, Controller, Post} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {AuthenticateUserCommand} from "src/application/commands/auth/authenticate-user/authenticate-user.command";
import {AuthenticationRequestDto} from "./dto/authentication.dto";

@Controller("auth")
export class AuthenticationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("signin")
  async signin(@Body() body: AuthenticationRequestDto) {
    const command = new AuthenticateUserCommand(body);

    const result = await this.commandBus.execute(command);

    return result;
  }
}
