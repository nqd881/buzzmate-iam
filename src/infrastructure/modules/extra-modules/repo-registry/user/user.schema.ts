import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type UserDocument = HydratedDocument<DbUser>;

@Schema()
export class DbUser {
  @Prop()
  _id: string;

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  emailAddress: string;

  @Prop()
  emailVerified: boolean;

  @Prop()
  phoneNumber: string;

  @Prop()
  phoneVerified: boolean;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  birthDate: Date;

  @Prop()
  gender: string;

  @Prop()
  country: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  streetLine1: string;

  @Prop()
  streetLine2: string;

  @Prop()
  postalCode: string;

  @Prop()
  tfaEnabled: boolean;

  @Prop()
  totpSecret: string;

  @Prop()
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(DbUser);
