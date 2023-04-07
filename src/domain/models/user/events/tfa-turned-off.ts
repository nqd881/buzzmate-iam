import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";
import {UserId} from "../user";

export class TfaTurnedOffDomainEvent extends DomainEvent<TfaTurnedOffDomainEvent> {
  public readonly userId: UserId;

  constructor(props: DomainEventProps<TfaTurnedOffDomainEvent>) {
    super(props);

    this.userId = props.userId;
  }
}
