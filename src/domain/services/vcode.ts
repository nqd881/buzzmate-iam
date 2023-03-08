import ms from "ms";
import {UserId} from "../models";
import {VCode, VCodeValue} from "../models/vcode";

export interface VCodeConfig {
  type: string;
  codeProducer: () => string;
  attemptLimit: number;
  time: string;
}

export type VCodeGenerator = (userId: UserId) => VCode;

export class VCodeDomainService {
  static createGenerator(aConfig: VCodeConfig): VCodeGenerator {
    const {type, codeProducer, attemptLimit, time} = aConfig;

    const now = new Date();

    return (userId: UserId) =>
      new VCode({
        userId,
        value: new VCodeValue({type, content: codeProducer()}),
        attemptLimit,
        attemptCount: 0,
        expiredAt: now.getTime() + ms(time),
      });
  }
}
