import {Gender} from "@domain/models";
import {Command, CommandProps} from "@libs/ddd/command";

export class UpdatePersonalInfoCommand extends Command {
  public readonly userId: string;
  public readonly firstName?: string;
  public readonly lastName?: string;
  public readonly birthDate?: Date;
  public readonly gender?: Gender;
  public readonly country?: string;
  public readonly state?: string;
  public readonly city?: string;
  public readonly streetLine1?: string;
  public readonly streetLine2?: string;
  public readonly postalCode?: string;

  constructor(props: CommandProps<UpdatePersonalInfoCommand>) {
    super(props);

    this.userId = props.userId;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.birthDate = props.birthDate;
    this.gender = props.gender;
    this.country = props.country;
    this.state = props.state;
    this.city = props.city;
    this.streetLine1 = props.streetLine1;
    this.streetLine2 = props.streetLine2;
    this.postalCode = props.postalCode;
  }
}
