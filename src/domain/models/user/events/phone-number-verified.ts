import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";
import {PhoneNumber} from "../phone-number";
import {UserId} from "../user";

export class PhoneNumberVerifiedDomainEvent extends DomainEvent<PhoneNumberVerifiedDomainEvent> {
  public readonly userId: UserId;
  public readonly phoneNumber: PhoneNumber;

  constructor(props: DomainEventProps<PhoneNumberVerifiedDomainEvent>) {
    super(props);

    this.userId = props.userId;
    this.phoneNumber = props.phoneNumber;
  }
}
