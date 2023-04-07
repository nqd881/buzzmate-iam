import {Command, CommandProps} from "@libs/ddd";

export class VerifyAccessTokenCommand extends Command {
  public readonly accessToken: string;

  constructor(props: CommandProps<VerifyAccessTokenCommand>) {
    super(props);

    this.accessToken = props.accessToken;
  }
}
