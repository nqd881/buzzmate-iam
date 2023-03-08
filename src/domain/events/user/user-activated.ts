import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";

export class UserActivatedDomainEvent extends DomainEvent {
  public readonly userId: string;

  constructor(props: DomainEventProps<UserActivatedDomainEvent>) {
    super(props);

    this.userId = props.userId;
  }
}
