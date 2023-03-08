import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";

export class UserDisabledDomainEvent extends DomainEvent {
  public readonly userId: string;

  constructor(props: DomainEventProps<UserDisabledDomainEvent>) {
    super(props);

    this.userId = props.userId;
  }
}
