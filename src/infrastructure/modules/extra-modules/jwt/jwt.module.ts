import {Module} from "@nestjs/common";
import {Ports} from "src/application/ports/constants";
import {JwtService} from "./jwt.service";

@Module({
  providers: [
    {
      provide: Ports.AuthTokenService,
      useClass: JwtService,
    },
  ],
  exports: [Ports.AuthTokenService],
})
export class JwtModule {}
