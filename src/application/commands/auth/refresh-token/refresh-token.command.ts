import {Command, CommandProps} from "@libs/ddd";

export class RefreshTokenCommand extends Command {
  public readonly refreshToken: string;

  constructor(props: CommandProps<RefreshTokenCommand>) {
    super(props);

    this.refreshToken = props.refreshToken;
  }
}
