import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OutingDocument = HydratedDocument<Outing>;

export enum OutingStatus {
  Planning = 'Planning',
  Done = 'Done',
  Waiting = 'Waiting',
}

@Schema({
  timestamps: true,
})
export class Outing {
  @Prop({
    isRequired: true,
  })
  userId: string;

  @Prop()
  name: string;

  @Prop()
  description?: string;

  @Prop()
  status: OutingStatus;

  @Prop()
  budget: number;

  @Prop()
  currency: string;

  @Prop()
  link?: string;
}

export const OutingSchema = SchemaFactory.createForClass(Outing);
