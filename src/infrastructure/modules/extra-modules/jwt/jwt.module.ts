import {Module} from "@nestjs/common";
import {Ports} from "src/application/ports/constants";
import {JwtService} from "./jwt.service";

@Module({
  providers: [
    {
      provide: Ports.JwtService,
      useClass: JwtService,
    },
  ],
  exports: [Ports.JwtService],
})
export class JwtModule {}
