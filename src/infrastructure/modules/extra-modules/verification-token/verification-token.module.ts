import {RedisModule} from "@liaoliaots/nestjs-redis";
import {Module} from "@nestjs/common";
import {Ports} from "src/application/ports/constants";
import {VerificationTokenService} from "./verification-token.service";

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: Ports.VerificationTokenService,
      useClass: VerificationTokenService,
    },
  ],
  exports: [Ports.VerificationTokenService],
})
export class VerificationTokenModule {}
