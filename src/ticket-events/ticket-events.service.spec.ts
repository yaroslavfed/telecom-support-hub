import { Test, TestingModule } from '@nestjs/testing';
import { TicketEventsService } from './ticket-events.service';

describe('TicketEventsService', () => {
  let service: TicketEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketEventsService],
    }).compile();

    service = module.get<TicketEventsService>(TicketEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
