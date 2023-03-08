import {v4 as uuidv4, version, validate} from "uuid";

export interface EntityIdType<T extends EntityId> {
  new (...args: any[]): T;
}

export abstract class EntityId {
  private static readonly uuidVersion = 4;

  protected _value: string;

  constructor(value: string) {
    this.setValue(value ?? EntityId.nextValue());
  }

  protected static nextValue() {
    return uuidv4();
  }

  private static isValidValue(value: string): boolean {
    const uuidVersion = version(value);
    const uuidIsValid = validate(value);

    return uuidIsValid && uuidVersion === this.uuidVersion;
  }

  static isEntityId(obj: any): obj is EntityId {
    return obj instanceof EntityId;
  }

  private setValue(value: string) {
    if (!EntityId.isValidValue(value)) throw new Error("Invalid Id");

    this._value = value;
  }

  get value() {
    return this._value;
  }

  equals(anotherId: EntityId) {
    const equalType = anotherId instanceof this.constructor;
    const equalRawId = this.value === anotherId.value;

    return equalType && equalRawId;
  }

  clone() {
    return new (this.constructor as EntityIdType<typeof this>)(this.value);
  }
}
