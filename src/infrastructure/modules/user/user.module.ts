import {Module, Provider} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {RegisterUserService} from "src/application/commands/user/register-user/register-user.service";
import {UpdatePersonalInfoService} from "src/application/commands/user/update-personal-info/update-personal-info.service";
import {VerifyEmailService} from "src/application/commands/user/verify-email/verify-email.service";
import {SendUserRegistrationVerificationEmail} from "src/application/event-handlers/send-user-registration-verification-email";
import {EmailModule} from "../extra-modules/email/email.module";
import {RepoRegistryModule} from "../extra-modules/repo-registry/repo-registry.module";
import {VerificationTokenModule} from "../extra-modules/verification-token/verification-token.module";
import {UpdatePersonalInfoController} from "./controllers/update-personal-info.controller";
import {UserRegistrationController} from "./controllers/user-registration.controller";
import {VerifyEmailController} from "./controllers/verify-email.controller";

const commandHandlers: Provider[] = [
  RegisterUserService,
  VerifyEmailService,
  UpdatePersonalInfoService,
];

const eventHandlers: Provider[] = [SendUserRegistrationVerificationEmail];

const httpControllers = [
  UserRegistrationController,
  VerifyEmailController,
  UpdatePersonalInfoController,
];

@Module({
  imports: [
    CqrsModule,
    RepoRegistryModule,
    EmailModule,
    VerificationTokenModule,
  ],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...eventHandlers],
  exports: [],
})
export class UserModule {}
