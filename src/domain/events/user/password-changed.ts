import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";

export class PasswordChangedDomainEvent extends DomainEvent {
  public readonly userId: string;

  constructor(props: DomainEventProps<PasswordChangedDomainEvent>) {
    super(props);

    this.userId = props.userId;
  }
}
