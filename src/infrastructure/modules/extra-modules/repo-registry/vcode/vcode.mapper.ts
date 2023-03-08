import {UserId} from "@domain/models";
import {VCode, VCodeValue} from "@domain/models/vcode";
import {IDomainPersistenceMapper} from "@libs/ddd/domain-persistence-mapper";
import {DbVCode} from "./vcode.schema";

export class VCodeMapper implements IDomainPersistenceMapper<VCode, DbVCode> {
  toPersistence(entity: VCode): DbVCode {
    return {
      _id: entity.id.value,
      userId: entity.userId.value,
      value: entity.value.raw,
      attemptLimit: entity.attemptLimit,
      attemptCount: entity.attemptCount,
      expiredAt: entity.expiredAt,
    };
  }

  toDomain(dbModel: DbVCode): VCode {
    return new VCode({
      userId: new UserId(dbModel.userId),
      value: VCodeValue.from(dbModel.value),
      attemptLimit: dbModel.attemptLimit,
      attemptCount: dbModel.attemptCount,
      expiredAt: dbModel.expiredAt,
    });
  }

  toResponse(entity: VCode) {}
}
