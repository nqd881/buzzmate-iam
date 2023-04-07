import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";
import {EmailAddress} from "../email-address";
import {Name} from "../person";
import {UserId} from "../user";

export class UserActivatedDomainEvent extends DomainEvent<UserActivatedDomainEvent> {
  public readonly userId: UserId;
  public readonly name: Name;
  public readonly emailAddress: EmailAddress;

  constructor(props: DomainEventProps<UserActivatedDomainEvent>) {
    super(props);

    this.userId = props.userId;
    this.name = props.name;
    this.emailAddress = props.emailAddress;
  }
}
