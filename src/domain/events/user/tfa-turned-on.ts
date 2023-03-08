import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";

export class TfaTurnedOnDomainEvent extends DomainEvent {
  public readonly userId: string;

  constructor(props: DomainEventProps<TfaTurnedOnDomainEvent>) {
    super(props);

    this.userId = props.userId;
  }
}
