import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";

export class UserCreatedDomainEvent extends DomainEvent {
  public readonly userId: string;

  public readonly name: string;

  public readonly emailAddress: string;

  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props);

    this.userId = props.userId;
    this.name = props.name;
    this.emailAddress = props.emailAddress;
  }
}
