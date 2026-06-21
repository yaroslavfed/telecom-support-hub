import { Test, TestingModule } from '@nestjs/testing';
import { TicketEventsController } from './ticket-events.controller';

describe('TicketEventsController', () => {
  let controller: TicketEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketEventsController],
    }).compile();

    controller = module.get<TicketEventsController>(TicketEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
