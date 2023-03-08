import {MaybePromise} from "@libs/utilities/types";

export interface ITotpService {
  generateSecret(): string;
  generate(secret: string): string;
  verify(secret: string, code: string): MaybePromise<boolean>;
}
