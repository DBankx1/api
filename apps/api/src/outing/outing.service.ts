import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import {
  CreateOutingEvent,
  GetOutingByIdEvent,
  SearchOutingEvent,
  UpdateOutingEvent,
} from '@outler/common';
import {
  CreateOutingDto,
  SearchOutingDto,
  UpdateOutingDto,
} from '@outler/common/dtos/outing';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class OutingService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('OUTING_SERVICE') private readonly _outingClient: ClientKafka,
  ) {}

  async onModuleInit() {
    this._outingClient.subscribeToResponseOf('create_outing');
    this._outingClient.subscribeToResponseOf('search_outing');
    this._outingClient.subscribeToResponseOf('get_outing_by_id');
    this._outingClient.subscribeToResponseOf('update_outing_by_id');
    await this._outingClient.connect();
  }

  async onModuleDestroy() {
    await this._outingClient.close();
  }

  createOuting(createOutingDto: CreateOutingDto) {
    // TODO: Add authorization here
    var createOutingEvent = plainToInstance(CreateOutingEvent, {
      ...createOutingDto,
      userId: '64f7bf8fc70b1a12e46a9dbf',
    });
    return new Promise((resolve, reject) => {
      this._outingClient.send('create_outing', createOutingEvent).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    });
  }

  searchOutings(query: SearchOutingDto) {
    var searchOutingEvent = plainToInstance(SearchOutingEvent, {
      ...query,
      userId: '64f7bf8fc70b1a12e46a9dbf',
    });
    return new Promise((resolve, reject) => {
      this._outingClient.send('search_outing', searchOutingEvent).subscribe({
        next: (response) => resolve(response),
        error: (error) => reject(error),
      });
    });
  }

  getOutingById(id: string) {
    // TODO: Add authentication
    return new Promise((resolve, reject) => {
      this._outingClient
        .send(
          'get_outing_by_id',
          new GetOutingByIdEvent(id, '64f7bf8fc70b1a12e46a9dbf'),
        )
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }

  updateOuting(id: string, updateOutingDto: UpdateOutingDto) {
    var updateOutingEvent = plainToInstance(UpdateOutingEvent, {
      id,
      userId: '64f7bf8fc70b1a12e46a9dbf',
      ...updateOutingDto,
    });
    return new Promise((resolve, reject) => {
      this._outingClient
        .send('update_outing_by_id', updateOutingEvent)
        .subscribe({
          next: (response) => resolve(response),
          error: (error) => reject(error),
        });
    });
  }
}
