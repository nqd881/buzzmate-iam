import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";
import {UserId} from "../user";

export class TfaTurnedOnDomainEvent extends DomainEvent<TfaTurnedOnDomainEvent> {
  public readonly userId: UserId;

  constructor(props: DomainEventProps<TfaTurnedOnDomainEvent>) {
    super(props);

    this.userId = props.userId;
  }
}
