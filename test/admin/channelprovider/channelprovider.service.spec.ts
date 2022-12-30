import { Test, TestingModule } from '@nestjs/testing';
import { ChannelProviderService } from '../../../src/admin/channelprovider/channelprovider.service';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { ChannelProviderRepository } from '../../../src/repositories/channelprovider.repository';

describe('ChannelproviderService', () => {
  let service: ChannelProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelProviderService,
        PrismaService,
        ChannelProviderRepository,
      ],
    }).compile();

    service = module.get<ChannelProviderService>(ChannelProviderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
