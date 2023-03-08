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
import {AuthenticationController} from "./controller/authentication.controller";
import {ResetPasswordController} from "./controller/reset-password.controller";
import {SendAuthenticationCodeController} from "./controller/send-authentication-code.controller";
import {SendResetPasswordCodeController} from "./controller/send-reset-password-code.controller";

const commandHandlers: Provider[] = [
  AuthenticateUserService,
  SendAuthenticationCodeService,
  ResetPasswordService,
  SendResetPasswordCodeService,
];

const services: Provider[] = [];

const httpControllers = [
  AuthenticationController,
  SendAuthenticationCodeController,
  ResetPasswordController,
  SendResetPasswordCodeController,
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
