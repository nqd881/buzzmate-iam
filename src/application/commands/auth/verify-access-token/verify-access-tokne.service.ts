import {Ports} from "@application/ports/constants";
import {IAuthTokenService} from "@application/ports/interface/auth-token";
import {Inject} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {VerifyAccessTokenCommand} from "./verify-access-token.command";

@CommandHandler(VerifyAccessTokenCommand)
export class VerifyAccessTokenService implements ICommandHandler {
  constructor(
    @Inject(Ports.AuthTokenService)
    private readonly authTokenService: IAuthTokenService
  ) {}

  async execute(aCommand: VerifyAccessTokenCommand) {
    const {accessToken} = aCommand;

    const result = this.authTokenService.verifyAccessToken(accessToken);

    return result;
  }
}
