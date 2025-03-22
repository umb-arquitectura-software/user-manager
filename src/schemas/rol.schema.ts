import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type RolDocument = HydratedDocument<Rol>;


@Schema()
export class Rol {
  @Prop({ required: true, unique: true})
  name: string;

  @Prop({ required: true})
  description: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Permission', required: false })
  permissions: string[];
}

export const RolSchema = SchemaFactory.createForClass(Rol);