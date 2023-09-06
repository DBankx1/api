import mongoose from 'mongoose';

export function checkValidId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}
