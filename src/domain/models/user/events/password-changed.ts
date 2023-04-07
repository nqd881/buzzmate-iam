import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";
import {UserId} from "../user";

export class PasswordChangedDomainEvent extends DomainEvent<PasswordChangedDomainEvent> {
  public readonly userId: UserId;

  constructor(props: DomainEventProps<PasswordChangedDomainEvent>) {
    super(props);

    this.userId = props.userId;
  }
}
