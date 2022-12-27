import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { tbl_customer } from '@prisma/client';
import * as request from 'supertest';
import { CreateCustomerRequest } from '../src/customer/customer.create.request';
import { LoginRequest } from '../src/login/login.request';
import { PrismaService } from '../src/prisma/prisma.service';
import { CustomExceptionFilter } from '../src/utils/filter/custom-exception.filter';
import { AppModule } from './../src/app.module';
import { CustomerMockData } from './testsql/customer.init';
import { MenuMockData } from './testsql/menu.init';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let mockCustomer: CustomerMockData;
  let mockMenu: MenuMockData;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService, MenuMockData, CustomerMockData],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new CustomExceptionFilter());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    prisma = moduleFixture.get<PrismaService>(PrismaService);
    mockCustomer = moduleFixture.get<CustomerMockData>(CustomerMockData);
    mockMenu = moduleFixture.get<MenuMockData>(MenuMockData);
    await initializeData();
    await app.init();
  });

  beforeEach(async () => {
    return;
  });

  afterAll(async () => {
    await app.close();
  });

  async function initializeData(): Promise<void> {
    await cleanupDB();
    await mockCustomer.add();
    await mockMenu.add();
  }

  async function cleanupDB(): Promise<void> {
    await prisma.tbl_channel_provider.deleteMany();
    await prisma.tbl_course.deleteMany();
    await prisma.tbl_customer.deleteMany();
    await prisma.tbl_order.deleteMany();
    await prisma.tbl_table.deleteMany();
    await prisma.tbl_menu.deleteMany();
    await prisma.tbl_customer.deleteMany();
  }

  xit('/ (GET)', () => {
    request(app.getHttpServer()).get('/').expect(404);
  });

  it('/login (POST) success', async () => {
    const req: LoginRequest = {
      loginId: 'sample_user2',
      password: 'password',
    };
    const response = await request(app.getHttpServer())
      .post('/login')
      .send(req);
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('/login (POST) fail: wrong login id', async () => {
    const req: LoginRequest = {
      loginId: 'wrong_user',
      password: 'password',
    };
    const response = await request(app.getHttpServer())
      .post('/login')
      .send(req);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('ID or Password are incorrect');
  });

  it('/login (POST) fail: wrong password', async () => {
    const req: LoginRequest = {
      loginId: 'sample_user2',
      password: 'passwordXD',
    };
    const response = await request(app.getHttpServer())
      .post('/login')
      .send(req);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('ID or Password are incorrect');
  });

  it('/customer (POST) success', async () => {
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

  const getCustomerData = async (login_id: string): Promise<tbl_customer> => {
    return prisma.tbl_customer.findFirst({ where: { login_id } });
  };
});
