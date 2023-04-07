import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";
import {UserId} from "../user";

export class PersonalInfoInitializedDomainEvent extends DomainEvent<PersonalInfoInitializedDomainEvent> {
  public readonly userId: UserId;

  constructor(props: DomainEventProps<PersonalInfoInitializedDomainEvent>) {
    super(props);

    this.userId = props.userId;
  }
}
