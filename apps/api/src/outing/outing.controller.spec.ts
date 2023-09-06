import { Test, TestingModule } from '@nestjs/testing';
import { OutingController } from './outing.controller';

describe('OutingController', () => {
  let controller: OutingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OutingController],
    }).compile();

    controller = module.get<OutingController>(OutingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
