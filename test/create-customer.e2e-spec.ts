import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { dataSource } from '../src/config/typeorm.datasource';
import { CreateCustomerRequest } from '../src/customer/customer.create.request';
import { CustomerEntity } from '../src/entities/customer.entity';

describe('createCustomer (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<CustomerEntity>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await dataSource.initialize();
    repository = await dataSource.getRepository(CustomerEntity);
    await repository.clear();
    await app.init();
  });

  afterEach(async () => {
    await repository.clear();
    // await repository.clear();
  });

  afterAll(async () => {
    await app.close();
  });

  const getCustomerData = async () => {
    repository = dataSource.getRepository(CustomerEntity);
    const records = repository.find();
    console.log('records: ', records);
    return records;
  };

  it('/customer (POST)', async () => {
    const req: CreateCustomerRequest = {
      loginId: 'IamIronman',
      password: 'password',
      mailAddress: 'ironman@example.com',
    };
    await request(app.getHttpServer()).post('/customer').send(req).expect(201);
    const record = await getCustomerData();
    console.log('get record: ', record);
  });
});
