import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { tbl_customer } from '@prisma/client';
import * as request from 'supertest';
import { CreateCustomerRequest } from '../src/customer/customer.create.request';
import { LoginRequest } from '../src/login/login.request';
import { Menu } from '../src/model/menu';
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
    await prisma.$executeRawUnsafe(
      "SELECT setval(pg_get_serial_sequence('tbl_menu', 'id'), coalesce(max(id)+1, 1), false) FROM tbl_menu;",
    );
    await prisma.$executeRawUnsafe(
      "SELECT setval(pg_get_serial_sequence('tbl_customer', 'id'), coalesce(max(id)+1, 1), false) FROM tbl_customer;",
    );
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

  it('/customer (POST) fail: cause of registerd login id', async () => {
    const req: CreateCustomerRequest = {
      loginId: 'sample_user',
      password: 'password',
      mailAddress: 'rare_mail@example.com',
    };
    const response = await request(app.getHttpServer())
      .post('/customer')
      .send(req);
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toContain('id');
  });

  it('/customer (POST) fail: cause of registerd login id', async () => {
    const req: CreateCustomerRequest = {
      loginId: 'rare_name',
      password: 'password',
      mailAddress: 'sample_user@example.com',
    };

    const response = await request(app.getHttpServer())
      .post('/customer')
      .send(req);
    expect(response.statusCode).toBe(409);
    expect(response.body.message).toContain('email address');
  });

  const getCustomerData = async (login_id: string): Promise<tbl_customer> => {
    return prisma.tbl_customer.findFirst({ where: { login_id } });
  };

  it('success', async () => {
    const req: LoginRequest = {
      loginId: 'sample_user2',
      password: 'password',
    };

    const token = await login(req);
    const response = await request(app.getHttpServer())
      .get('/admin/menus')
      .set({ authorization: 'Bearer ' + token });
    const menuList: Menu[] = response.body;
    expect(response.statusCode).toBe(200);
    expect(menuList.length).toBe(3);
  });

  it('have not register any menu yet', async () => {
    const req: LoginRequest = {
      loginId: 'sample_user3',
      password: 'password',
    };

    const token = await login(req);
    const response = await request(app.getHttpServer())
      .get('/admin/menus')
      .set({ authorization: 'Bearer ' + token });
    const menuList: Menu[] = response.body;
    expect(response.statusCode).toBe(200);
    expect(menuList.length).toBe(0);
  });

  async function login(req: LoginRequest): Promise<string> {
    const response = await request(app.getHttpServer())
      .post('/login')
      .send(req);
    return response.body.token;
  }
});
