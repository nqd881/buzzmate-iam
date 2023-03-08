import {ValueObject, ValueObjectProps} from "@libs/ddd/value-object";

export interface IAddressProps {
  country: string;
  state: string;
  city: string;
  streetLine1: string;
  streetLine2: string;
  postalCode: string;
}

export class Address extends ValueObject<IAddressProps> {
  constructor(props: ValueObjectProps<IAddressProps>) {
    super(props);
  }

  validate() {}

  get country() {
    return this.props.country;
  }

  get state() {
    return this.props.state;
  }

  get city() {
    return this.props.city;
  }

  get streetLine1() {
    return this.props.streetLine1;
  }

  get streetLine2() {
    return this.props.streetLine2;
  }

  get postalCode() {
    return this.props.postalCode;
  }
}
