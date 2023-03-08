import {ValueObject, ValueObjectProps} from "@libs/ddd/value-object";

export interface IPhoneNumberProps {
  number: string;
  isVerified: boolean;
}

export class PhoneNumber extends ValueObject<IPhoneNumberProps> {
  constructor(props: ValueObjectProps<IPhoneNumberProps>) {
    super(props);
  }

  validate() {}

  get number() {
    return this.props.number;
  }

  get isVerified() {
    return this.props.isVerified;
  }

  static withUnverified(number: string) {
    return new PhoneNumber({number, isVerified: false});
  }

  static withVerified(number: string) {
    return new PhoneNumber({number, isVerified: true});
  }

  verify() {
    if (!this.isVerified) return this;

    return this.cloneWith({isVerified: true});
  }
}
