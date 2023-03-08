import {Command, CommandProps} from "@libs/ddd/command";

export class ResetPasswordCommand extends Command {
  public readonly userId: string;
  public readonly code: string;
  public readonly newPassword: string;

  constructor(props: CommandProps<ResetPasswordCommand>) {
    super(props);

    this.userId = props.userId;
    this.code = props.code;
    this.newPassword = props.newPassword;
  }
}
