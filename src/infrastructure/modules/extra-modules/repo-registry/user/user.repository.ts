import {DOMAIN_EVENT_BUS} from "@application/di-tokens/domain-event-bus";
import {EmailAddress, PhoneNumber, User} from "@domain/models";
import {IUserRepo} from "@domain/models/user/user-repo.interface";
import {Inject, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import EventEmitter2 from "eventemitter2";
import {Model} from "mongoose";
import {DomainPersistenceMappers} from "src/application/di-tokens/domain-persistence-mappers";
import {MongoRepository} from "src/infrastructure/db/mongo-repository";
import {UserMapper} from "./user.mapper";
import {DbUser} from "./user.schema";

@Injectable()
export class UserRepository
  extends MongoRepository<User, DbUser>
  implements IUserRepo
{
  constructor(
    @InjectModel(DbUser.name) userDbModel: Model<DbUser>,
    @Inject(DOMAIN_EVENT_BUS) domainEventBus: EventEmitter2,
    @Inject(DomainPersistenceMappers.User) userMapper: UserMapper
  ) {
    super(userDbModel, domainEventBus, userMapper);
  }

  async findOneByUsername(usernames: string): Promise<User> {
    const doc = await this.dbModel.findOne({
      username: usernames,
    });

    return this.mapper.toDomain(doc);
  }

  async findOneByEmail(...emailAddresses: EmailAddress[]): Promise<User> {
    const doc = await this.dbModel.findOne({
      $or: emailAddresses.map(({address, isVerified}) => ({
        "email.address": address,
        "email.isVerified": isVerified,
      })),
    });

    return this.mapper.toDomain(doc);
  }

  async findOneByPhone(...phoneNumbers: PhoneNumber[]): Promise<User> {
    const doc = await this.dbModel.findOne({
      $or: phoneNumbers.map(({number, isVerified}) => ({
        "phone.number": number,
        "phone.isVerified": isVerified,
      })),
    });

    return this.mapper.toDomain(doc);
  }
}
