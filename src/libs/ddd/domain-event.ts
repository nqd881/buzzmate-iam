import _ from "lodash";
import {v4 as uuidv4} from "uuid";

export interface DomainEventMetadata {
  /** Timestamp when this domain event occurred */
  readonly timestamp: number;

  /** ID for correlation purposes (for Integration Events,logs correlation, etc).
   */
  readonly correlationId: string;

  /**
   * Causation id used to reconstruct execution order if needed
   */
  readonly causationId?: string;

  /**
   * User ID for debugging and logging purposes
   */
  readonly userId?: string;
}

export type DomainEventProps<T extends DomainEvent<T>> = Omit<
  T,
  "id" | "metadata"
> & {
  aggregateId: string;
  metadata?: DomainEventMetadata;
};

export class DomainEvent<T extends DomainEvent<T> = any> {
  private static get DEFAULT_METADATA(): Partial<DomainEventMetadata> {
    return {
      timestamp: Date.now(),
    };
  }

  public readonly id: string;
  public readonly aggregateId: string;
  public readonly metadata: DomainEventMetadata;

  constructor(props: DomainEventProps<T>) {
    this.id = uuidv4();
    this.aggregateId = props.aggregateId;
    this.metadata = _.merge(DomainEvent.DEFAULT_METADATA, props.metadata);
  }
}
