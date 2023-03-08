import {EntityId, EntityIdType} from "@libs/ddd";
import {AggregateRoot} from "@libs/ddd/aggregate-root";
import {ValueObject, ValueObjectProps} from "@libs/ddd/value-object";
import {UserId} from "./user";

export interface IVCodeValueProps {
  type: string;
  content: string;
}

export class VCodeValue extends ValueObject<IVCodeValueProps> {
  private static DELIMITER = "#__#";

  constructor(props: ValueObjectProps<IVCodeValueProps>) {
    super(props);
  }

  validate() {}

  get type() {
    return this.props.type;
  }

  get content() {
    return this.props.content;
  }

  get raw() {
    return [this.type, this.content].join(VCodeValue.DELIMITER);
  }

  static from(aString: string) {
    const [type, content] = aString.split(VCodeValue.DELIMITER);

    return new VCodeValue({type, content});
  }
}

export enum VCodeStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface VCodeProps {
  userId: UserId;
  value: VCodeValue;
  attemptLimit: number;
  attemptCount: number;
  expiredAt: number;
}

export class VCodeId extends EntityId {}

export class VCode extends AggregateRoot<VCodeId, VCodeProps> {
  protected get IdConstructor(): EntityIdType<VCodeId> {
    return VCodeId;
  }

  protected _userId: UserId;
  protected _value: VCodeValue;
  protected _attemptLimit: number;
  protected _attemptCount: number;
  protected _expiredAt: number;

  constructor(props: VCodeProps, id?: VCodeId) {
    super(props, id);
  }

  protected init() {
    this.setUserId(this.props.userId);
    this.setValue(this.props.value);
    this.setAttemptLimit(this.props.attemptLimit);
    this.setAttemptCount(this.props.attemptCount);
    this.setExpiredAt(this.props.expiredAt);
  }

  protected validateProps() {}

  validate() {}

  protected setUserId(aUserId: UserId) {
    this._userId = aUserId;
  }

  protected setValue(aValue: VCodeValue) {
    this._value = aValue;
  }

  protected setAttemptLimit(anAttemptLimit: number) {
    this._attemptLimit = anAttemptLimit;
  }

  protected setAttemptCount(anAttemptCount: number) {
    this._attemptCount = anAttemptCount;
  }

  protected setExpiredAt(anExpiredAt: number) {
    this._expiredAt = anExpiredAt;
  }

  get userId() {
    return this._userId;
  }

  get value() {
    return this._value;
  }

  get attemptLimit() {
    return this._attemptLimit;
  }

  get attemptCount() {
    return this._attemptCount;
  }

  get expiredAt() {
    return this._expiredAt;
  }

  isExpired(): boolean {
    const now = new Date().getTime();

    return now >= this.expiredAt;
  }

  hasReachedAttemptLimit(): boolean {
    return this.attemptCount >= this.attemptLimit;
  }

  status(): VCodeStatus {
    if (this.isExpired() || this.hasReachedAttemptLimit())
      return VCodeStatus.INACTIVE;

    return VCodeStatus.ACTIVE;
  }

  isActive() {
    return this.status() === VCodeStatus.ACTIVE;
  }

  increaseAttemptCount() {
    if (!this.isActive()) return;

    this.setAttemptCount(this.attemptCount + 1);
  }

  verify(value: VCodeValue) {
    if (!this.isActive()) return false;

    this.increaseAttemptCount();

    return this.value.equals(value);
  }
}
