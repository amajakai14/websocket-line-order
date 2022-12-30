import { HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Result } from '../../model/result';
import { ChannelProviderRepository } from '../../repositories/channelprovider.repository';
import { CreateChannelRequest } from './channelprovider.add.request';

@Injectable()
export class ChannelProviderService {
  constructor(private readonly repository: ChannelProviderRepository) {}
  async createChannelProvider(
    customerId: number,
    req: CreateChannelRequest,
  ): Promise<Result> {
    let generatedId = '';
    while (true) {
      generatedId = uuid();
      const exists = await this.repository.getChannelOf(generatedId);
      if (exists.isEmpty() && generatedId !== '') {
        break;
      }
    }
    const success = this.repository.createChannel(generatedId, customerId, req);

    return success
      ? Result.OK()
      : Result.BAD(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'unable to create Channel',
        );
  }
}
