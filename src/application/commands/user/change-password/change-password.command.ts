import {Command, CommandProps} from "@libs/ddd/command";

export class ChangePasswordCommand extends Command {
  public readonly userId: string;
  public readonly oldPassword: string;
  public readonly newPassword: string;

  constructor(props: CommandProps<ChangePasswordCommand>) {
    super(props);

    this.userId = props.userId;
    this.oldPassword = props.oldPassword;
    this.newPassword = props.newPassword;
  }
}
