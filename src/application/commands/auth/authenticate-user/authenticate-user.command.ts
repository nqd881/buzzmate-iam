import {Command, CommandProps} from "@libs/ddd/command";

export class AuthenticateUserCommand extends Command {
  public readonly usernameOrEmail: string;
  public readonly password: string;
  public readonly code?: {
    type: string;
    value: string;
  };

  constructor(props: CommandProps<AuthenticateUserCommand>) {
    super(props);

    this.usernameOrEmail = props.usernameOrEmail;
    this.password = props.password;
    this.code = props.code;
  }
}
