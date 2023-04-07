import {Command, CommandProps} from "@libs/ddd/command";

export class ResetPasswordCommand extends Command {
  public readonly emailAddress: string;
  public readonly code: string;
  public readonly newPassword: string;

  constructor(props: CommandProps<ResetPasswordCommand>) {
    super(props);

    this.emailAddress = props.emailAddress;
    this.code = props.code;
    this.newPassword = props.newPassword;
  }
}
