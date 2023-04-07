import {RabbitSubscribe} from "@golevelup/nestjs-rabbitmq";

export const EventBusSubscribe = (eventName: string, queue: string) =>
  RabbitSubscribe({exchange: "BuzzmateEventBus", routingKey: eventName, queue});
