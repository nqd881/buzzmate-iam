import {ValueObject, ValueObjectProps} from "@libs/ddd/value-object";

export interface IEmailAddressProps {
  address: string;
  isVerified: boolean;
}

export class EmailAddress extends ValueObject<IEmailAddressProps> {
  constructor(props: ValueObjectProps<IEmailAddressProps>) {
    super(props);
  }

  validate() {}

  static withUnverified(address: string) {
    return new EmailAddress({address, isVerified: false});
  }

  static withVerified(address: string) {
    return new EmailAddress({address, isVerified: true});
  }

  static allOf(address: string) {
    return [this.withUnverified(address), this.withVerified(address)];
  }

  get address() {
    return this.props.address;
  }

  get isVerified() {
    return this.props.isVerified;
  }

  verify() {
    if (this.isVerified) return this;

    return this.cloneWith({isVerified: true});
  }
}
