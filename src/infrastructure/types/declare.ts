declare module "express-serve-static-core" {
  interface Request {
    userId: string;
    accessTokenPayload: any;
  }
}

export function autoDeclare() {}
