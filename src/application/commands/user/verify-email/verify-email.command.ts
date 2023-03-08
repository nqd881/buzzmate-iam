import {Command, CommandProps} from "@libs/ddd/command";

export class VerifyEmailCommand extends Command {
  public readonly userId: string;
  public readonly verificationCode: string;

  constructor(props: CommandProps<VerifyEmailCommand>) {
    super(props);

    this.userId = props.userId;
    this.verificationCode = props.verificationCode;
  }
}
