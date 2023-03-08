import {ValueObject, ValueObjectProps} from "@libs/ddd/value-object";

export interface IPasswordProps {
  value: string;
  isHashed: boolean;
}

export class Password extends ValueObject<IPasswordProps> {
  private constructor(props: ValueObjectProps<IPasswordProps>) {
    super(props);
  }

  validate() {}

  get value() {
    return this.props.value;
  }

  get isHashed() {
    return this.props.isHashed;
  }

  static withHashed(value: string) {
    return new Password({value, isHashed: true});
  }

  static withRaw(value: string) {
    return new Password({value, isHashed: false});
  }
}
