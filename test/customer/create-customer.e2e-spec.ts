import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { tbl_customer } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CreateCustomerRequest } from '../../src/customer/customer.create.request';
import { CustomExceptionFilter } from '../../src/utils/filter/custom-exception.filter';
import { PrismaService } from './../../src/prisma/prisma.service';

describe('createCustomer (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new CustomExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  beforeEach(async () => {
    await prismaService.tbl_customer.deleteMany({});
    const testPath = path.dirname(__dirname);
    const sqlTestPath = path.join(testPath, '/testsql/customer-initial.sql');
    const testSql = fs.readFileSync(sqlTestPath, 'utf8');
    await prismaService.$executeRawUnsafe(testSql);
  });

  afterAll(async () => {
    await app.close();
  });

  const getCustomerData = async (login_id: string): Promise<tbl_customer> => {
    return prismaService.tbl_customer.findFirst({ where: { login_id } });
  };

  it('success', async () => {
    const req: CreateCustomerRequest = {
      loginId: 'IamIronman',
      password: 'password',
      mailAddress: 'iRonMaN@example.com',
    };
    await request(app.getHttpServer()).post('/customer').send(req).expect(201);
    const record = await getCustomerData('iamironman');
    expect(record).not.toBeNull();
    expect(record.mail_address).toBe('ironman@example.com');
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
