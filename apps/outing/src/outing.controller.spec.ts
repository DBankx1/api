import { Test, TestingModule } from '@nestjs/testing';
import { OutingController } from './outing.controller';
import { OutingService } from './outing.service';

describe('OutingController', () => {
  let outingController: OutingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OutingController],
      providers: [OutingService],
    }).compile();

    outingController = app.get<OutingController>(OutingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(outingController.getHello()).toBe('Hello World!');
    });
  });
});
