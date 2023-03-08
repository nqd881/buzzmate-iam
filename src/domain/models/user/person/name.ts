import {ValueObject, ValueObjectProps} from "@libs/ddd/value-object";

export interface INameProps {
  firstName: string;
  lastName: string;
}

export class Name extends ValueObject<INameProps> {
  constructor(props: ValueObjectProps<INameProps>) {
    super(props);
  }

  validate() {}

  get firstName() {
    return this.props.firstName;
  }

  get lastName() {
    return this.props.lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
