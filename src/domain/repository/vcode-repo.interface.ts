import {IRepositoryBase} from "@libs/ddd/repository";
import {UserId} from "../models";
import {VCode, VCodeValue} from "../models/vcode";

export interface IVCodeRepo extends IRepositoryBase<VCode> {
  findOneOfUserByValue(userId: UserId, value: VCodeValue): Promise<VCode>;

  // findOneOfUserByName(
  //   userId: UserId,
  //   name: string,
  //   code?: string
  // ): Promise<VCode>;

  // findAllOfUserByName(userId: UserId, name: string): Promise<VCode[]>;

  // deleteAllOfUserByName(userId: UserId, name: string): Promise<boolean>;
}
