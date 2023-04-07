import {RefreshTokenCommand} from "@application/commands/auth/refresh-token/refresh-token.command";
import {
  Body,
  Controller,
  Get,
  Header,
  Headers,
  Post,
  Req,
} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {Request} from "express";
import {RefreshTokenRequestDto} from "./dto/refresh-token.dto";

@Controller("auth")
export class RefreshTokenController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get("token/refresh")
  async refreshWithCookie(
    @Req() req: Request,
    @Headers("X-CSRF-TOKEN") headerCsrfToken: string
  ) {
    const cookieCsrfToken = req.cookies?.["x-csrf-token"];

    if (!cookieCsrfToken || !headerCsrfToken)
      throw new Error("Invalid CSRF token");

    if (cookieCsrfToken !== headerCsrfToken)
      throw new Error("Invalid CSRF token");

    const refreshToken = req.cookies?.["buzzmate-refresh-token"];

    const command = new RefreshTokenCommand({refreshToken});

    const accessToken = await this.commandBus.execute(command);

    return {accessToken};
  }

  @Post("token/refresh")
  async refresh(@Req() req: Request, @Body() body: RefreshTokenRequestDto) {
    const {refreshToken} = body;

    const command = new RefreshTokenCommand({refreshToken});

    const accessToken = await this.commandBus.execute(command);

    return {
      accessToken,
    };
  }
}
