import { Injectable } from '@nestjs/common';
import { tbl_customer } from '@prisma/client';
import { Customer } from '../model/customer';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class CustomerRepository {
  constructor(private prisma: PrismaService) {}

  async getByCustomerId(id: number): Promise<Customer> {
    const customer: tbl_customer = await this.prisma.tbl_customer.findFirst({
      where: { id },
    });

    if (customer == null) return Customer.empty();
    return Customer.of(customer);
  }

  async getByLoginId(login_id: string): Promise<Customer> {
    const customer: tbl_customer = await this.prisma.tbl_customer.findFirst({
      where: { login_id },
    });
    if (customer == null) return Customer.empty();
    return Customer.of(customer);
  }

  async getByEmail(mail_address: string): Promise<Customer> {
    const customer: tbl_customer = await this.prisma.tbl_customer.findFirst({
      where: { mail_address },
    });
    if (customer == null) return Customer.empty();
    return Customer.of(customer);
  }

  async register(customer: Customer): Promise<Customer> {
    const result = await this.prisma.tbl_customer.create({
      data: {
        login_id: customer.loginId.toString(),
        password: await customer.hashPassword(),
        mail_address: customer.mailAddress.toString(),
      },
    });
    console.log('result of register', result);
    if (result == null) return Customer.empty();
    return Customer.of(result);
  }
}
