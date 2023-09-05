import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum SignUpType {
  Phone = 'Phone',
  Email = 'Email',
  Sso = 'Sso',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  stytchUserId: string;

  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  isEmailVerified: boolean;

  @Prop()
  signUpType: SignUpType;

  @Prop()
  email?: string;

  @Prop()
  phone?: string;

  @Prop()
  avatar?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
