import {DOMAIN_EVENT_BUS} from "src/infrastructure/modules/extra-modules/repo-registry/constants/domain-event-bus";
import {Module, Provider} from "@nestjs/common";
import {EventEmitter2, EventEmitterModule} from "@nestjs/event-emitter";
import {MongooseModule} from "@nestjs/mongoose";
import {DomainPersistenceMappers} from "src/application/di-tokens/domain-persistence-mappers";
import {Repositories} from "src/application/di-tokens/repositories";
import {UserMapper} from "./user/user.mapper";
import {UserRepository} from "./user/user.repository";
import {DbUser, UserSchema} from "./user/user.schema";
import {VCodeMapper} from "./vcode/vcode.mapper";
import {VCodeRepository} from "./vcode/vcode.repository";
import {DbVCode, VCodeSchema} from "./vcode/vcode.schema";

const repositories: Provider[] = [
  {provide: Repositories.User, useClass: UserRepository},
  {provide: Repositories.VCode, useClass: VCodeRepository},
];

const mappers: Provider[] = [
  {provide: DomainPersistenceMappers.User, useClass: UserMapper},
  {provide: DomainPersistenceMappers.VCode, useClass: VCodeMapper},
];

const domainEventBus: Provider = {
  provide: DOMAIN_EVENT_BUS,
  useExisting: EventEmitter2,
};

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: DbUser.name, schema: UserSchema},
      {name: DbVCode.name, schema: VCodeSchema},
    ]),
  ],
  providers: [...repositories, ...mappers, domainEventBus],
  exports: [...Object.values(Repositories)],
})
export class RepoRegistryModule {}
