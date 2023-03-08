import {Command, CommandProps} from "@libs/ddd/command";

export enum SendAuthenticationCodeChannels {
  EMAIL = "email",
  SMS = "sms",
}

export class SendAuthenticationCodeCommand extends Command {
  public readonly channel: SendAuthenticationCodeChannels;
  public readonly destination: string;

  constructor(props: CommandProps<SendAuthenticationCodeCommand>) {
    super(props);

    this.channel = props.channel;
    this.destination = props.destination;
  }
}
