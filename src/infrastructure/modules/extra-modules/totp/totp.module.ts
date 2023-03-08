import {Module} from "@nestjs/common";
import {Ports} from "src/application/ports/constants";
import {TotpService} from "./totp.service";

@Module({
  imports: [],
  providers: [
    {
      provide: Ports.TotpService,
      useClass: TotpService,
    },
  ],
  exports: [Ports.TotpService],
})
export class TotpModule {}
