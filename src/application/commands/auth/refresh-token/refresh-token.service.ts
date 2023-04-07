import {Repositories} from "@application/di-tokens/repositories";
import {Ports} from "@application/ports/constants";
import {IAuthTokenService} from "@application/ports/interface/auth-token";
import {UserId} from "@domain/models";
import {IUserRepo} from "@domain/models/user/user-repo.interface";
import {Inject} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {RefreshTokenCommand} from "./refresh-token.command";

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenService implements ICommandHandler {
  constructor(
    @Inject(Repositories.User) private readonly userRepo: IUserRepo,
    @Inject(Ports.AuthTokenService)
    private readonly authTokenService: IAuthTokenService
  ) {}

  async execute(command: RefreshTokenCommand) {
    const {refreshToken} = command;

    const payload = await this.authTokenService.verifyRefreshToken(
      refreshToken
    );

    if (!payload?.rootUserId) throw new Error("Cannot verify refresh token");

    const userId = new UserId(payload.rootUserId);

    const user = await this.userRepo.findOneById(userId);

    if (!user) throw new Error("User not found");

    const newAccessToken = this.authTokenService.signAccessToken(user);

    return newAccessToken;
  }
}
