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

export type VerificationToken = {
  code: string;
  expiredAt: number;
  attemptLimit: number;
  attemptCount: number;
};

export interface VerificationTokenConfig {
  time: string;
  length: number;
  attemptLimit: number;
}

const TOKEN_CONFIGS: Record<VerificationTokenTypes, VerificationTokenConfig> = {
  [VerificationTokenTypes.AUTHENTICATION]: {
    time: "3m",
    length: 6,
    attemptLimit: 10,
  },
  [VerificationTokenTypes.USER_REGISTRATION]: {
    time: "1h",
    length: 256,
    attemptLimit: 10,
  },
  [VerificationTokenTypes.USER_DISABLEMENT]: {
    time: "1h",
    length: 256,
    attemptLimit: 10,
  },
  [VerificationTokenTypes.RESET_PASSWORD]: {
    time: "10m",
    length: 6,
    attemptLimit: 10,
  },
};

@Injectable()
export class VerificationTokenService implements IVerificationTokenService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  private keyOf(type: VerificationTokenTypes, userId: string) {
    return `${"vtoken"}:${type}:${userId}`;
  }

  private buildValue(
    code: string,
    expiredAt: number,
    attemptCount: number,
    attemptLimit: number
  ) {
    const rawObjectValue = {
      code,
      expiredAt,
      attemptCount,
      attemptLimit,
    };

    const stringObjectValue = JSON.stringify(rawObjectValue);

    const encodedValue = Buffer.from(stringObjectValue).toString("base64");

    return encodedValue;
  }

  private parseValue(value: string): VerificationToken {
    const decodedValue = Buffer.from(value, "base64").toString("utf8");

    const result = JSON.parse(decodedValue);

    return result;
  }

  private increaseAttemptCount(token: string) {
    const {code, expiredAt, attemptCount, attemptLimit} =
      this.parseValue(token);

    return this.buildValue(code, expiredAt, attemptCount + 1, attemptLimit);
  }

  private newValue(type: VerificationTokenTypes) {
    const {time, length, attemptLimit} = TOKEN_CONFIGS[type];

    const code = randomstring.generate(length);
    const expiredAt = new Date(Date.now() + ms(time)).getTime();
    const attemptCount = 0;

    const value = this.buildValue(code, expiredAt, attemptCount, attemptLimit);

    return {code, value};
  }

  async generate(type: VerificationTokenTypes, userId: string) {
    const {code, value} = this.newValue(type);
    const key = this.keyOf(type, userId);

    await this.redis.set(key, value);

    return code;
  }

  async verify(type: VerificationTokenTypes, userId: string, code: string) {
    const key = this.keyOf(type, userId);

    const token = await this.redis.get(key);

    const now = Date.now();

    const del = () => this.redis.del(key);
    const update = (value: string) => this.redis.set(key, value);

    const {
      code: storedCode,
      expiredAt,
      attemptCount,
      attemptLimit,
    } = this.parseValue(token);

    const isExpired = now >= expiredAt;
    const codeIsMatched = storedCode === code;
    const reachLimit = attemptCount + 1 >= attemptLimit;

    if (isExpired) {
      del();

      return false;
    }

    if (codeIsMatched) {
      del();

      return true;
    }

    if (reachLimit) {
      del();

      return false;
    }

    const newValue = this.increaseAttemptCount(token);

    update(newValue);

    return false;
  }
}
