import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { ChannelproviderService } from './channelprovider.service';

describe('ChannelproviderService', () => {
  let service: ChannelproviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelproviderService, PrismaService],
    }).compile();

    service = module.get<ChannelproviderService>(ChannelproviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
