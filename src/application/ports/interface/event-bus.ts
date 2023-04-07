export interface IEventBusPublisher {
  publish(eventName: string, data: any): void;
}
