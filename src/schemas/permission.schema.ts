import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type PermissionDocument = HydratedDocument<Permission>;


@Schema()
export class Permission {
  @Prop({ required: true, unique: true})
  name: string;

  @Prop({ required: true})
  description: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);