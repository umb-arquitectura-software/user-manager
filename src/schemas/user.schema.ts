import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;


@Schema()
export class User {
  @Prop({ required: true, unique: true})
  email: string;

  @Prop({ required: true})
  password: string;

  @Prop({ required: true})
  name: string;

  @Prop({ required: false})
  cell_phone: string;

  @Prop({ required: true, unique: true})
  incremental: number;

  @Prop({ required: false})
  nit: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Rol', required: true })
  roles: string[];


  @Prop({ required: false, default: true})
  status: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);