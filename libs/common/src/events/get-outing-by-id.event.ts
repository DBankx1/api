import { instanceToPlain } from 'class-transformer';

export class GetOutingByIdEvent {
  constructor(id: string, userId: string) {
    this.id = id;
    this.userId = userId;
  }

  id: string;
  userId: string;

  toString() {
    return JSON.stringify(instanceToPlain(this));
  }
}
