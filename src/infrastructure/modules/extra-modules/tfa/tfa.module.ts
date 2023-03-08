import {Module} from "@nestjs/common";
import {Ports} from "src/application/ports/constants";
import {TfaService} from "./tfa.service";

@Module({
  providers: [
    {
      provide: Ports.TfaService,
      useClass: TfaService,
    },
  ],
  exports: [Ports.TfaService],
})
export class TfaModule {}
