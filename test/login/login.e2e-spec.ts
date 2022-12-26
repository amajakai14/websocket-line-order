import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as path from 'path';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { LoginRequest } from '../../src/login/login.request';
import { PrismaService } from '../../src/prisma/prisma.service';
import { CustomExceptionFilter } from '../../src/utils/filter/custom-exception.filter';

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

  it('login success', async () => {
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

  it('fail: cause of login id is too short', async () => {
    const req: LoginRequest = {
      loginId: 'Iam',
      password: 'password',
    };
    await request(app.getHttpServer()).post('/login').send(req).expect(400);
  });

  it('fail: wrong login id', async () => {
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

  it('fail: wrong password', async () => {
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
});
