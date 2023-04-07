import {ValueObject, ValueObjectProps} from "@libs/ddd/value-object";
import {isEmail} from "class-validator";
import {isNil} from "lodash";

export interface IEmailAddressProps {
  address: string;
  isVerified: boolean;
}

export class EmailAddress extends ValueObject<IEmailAddressProps> {
  constructor(props: ValueObjectProps<IEmailAddressProps>) {
    super(props);
  }

  protected validate(props: ValueObjectProps<IEmailAddressProps>) {
    const {address, isVerified} = props;

    if (isNil(isVerified))
      throw new Error("[EmailAddress] isVerified cannot be null");

    if (!isEmail(address))
      throw new Error("[EmailAddress] Invalid email format");
  }

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
