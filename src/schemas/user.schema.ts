import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;


@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true})
  email: string;

  @Prop({ required: true})
  password: string;

  @Prop({ required: true})
  username: string;

  @Prop({ required: true})
  firstName: string;

  @Prop({ required: true})
  lastName: string;

  @Prop({ required: false})
  cellPhone: string;

  @Prop({ required: true, unique: true})
  incremental: number;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Rol', required: true })
  roles: string[];


  @Prop({ required: false, default: true})
  status: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);