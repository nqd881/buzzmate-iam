import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {MongoDocBase} from "../mongo-doc-base";

@Schema({_id: false})
export class DbAddress {
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
}

export const DbAddressSchema = SchemaFactory.createForClass(DbAddress);

@Schema({_id: false})
export class DbPerson {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  birthDate: Date;

  @Prop()
  gender: string;

  @Prop({type: DbAddressSchema})
  address: DbAddress;
}

export const DbPersonSchema = SchemaFactory.createForClass(DbPerson);

@Schema({
  _id: false,
})
export class DbEmailAddress {
  @Prop()
  address: string;

  @Prop()
  isVerified: boolean;
}

const DbEmailAddressSchema = SchemaFactory.createForClass(DbEmailAddress);

@Schema({
  _id: false,
})
export class DbPhoneNumber {
  @Prop()
  number: string;

  @Prop()
  isVerified: boolean;
}

const DbPhoneNumberSchema = SchemaFactory.createForClass(DbPhoneNumber);

@Schema({
  versionKey: false,
})
export class DbUser extends MongoDocBase {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({type: DbEmailAddressSchema})
  email: DbEmailAddress;

  @Prop({type: DbPhoneNumberSchema})
  phone: DbPhoneNumber;

  // @Prop()
  // emailAddress: string;

  // @Prop()
  // emailVerified: boolean;

  // @Prop()
  // phoneNumber: string;

  // @Prop()
  // phoneVerified: boolean;

  @Prop({type: DbPersonSchema})
  person: DbPerson;

  @Prop()
  tfaEnabled: boolean;

  @Prop()
  totpSecret: string;

  @Prop()
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(DbUser);
