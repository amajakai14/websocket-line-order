import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ChannelProviderRepository } from '../../repositories/channelprovider.repository';
import { ChannelProviderController } from './channelprovider.controller';
import { ChannelProviderService } from './channelprovider.service';

@Module({
  controllers: [ChannelProviderController],
  providers: [ChannelProviderService, ChannelProviderRepository, PrismaService],
})
export class ChannelproviderModule {}
