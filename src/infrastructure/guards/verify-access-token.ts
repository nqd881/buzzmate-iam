import {VerifyAccessTokenCommand} from "@application/commands/auth/verify-access-token/verify-access-token.command";
import {AccessTokenPayload} from "@application/ports/interface/auth-token";
import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {Request} from "express";

@Injectable()
export class VerifyAccessTokenGuard implements CanActivate {
  constructor(private readonly commandBus: CommandBus) {}

  async canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest<Request>();

      const authorizationHeader = request.header("Authorization");

      const accessToken = authorizationHeader.split(" ")[1];

      const command = new VerifyAccessTokenCommand({
        accessToken,
      });

      const result = await this.commandBus.execute<
        VerifyAccessTokenCommand,
        AccessTokenPayload
      >(command);

      if (result.rootUserId) {
        request.userId = result.rootUserId;
      }

      return true;
    } catch (err) {
      return false;
    }
  }
}
