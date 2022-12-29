import { Injectable } from '@nestjs/common';
import { CreateChannelRequest } from '../admin/channelprovider/channelprovider.add.request';
import { ChannelProvider } from '../model/channel-provider';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChannelProviderRepository {
  constructor(private prisma: PrismaService) {}

  async createChannel(
    id: string,
    customer_id: number,
    req: CreateChannelRequest,
  ): Promise<boolean> {
    const result = this.prisma.tbl_channel_provider.create({
      data: {
        id,
        table_id: req.table_id,
        customer_id,
        course_id: req.course_id,
        status: 'ACTIVE',
      },
    });
    return result != null;
  }

  async getActiveChannel(
    table_id: number,
    customer_id: number,
  ): Promise<boolean> {
    const result = await this.prisma.tbl_channel_provider.findFirst({
      where: { table_id, customer_id, status: 'ACTIVE' },
    });
    return result != null;
  }

  async updateChannel(id: string, status: string): Promise<boolean> {
    this.prisma.tbl_channel_provider.update({
      where: { id },
      data: {
        status,
      },
    });
    return;
  }

  async getChannelOf(id: string): Promise<ChannelProvider> {
    const channel = await this.prisma.tbl_channel_provider.findFirst({
      where: { id },
    });
    if (channel == null) return ChannelProvider.empty();
    return ChannelProvider.of(channel);
  }

  async getChannelsOf(customer_id: number): Promise<ChannelProvider[]> {
    const channels = await this.prisma.tbl_channel_provider.findMany({
      where: { customer_id },
    });
    if (channels.length === 0) return [ChannelProvider.empty()];
    return channels.map((channel) => ChannelProvider.of(channel));
  }

  async deleteTableOf(id: number, customer_id: number): Promise<boolean> {
    const result = await this.prisma.tbl_table.deleteMany({
      where: { id, customer_id },
    });
    return result.count != 0;
  }
}
