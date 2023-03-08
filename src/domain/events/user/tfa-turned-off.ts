import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";

export class TfaTurnedOffDomainEvent extends DomainEvent {
  public readonly userId: string;

  constructor(props: DomainEventProps<TfaTurnedOffDomainEvent>) {
    super(props);

    this.userId = props.userId;
  }
}
