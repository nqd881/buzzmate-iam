import {ITotpService} from "src/application/ports/interface/totp";

export class TotpService implements ITotpService {
  constructor() {}

  generateSecret(): string {
    return null;
  }

  generate(): string {
    return null;
  }

  verify(secret: string, code: string) {
    return false;
  }
}
