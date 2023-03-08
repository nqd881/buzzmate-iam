import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";

export class PhoneNumberVerifiedDomainEvent extends DomainEvent {
  public readonly userId: string;
  public readonly phoneNumber: string;

  constructor(props: DomainEventProps<PhoneNumberVerifiedDomainEvent>) {
    super(props);

    this.userId = props.userId;
    this.phoneNumber = props.phoneNumber;
  }
}
