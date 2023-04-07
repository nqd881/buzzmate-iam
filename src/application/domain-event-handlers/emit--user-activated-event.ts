import {UserActivatedDomainEvent} from "@domain/models/user/events/user-activated";
import {DomainEventName} from "@domain/utils/domain-event-name";
import {RabbitMQEventBusService} from "@infrastructure/modules/extra-modules/rabbitmq-event-bus/rabbitmq-event-bus.service";
import {Injectable} from "@nestjs/common";
import {OnEvent} from "@nestjs/event-emitter";

@Injectable()
export class EmitUserActivatedEvent {
  constructor(private readonly eventBus: RabbitMQEventBusService) {}

  @OnEvent(DomainEventName(UserActivatedDomainEvent), {
    async: true,
    promisify: true,
  })
  async handle(event: UserActivatedDomainEvent) {
    const {userId, emailAddress, name} = event;

    this.eventBus.publishEvent("iam.user_activated", {
      userId: userId.value,
      emailAddress: emailAddress.address,
      name: name.fullName,
    });
  }
}
