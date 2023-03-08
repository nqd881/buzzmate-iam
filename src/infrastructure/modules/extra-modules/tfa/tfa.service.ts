import {User} from "@domain/models";
import {Injectable} from "@nestjs/common";
import {ITfaService} from "src/application/ports/interface/tfa";

@Injectable()
export class TfaService implements ITfaService {
  generateCode(user: User, type: string): string {
    return null;
  }

  verifyCode(user: User, type: string, code: string): boolean {
    return false;
  }
}
