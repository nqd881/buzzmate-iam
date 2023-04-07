import {VerifyAccessTokenCommand} from "@application/commands/auth/verify-access-token/verify-access-token.command";
import {Controller, Get, Req, Res} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {Request, Response} from "express";

@Controller("auth")
export class VerifyAccessTokenController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get("token/verify")
  async verify(@Req() req: Request, @Res() res: Response) {
    const authorizationHeader = req.header("Authorization");

    const token = authorizationHeader?.split(" ")[1];

    if (!token) throw new Error("Invalid authorization");

    const command = new VerifyAccessTokenCommand({accessToken: token});

    const result = await this.commandBus.execute(command);

    return res.status(200).json(result);
  }
}
