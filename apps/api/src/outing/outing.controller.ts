import { Body, Controller, Post, Query, Get, Param, Put } from '@nestjs/common';
import { OutingService } from './outing.service';
import {
  CreateOutingDto,
  SearchOutingDto,
  UpdateOutingDto,
} from '@outler/common/dtos/outing';

@Controller('outing')
export class OutingController {
  constructor(private readonly _service: OutingService) {}

  @Post()
  async createOuting(@Body() createOutingDto: CreateOutingDto) {
    return await this._service.createOuting(createOutingDto);
  }

  @Get()
  async getOutings(@Query() query: SearchOutingDto) {
    return await this._service.searchOutings(query);
  }

  @Get(':id')
  async getOutingById(@Param() param: any) {
    return await this._service.getOutingById(param.id);
  }

  @Put(':id')
  async UpdateOuting(
    @Param() param: any,
    @Body() updateOutingDto: UpdateOutingDto,
  ) {
    return await this._service.updateOuting(param.id, updateOutingDto);
  }
}
