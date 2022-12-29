import { Test, TestingModule } from '@nestjs/testing';
import { ChannelproviderService } from '../../../src/admin/channelprovider/channelprovider.service';
import { PrismaService } from '../../../src/prisma/prisma.service';

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
