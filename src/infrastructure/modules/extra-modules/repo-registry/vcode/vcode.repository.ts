import {UserId} from "@domain/models";
import {VCode, VCodeValue} from "@domain/models/vcode";
import {IVCodeRepo} from "@domain/repository/vcode-repo.interface";
import {DOMAIN_EVENT_BUS} from "src/infrastructure/modules/extra-modules/repo-registry/constants/domain-event-bus";
import {Inject} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import EventEmitter2 from "eventemitter2";
import {Model} from "mongoose";
import {DomainPersistenceMappers} from "src/application/di-tokens/domain-persistence-mappers";
import {MongoRepository} from "src/infrastructure/db/mongo-repository";
import {VCodeMapper} from "./vcode.mapper";
import {DbVCode} from "./vcode.schema";

export class VCodeRepository
  extends MongoRepository<VCode, DbVCode>
  implements IVCodeRepo
{
  constructor(
    @InjectModel(DbVCode.name) vcodeModel: Model<DbVCode>,
    @Inject(DOMAIN_EVENT_BUS) domainEventBus: EventEmitter2,
    @Inject(DomainPersistenceMappers.VCode) vcodeMapper: VCodeMapper
  ) {
    super(vcodeModel, domainEventBus, vcodeMapper);
  }

  async findOneOfUserByValue(userId: UserId, value: VCodeValue) {
    const doc = await this.dbModel.findOne({
      userId: userId.value,
      value: value.raw,
    });

    return this.mapper.toDomain(doc);
  }

  async findOneOfUserByName(
    userId: UserId,
    name: string,
    code?: string
  ): Promise<VCode> {
    const doc = await this.dbModel.findOne({userId: userId.value, name, code});

    return this.mapper.toDomain(doc);
  }

  async findAllOfUserByName(userId: UserId, name: string): Promise<VCode[]> {
    const docs = await this.dbModel.find({userId: userId.value, name});

    return docs.map((doc) => this.mapper.toDomain(doc));
  }

  async deleteAllOfUserByName(userId: UserId, name: string): Promise<boolean> {
    try {
      await this.dbModel.deleteMany({userId: userId.value, name: name});

      return true;
    } catch (err) {
      return false;
    }
  }
}
