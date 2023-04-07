import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";
import {EmailAddress} from "../email-address";
import {UserId} from "../user";

export class EmailAddressVerifiedDomainEvent extends DomainEvent<EmailAddressVerifiedDomainEvent> {
  public readonly userId: UserId;
  public readonly emailAddress: EmailAddress;

  constructor(props: DomainEventProps<EmailAddressVerifiedDomainEvent>) {
    super(props);

    this.userId = props.userId;
    this.emailAddress = props.emailAddress;
  }
}
