import {Body, Controller, Post} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {RegisterUserCommand} from "src/application/commands/user/register-user/register-user.command";
import {RegisterUserRequestDto} from "./dto/register-user.dto";

@Controller("user")
export class UserRegistrationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post("registration")
  async register(@Body() body: RegisterUserRequestDto) {
    const command = new RegisterUserCommand(body);
    const result = await this.commandBus.execute(command);
    return result;
  }
}
