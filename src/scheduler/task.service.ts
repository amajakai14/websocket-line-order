import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(TasksService.name);

  @Cron('0 * * * *')
  async handleCron() {
    const customer = await this.prisma.tbl_channel_provider.deleteMany({
      where: { time_end: { lt: new Date() } },
    });
    this.logger.debug(customer);
    this.logger.debug(new Date());
    this.logger.debug(process.env.TZ);
    this.logger.debug('Called when the current second is 45');
  }
}
