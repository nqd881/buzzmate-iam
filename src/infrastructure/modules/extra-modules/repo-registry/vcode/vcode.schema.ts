import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type VCodeDocument = HydratedDocument<DbVCode>;

@Schema()
export class DbVCode {
  @Prop()
  _id: string;

  @Prop()
  userId: string;

  @Prop()
  value: string;

  @Prop()
  attemptLimit: number;

  @Prop()
  attemptCount: number;

  @Prop()
  expiredAt: number;
}

export const VCodeSchema = SchemaFactory.createForClass(DbVCode);
