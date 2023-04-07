import {Gender} from "@domain/models";
import {Command, CommandProps} from "@libs/ddd/command";

export class RegisterUserCommand extends Command {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly birthDate: Date;
  public readonly gender: Gender;
  public readonly username: string;
  public readonly password: string;
  public readonly emailAddress: string;
  public readonly phoneNumber?: string;

  constructor(props: CommandProps<RegisterUserCommand>) {
    super(props);

    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.birthDate = props.birthDate;
    this.gender = props.gender;
    this.username = props.username;
    this.password = props.password;
    this.emailAddress = props.emailAddress;
    this.phoneNumber = props.phoneNumber;
  }
}
