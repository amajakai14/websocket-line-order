import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as fs from 'fs';
import * as path from 'path';
import * as request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { LoginRequest } from '../../../src/login/login.request';
import { PrismaService } from '../../../src/prisma/prisma.service';
import { CustomExceptionFilter } from '../../../src/utils/filter/custom-exception.filter';

describe('menus (e2e)', () => {
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
    await prismaService.tbl_customer.deleteMany({ where: {} });
    await prismaService.tbl_menu.deleteMany({});
    const testPath = path.dirname(path.dirname(__dirname));
    const sqlTestPath = path.join(testPath, '/testsql/customer2-initial.sql');
    const sqlMenuPath = path.join(testPath, '/testsql/menu-initial.sql');
    const testSql = fs.readFileSync(sqlTestPath, 'utf8');
    const menuSql = fs.readFileSync(sqlMenuPath, 'utf8');

    await prismaService.$executeRawUnsafe(testSql);
    await prismaService.$executeRawUnsafe(menuSql);
  });

  afterAll(async () => {
    await app.close();
  });

  async function login(): Promise<string> {
    const req: LoginRequest = {
      loginId: 'sample_user2',
      password: 'password',
    };

    const response = await request(app.getHttpServer())
      .post('/login')
      .send(req);
    return response.body.token;
  }
  it('success', async () => {
    const token = await login();
    const response = await request(app.getHttpServer())
      .get('/admin/menus')
      .set({ authorization: 'Bearer ' + token });
    console.log(response.body);
  });
});
