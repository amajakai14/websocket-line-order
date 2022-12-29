import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ChannelProviderRepository } from '../../repositories/channelprovider.repository';
import { ChannelproviderController } from './channelprovider.controller';
import { ChannelproviderService } from './channelprovider.service';

@Module({
  controllers: [ChannelproviderController],
  providers: [ChannelproviderService, ChannelProviderRepository, PrismaService],
})
export class ChannelproviderModule {}
