import {Injectable} from "@nestjs/common";
import {
  IVerificationTokenService,
  VerificationTokenTypes,
} from "src/application/ports/interface/verification-token";
import crypto from "crypto";
import {InjectRedis} from "@liaoliaots/nestjs-redis";
import {Redis} from "ioredis";
import randomstring from "randomstring";
import ms from "ms";

export interface VerificationtokenConfig {
  time: string;
  length: number;
}

const TOKEN_CONFIGS: Record<VerificationTokenTypes, VerificationtokenConfig> = {
  [VerificationTokenTypes.AUTHENTICATION]: {
    time: "2m",
    length: 6,
  },
  [VerificationTokenTypes.USER_REGISTRATION]: {
    time: "1h",
    length: 256,
  },
  [VerificationTokenTypes.USER_DISABLEMENT]: {
    time: "1h",
    length: 256,
  },
  [VerificationTokenTypes.RESET_PASSWORD]: {
    time: "10m",
    length: 256,
  },
};

@Injectable()
export class VerificationTokenService implements IVerificationTokenService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  private keyOf(type: VerificationTokenTypes, userId: string) {
    return `${"vtoken"}:${type}:${userId}`;
  }

  private newValue(type: VerificationTokenTypes) {
    const {time, length} = TOKEN_CONFIGS[type];

    const code = randomstring.generate(length);
    const expiredAt = new Date(Date.now() + ms(time)).getTime();

    const value = this.buildValue(code, expiredAt);

    return {code, value};
  }

  private buildValue(code: string, expiredAt: number) {
    return [code, expiredAt].join(".");
  }

  private parseValue(value: string) {
    const [code, expiredAt] = value.split(".");

    return {code, expiredAt};
  }

  async generate(type: VerificationTokenTypes, userId: string) {
    const {code, value} = this.newValue(type);
    const key = this.keyOf(type, userId);

    await this.redis.sadd(key, value);

    return code;
  }

  async verify(type: VerificationTokenTypes, userId: string, code: string) {
    const key = this.keyOf(type, userId);

    const allTokens = await this.redis.smembers(key);

    const now = Date.now();

    let shouldDel = true;

    const result = allTokens.some((token) => {
      const {code: storedCode, expiredAt} = this.parseValue(token);

      if (Number(expiredAt) >= now) return false;

      shouldDel = false;

      return storedCode === code;
    });

    if (shouldDel) this.redis.del(key);

    return result;
  }
}
