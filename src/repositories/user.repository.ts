import { Injectable } from '@nestjs/common';
import { tbl_user } from '@prisma/client';
import { User } from '../model/user';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async getByUserId(id: number): Promise<User> {
    const user: tbl_user = await this.prisma.tbl_user.findFirst({
      where: { id },
    });

    if (user == null) return User.empty();
    return User.of(user);
  }

  async getByLoginId(login_id: string): Promise<User> {
    const customer: tbl_user = await this.prisma.tbl_user.findFirst({
      where: { login_id },
    });
    if (customer == null) return User.empty();
    return User.of(customer);
  }

  async getByEmail(mail_address: string): Promise<User> {
    const customer: tbl_user = await this.prisma.tbl_user.findFirst({
      where: { mail_address },
    });
    if (customer == null) return User.empty();
    return User.of(customer);
  }

  async register(customer: User): Promise<User> {
    const result = await this.prisma.tbl_user.create({
      data: {
        login_id: customer.loginId,
        password: await customer.hashPassword(),
        mail_address: customer.mailAddress,
      },
    });
    console.log('result of register', result);
    if (result == null) return User.empty();
    return User.of(result);
  }
}
