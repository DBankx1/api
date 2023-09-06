import { Outing, OutingStatus } from '@db/persistance';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  CreateOutingEvent,
  GetOutingByIdEvent,
  SearchOutingEvent,
  UpdateOutingEvent,
  checkValidId,
} from '@outler/common';
import { SearchOutingType } from '@outler/common/dtos/outing';
import { Model } from 'mongoose';

@Injectable()
export class OutingService {
  constructor(
    @InjectModel(Outing.name) private _outingDbService: Model<Outing>,
  ) {}

  async handleCreateOuting(data: CreateOutingEvent) {
    try {
      var outing = new this._outingDbService({
        userId: data.userId,
        name: data.name,
        budget: data.budget,
        currency: data.currency,
        description: data.description,
        status: OutingStatus.Planning,
        link: data.link,
      });
      await outing.save();
      return outing.toJSON();
    } catch (error) {
      Logger.error('Error occurred creating outing', error);
      throw error;
    }
  }

  async handleSearchOutings(query: SearchOutingEvent) {
    if (!query.userId) throw new UnauthorizedException();
    var outings: Outing[] = [];
    try {
      switch (query.type) {
        case SearchOutingType.All:
          outings = [];
          break;
        case SearchOutingType.Creator:
          outings = await this._outingDbService.find({ userId: query.userId });
          break;
        case SearchOutingType.Invited:
          outings = [];
          break;
        default:
          return [];
      }
      return outings;
    } catch (error) {
      Logger.error('Error finding outings', error);
      throw error;
    }
  }

  async handleGetOutingById(data: GetOutingByIdEvent) {
    if (!checkValidId(data.id))
      throw new BadRequestException('Invalid id format');
    if (!data.userId) throw new UnauthorizedException();
    try {
      var outing = await this._outingDbService.findById(data.id);
      if (!outing)
        throw new NotFoundException(`Outing with id ${data.id} was not found`);
      //TODO: authorized check
      return outing.toJSON();
    } catch (error) {
      Logger.error(`Error occurred finding outing with id ${data.id}`, error);
      throw error;
    }
  }

  async handleUpdateOutingById(data: UpdateOutingEvent) {
    if (!checkValidId(data.id))
      throw new BadRequestException('Invalid id format');
    if (!data.userId) throw new UnauthorizedException();
    try {
      var outing = await this._outingDbService.findById(data.id);
      if (!outing)
        throw new NotFoundException(`Outing with id ${data.id} was not found`);
      if (data.userId != outing.userId)
        throw new UnauthorizedException(
          `You do not have access to this outing`,
        );
      outing.name = data.name ?? outing.name;
      outing.description = data.description ?? outing.description;
      outing.link = data.link ?? outing.link;
      outing.budget = data.budget ?? outing.budget;
      // TODO -> updating budget should send messages to users notifiying them of buget change;
      var updatedOuting = await outing.save();
      return updatedOuting.toJSON();
    } catch (error) {
      Logger.error(`Error occurred updating outing with id ${data.id}`, error);
      throw error;
    }
  }
}
