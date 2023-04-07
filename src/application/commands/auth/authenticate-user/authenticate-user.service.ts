import {IAuthTokenService} from "@application/ports/interface/auth-token";
import {EmailAddress} from "@domain/models";
import {Password} from "@domain/models/user/password";
import {IUserRepo} from "@domain/models/user/user-repo.interface";
import {AuthenDomainService} from "@domain/services/authentication";
import {Inject} from "@nestjs/common";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {Repositories} from "src/application/di-tokens/repositories";
import {Ports} from "src/application/ports/constants";
import {ITfaService} from "src/application/ports/interface/tfa";
import isEmail from "validator/lib/isEmail";
import {AuthenticateUserCommand} from "./authenticate-user.command";

export interface AuthenticateUserCommandResult {
  success: boolean;
  tfaEnabled?: boolean;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

@CommandHandler(AuthenticateUserCommand)
export class AuthenticateUserService implements ICommandHandler {
  constructor(
    @Inject(Repositories.User) private readonly userRepo: IUserRepo,
    @Inject(Ports.TfaService) private readonly tfaService: ITfaService,
    @Inject(Ports.AuthTokenService)
    private readonly authTokenService: IAuthTokenService
  ) {}

  private findUser(usernameOrEmail: string) {
    if (isEmail(usernameOrEmail)) {
      return this.userRepo.findOneByEmail(
        EmailAddress.withVerified(usernameOrEmail)
      );
    }
    return this.userRepo.findOneByUsername(usernameOrEmail);
  }

  async execute(aCommand: AuthenticateUserCommand) {
    const {usernameOrEmail, password, code} = aCommand;

    const user = await this.findUser(usernameOrEmail);

    if (!user) throw new Error("User not found");

    if (!user.isActive()) throw new Error("User is inactive");

    const authenticated = await AuthenDomainService.authenticate(
      user,
      Password.withRaw(password)
    );

    if (!authenticated) throw new Error("Incorrect password");

    if (user.tfaEnabled) {
      if (!code) throw new Error("Tfa code must be provided");

      const {type, value} = code;

      this.tfaService.verifyCode(user, type, value);
    }

    return {
      accessToken: this.authTokenService.signAccessToken(user),
      refreshToken: this.authTokenService.signRefreshToken(user),
    };
  }
}
