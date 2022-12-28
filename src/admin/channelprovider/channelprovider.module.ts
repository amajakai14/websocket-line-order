import { Module } from '@nestjs/common';
import { ChannelproviderController } from './channelprovider.controller';
import { ChannelproviderService } from './channelprovider.service';

@Module({
  controllers: [ChannelproviderController],
  providers: [ChannelproviderService]
})
export class ChannelproviderModule {}
