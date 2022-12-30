import { tbl_channel_provider } from '@prisma/client';

export class ChannelProvider {
  channelProviderId: string;
  tableId: number;
  userId: number;
  courseId: number;
  status: string;
  timeStart: Date;
  timeEnd: Date;
  constructor(
    channelProviderId: string,
    tableId: number,
    userId: number,
    courseId: number,
    status: string,
    timeStart: Date,
    timeEnd: Date,
  ) {
    this.channelProviderId = channelProviderId;
    this.tableId = tableId;
    this.userId = userId;
    this.courseId = courseId;
    this.status = status;
    this.timeStart = timeStart;
    this.timeEnd = timeEnd;
  }

  isEmpty(): boolean {
    return (
      this.channelProviderId === '' &&
      this.courseId == -1 &&
      this.userId == -1 &&
      this.status == '' &&
      this.timeStart == null
    );
  }

  static of(channel: tbl_channel_provider) {
    return new ChannelProvider(
      channel.id,
      channel.table_id,
      channel.user_id,
      channel.course_id,
      channel.status,
      channel.time_start,
      channel.time_end,
    );
  }

  static empty(): ChannelProvider {
    return new ChannelProvider('', -1, -1, -1, '', null, null);
  }
}
