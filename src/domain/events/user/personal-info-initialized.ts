import {DomainEvent, DomainEventProps} from "@libs/ddd/domain-event";

export class PersonalInfoInitializedDomainEvent extends DomainEvent {
  public readonly userId: string;

  constructor(props: DomainEventProps<PersonalInfoInitializedDomainEvent>) {
    super(props);

    this.userId = props.userId;
  }
}
