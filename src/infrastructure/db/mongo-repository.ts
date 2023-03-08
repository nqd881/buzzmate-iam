import {EntityId} from "@libs/ddd";
import {AggregateRoot} from "@libs/ddd/aggregate-root";
import {IDomainPersistenceMapper} from "@libs/ddd/domain-persistence-mapper";
import {IdTypeOfEntity} from "@libs/ddd/extension.type";
import {IRepositoryBase} from "@libs/ddd/repository";
import EventEmitter2 from "eventemitter2";
import {Model} from "mongoose";

export abstract class MongoRepository<
  AR extends AggregateRoot<EntityId, unknown>,
  MongoDoc
> implements IRepositoryBase<AR>
{
  constructor(
    protected readonly dbModel: Model<MongoDoc>,
    protected readonly domainEventBus: EventEmitter2,
    protected readonly mapper: IDomainPersistenceMapper<AR, MongoDoc>
  ) {}

  async save(entity: AR) {
    const doc = this.mapper.toPersistence(entity);

    await this.dbModel.findByIdAndUpdate(entity.id.value, doc, {upsert: true});

    entity.publishEvents(this.domainEventBus);
  }

  async findOneById(id: IdTypeOfEntity<AR>) {
    const doc = await this.dbModel.findById(id.value);

    return this.mapper.toDomain(doc);
  }

  async findAll() {
    const docs = await this.dbModel.find();

    return docs.map((doc) => this.mapper.toDomain(doc));
  }

  async findAny() {
    const doc = await this.dbModel.findOne();

    return this.mapper.toDomain(doc);
  }

  async delete(entity: AR) {
    try {
      await this.dbModel.findByIdAndDelete(entity.id.value);

      return true;
    } catch (err) {
      return false;
    }
  }

  async transaction<T>(handler: () => Promise<T>) {
    return null as T;
  }
}
