import { Controller } from '@nestjs/common';
import { OutingService } from './outing.service';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateOutingEvent,
  GetOutingByIdEvent,
  SearchOutingEvent,
  UpdateOutingEvent,
} from '@outler/common';

@Controller()
export class OutingController {
  constructor(private readonly _outingService: OutingService) {}

  @MessagePattern('create_outing')
  handleCreateOuting(data: CreateOutingEvent) {
    return this._outingService.handleCreateOuting(data);
  }

  @MessagePattern('search_outing')
  handleSearchOutings(query: SearchOutingEvent) {
    return this._outingService.handleSearchOutings(query);
  }

  @MessagePattern('get_outing_by_id')
  handleGetOutingById(data: GetOutingByIdEvent) {
    return this._outingService.handleGetOutingById(data);
  }

  @MessagePattern('update_outing_by_id')
  handleUpdateOutingById(data: UpdateOutingEvent) {
    return this._outingService.handleUpdateOutingById(data);
  }
}
