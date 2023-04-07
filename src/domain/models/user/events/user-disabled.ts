import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";
import {UserId} from "../user";

export class UserDisabledDomainEvent extends DomainEvent<UserDisabledDomainEvent> {
  public readonly userId: UserId;

  constructor(props: DomainEventProps<UserDisabledDomainEvent>) {
    super(props);

    this.userId = props.userId;
  }
}
