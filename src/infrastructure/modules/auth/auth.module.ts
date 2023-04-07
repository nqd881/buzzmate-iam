import {RefreshTokenService} from "@application/commands/auth/refresh-token/refresh-token.service";
import {VerifyAccessTokenService} from "@application/commands/auth/verify-access-token/verify-access-tokne.service";
import {Module, Provider} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {AuthenticateUserService} from "src/application/commands/auth/authenticate-user/authenticate-user.service";
import {ResetPasswordService} from "src/application/commands/auth/reset-password/reset-password.service";
import {SendAuthenticationCodeService} from "src/application/commands/auth/send-authentication-code/send-authentication-code.service";
import {SendResetPasswordCodeService} from "src/application/commands/auth/send-reset-password-code/send-reset-password-code.service";
import {EmailModule} from "../extra-modules/email/email.module";
import {JwtModule} from "../extra-modules/jwt/jwt.module";
import {RepoRegistryModule} from "../extra-modules/repo-registry/repo-registry.module";
import {TfaModule} from "../extra-modules/tfa/tfa.module";
import {TotpModule} from "../extra-modules/totp/totp.module";
import {VerificationTokenModule} from "../extra-modules/verification-token/verification-token.module";
import {RefreshTokenController} from "./controller/refresh-token.controller";
import {ResetPasswordController} from "./controller/reset-password.controller";
import {SendAuthenticationCodeController} from "./controller/send-authentication-code.controller";
import {SendResetPasswordCodeController} from "./controller/send-reset-password-code.controller";
import {SigninController} from "./controller/signin.controller";
import {VerifyAccessTokenController} from "./controller/verify-access-token.controller";

const commandHandlers: Provider[] = [
  AuthenticateUserService,
  SendAuthenticationCodeService,
  ResetPasswordService,
  SendResetPasswordCodeService,
  VerifyAccessTokenService,
  RefreshTokenService,
];

const services: Provider[] = [];

const httpControllers = [
  SigninController,
  SendAuthenticationCodeController,
  ResetPasswordController,
  SendResetPasswordCodeController,
  VerifyAccessTokenController,
  RefreshTokenController,
];

@Module({
  imports: [
    CqrsModule,
    RepoRegistryModule,
    EmailModule,
    TotpModule,
    JwtModule,
    TfaModule,
    VerificationTokenModule,
  ],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...services],
  exports: [],
})
export class AuthModule {}
