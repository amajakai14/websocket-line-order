import { Injectable } from '@nestjs/common';
import { CreateChannelRequest } from '../admin/channelprovider/channelprovider.add.request';
import { ChannelProvider } from '../model/channel-provider';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChannelProviderRepository {
  constructor(private prisma: PrismaService) {}

  async createChannel(
    id: string,
    user_id: number,
    req: CreateChannelRequest,
  ): Promise<boolean> {
    const result = this.prisma.tbl_channel_provider.create({
      data: {
        id,
        table_id: req.table_id,
        user_id,
        course_id: req.course_id,
        status: 'ACTIVE',
      },
    });
    return result != null;
  }

  async getActiveChannel(table_id: number, user_id: number): Promise<boolean> {
    const result = await this.prisma.tbl_channel_provider.findFirst({
      where: { table_id, user_id, status: 'ACTIVE' },
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

  async getChannelsOf(user_id: number): Promise<ChannelProvider[]> {
    const channels = await this.prisma.tbl_channel_provider.findMany({
      where: { user_id },
    });
    if (channels.length === 0) return [ChannelProvider.empty()];
    return channels.map((channel) => ChannelProvider.of(channel));
  }

  async deleteTableOf(id: number, user_id: number): Promise<boolean> {
    const result = await this.prisma.tbl_table.deleteMany({
      where: { id, user_id },
    });
    return result.count != 0;
  }
}
