import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as path from 'path';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { dataSource } from '../src/config/typeorm.datasource';
import { CreateCustomerRequest } from '../src/customer/customer.create.request';
import { CustomerEntity } from '../src/entities/customer.entity';
import { CustomExceptionFilter } from '../src/utils/filter/custom-exception.filter';

describe('createCustomer (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<CustomerEntity>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    await dataSource.initialize();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new CustomExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    repository = await dataSource.getRepository(CustomerEntity);
    await repository.clear();

    const sqlTestPath = path.join(__dirname, 'testsql/customer-initial.sql');
    console.log('testPath', sqlTestPath);
    const testSql = fs.readFileSync(sqlTestPath, 'utf8');
    await dataSource.query(testSql);

    await app.init();
  });

  afterEach(async () => {
    await dataSource.destroy();
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

  it('success', async () => {
    const req: CreateCustomerRequest = {
      loginId: 'IamIronman',
      password: 'password',
      mailAddress: 'ironman@example.com',
    };
    await request(app.getHttpServer()).post('/customer').send(req).expect(201);
    const record = await getCustomerData();
    console.log('get record: ', record);
  });

  it('fail: cause of login id is too short', async () => {
    const req: CreateCustomerRequest = {
      loginId: 'Iam',
      password: 'password',
      mailAddress: 'ironman@example.com',
    };
    await request(app.getHttpServer()).post('/customer').send(req).expect(400);
  });

  it('fail: is not an email', async () => {
    const req: CreateCustomerRequest = {
      loginId: 'Iamironman',
      password: 'password',
      mailAddress: 'ironmaxample.com',
    };
    const response = await request(app.getHttpServer())
      .post('/customer')
      .send(req);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toHaveLength(1);
    expect(response.body.message[0]).toContain('mailAddress');
  });

  it('fail: cause of registerd login id', async () => {
    const req: CreateCustomerRequest = {
      loginId: 'sample_user',
      password: 'password',
      mailAddress: 'ironman@example.com',
    };
    const response = await request(app.getHttpServer())
      .post('/customer')
      .send(req);
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toContain('id');
  });

  it('fail: cause of registerd login id', async () => {
    const req: CreateCustomerRequest = {
      loginId: 'ironmaniscoming',
      password: 'password',
      mailAddress: 'sample_user@example.com',
    };

    const response = await request(app.getHttpServer())
      .post('/customer')
      .send(req);
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toContain('email address');
  });
});
