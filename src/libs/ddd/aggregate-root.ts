import EventEmitter2 from "eventemitter2";
import {DomainEvent} from "./domain-event";
import {Entity} from "./entity";
import {EntityId} from "./entity-id";

export abstract class AggregateRoot<
  Id extends EntityId,
  Props = unknown
> extends Entity<Id, Props> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addEvent(domainEvent: DomainEvent) {
    this._domainEvents.push(domainEvent);
  }

  protected clearEvents() {
    this._domainEvents = [];
  }

  async publishEvents(eventEmitter: EventEmitter2) {
    await Promise.all(
      this._domainEvents.map((event) =>
        eventEmitter.emitAsync(event.constructor.name, event)
      )
    );

    this.clearEvents();
  }
}
