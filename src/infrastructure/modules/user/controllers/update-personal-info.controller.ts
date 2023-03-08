import {Body, Controller, Param, Patch} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {UpdatePersonalInfoCommand} from "src/application/commands/user/update-personal-info/update-personal-info.command";
import {UpdatePersonalInfoRequestDto} from "./dto/update-personal-info.dto";

@Controller("user")
export class UpdatePersonalInfoController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch(":user_id/personal_info")
  async update(
    @Param("user_id") userId: string,
    @Body() body: UpdatePersonalInfoRequestDto
  ) {
    const command = new UpdatePersonalInfoCommand({userId, ...body});
    const user = await this.commandBus.execute(command);
    return user;
  }
}
