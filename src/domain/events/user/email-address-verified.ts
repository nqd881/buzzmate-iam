import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";

export class EmailAddressVerifiedDomainEvent extends DomainEvent {
  public readonly userId: string;
  public readonly emailAddress: string;

  constructor(props: DomainEventProps<EmailAddressVerifiedDomainEvent>) {
    super(props);

    this.userId = props.userId;
    this.emailAddress = props.emailAddress;
  }
}
