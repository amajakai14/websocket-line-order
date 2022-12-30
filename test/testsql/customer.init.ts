import { Injectable } from '@nestjs/common/decorators';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './../../src/prisma/prisma.service';

async function hashPassword(text: string): Promise<string> {
  return await bcrypt.hash(text, 10);
}
async function initCustomer() {
  const password = await hashPassword('password');
  return [
    {
      id: 1,
      mail_address: 'sample_user@example.com',
      login_id: 'sample_user',
      password: password,
    },
    {
      id: 2,
      mail_address: 'sample_user2@example.com',
      login_id: 'sample_user2',
      password: password,
    },
    {
      id: 3,
      mail_address: 'sample_user3@example.com',
      login_id: 'sample_user3',
      password: password,
    },
    {
      id: 4,
      mail_address: 'sample_user4@example.com',
      login_id: 'sample_user4',
      password: password,
    },
  ];
}

@Injectable()
export class CustomerMockData {
  constructor(private readonly prisma: PrismaService) {}

  async add() {
    const data = await initCustomer();
    await this.prisma.tbl_user.createMany({ data });
  }
}
