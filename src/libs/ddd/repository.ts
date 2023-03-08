import {AggregateRoot} from "./aggregate-root";
import {IdTypeOfEntity} from "./extension.type";

export interface IRepositoryBase<AR extends AggregateRoot<any, unknown>> {
  save(entity: AR): Promise<void>;
  findOneById(id: IdTypeOfEntity<AR>): Promise<AR>;
  findAny(): Promise<AR>;
  findAll(): Promise<AR[]>;
  delete(entity: AR): Promise<boolean>;

  transaction<T>(handler: () => Promise<T>): Promise<T>;
}
