import { Test, TestingModule } from '@nestjs/testing';
import { ChannelProviderController } from '../../../src/admin/channelprovider/channelprovider.controller';
import { ChannelProviderService } from '../../../src/admin/channelprovider/channelprovider.service';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { ChannelProviderRepository } from '../../../src/repositories/channelprovider.repository';

describe('ChannelproviderController', () => {
  let controller: ChannelProviderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelProviderController],
      providers: [
        ChannelProviderService,
        ChannelProviderRepository,
        PrismaService,
      ],
    }).compile();

    controller = module.get<ChannelProviderController>(
      ChannelProviderController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
