export interface IVerificationTokenModelProps {
  userId: string;
  type: string;
  code: string;
  expiredAt: number;
}

export class VerificationTokenModel {
  public readonly userId: string;
  public readonly type: string;
  public readonly code: string;
  public readonly expiredAt: number;

  constructor(props: IVerificationTokenModelProps) {
    this.userId = props.userId;
    this.type = props.type;
    this.code = props.code;
    this.expiredAt = props.expiredAt;
  }

  isExpired(): boolean {
    const now = new Date();

    return now.getTime() >= this.expiredAt;
  }
}
