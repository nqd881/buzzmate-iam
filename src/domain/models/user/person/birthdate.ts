import {ValueObject, ValueObjectProps} from "@libs/ddd/value-object";

export interface IBirthDateProps {
  date: number;
  month: number;
  year: number;
}

export class BirthDate extends ValueObject<IBirthDateProps> {
  constructor(props: ValueObjectProps<IBirthDateProps>) {
    super(props);
  }

  validate() {}

  get date() {
    return this.props.date;
  }

  get month() {
    return this.props.month;
  }

  get year() {
    return this.props.year;
  }

  static from(time: Date) {
    return new BirthDate({
      date: time.getDate(),
      month: time.getMonth(),
      year: time.getFullYear(),
    });
  }

  toUTCDate() {
    return new Date(Date.UTC(this.year, this.month, this.date));
  }
}
