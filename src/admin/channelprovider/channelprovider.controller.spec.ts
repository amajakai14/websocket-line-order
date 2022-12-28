import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './../../prisma/prisma.service';
import { ChannelproviderController } from './channelprovider.controller';
import { ChannelproviderService } from './channelprovider.service';

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
