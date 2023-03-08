import {Command, CommandProps} from "@libs/ddd/command";

export class DisableUserCommand extends Command {
  public readonly userId: string;
  public readonly code: string;

  constructor(props: CommandProps<DisableUserCommand>) {
    super(props);

    this.userId = props.userId;
    this.code = props.code;
  }
}
