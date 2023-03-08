import {Command, CommandProps} from "@libs/ddd/command";

export class SendResetPasswordCodeCommand extends Command {
  public readonly emailAddress: string;

  constructor(props: CommandProps<SendResetPasswordCodeCommand>) {
    super(props);

    this.emailAddress = props.emailAddress;
  }
}
