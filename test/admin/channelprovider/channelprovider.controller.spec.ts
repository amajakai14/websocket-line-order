import { Test, TestingModule } from '@nestjs/testing';
import { ChannelproviderController } from '../../../src/admin/channelprovider/channelprovider.controller';
import { ChannelproviderService } from '../../../src/admin/channelprovider/channelprovider.service';
import { PrismaService } from '../../../src/prisma/prisma.service';

describe('ChannelproviderController', () => {
  let controller: ChannelproviderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelproviderController],
      providers: [ChannelproviderService, PrismaService],
    }).compile();

    controller = module.get<ChannelproviderController>(
      ChannelproviderController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
