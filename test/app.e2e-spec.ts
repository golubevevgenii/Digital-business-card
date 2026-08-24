import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { afterAll, beforeAll, describe, expect, it } from '@jest/globals';
import { AppModule } from './../src/app.module';

describe('Application (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) serves the frontend', async () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .expect(({ text }) => {
        expect(text).toContain('<title>Визитка</title>');
      });
  });

  it('/GraphQL (POST) serves the API profileInfo', () => {
    return request(app.getHttpServer())
      .post('/GraphQL')
      .send({ query: '{ profileInfo { first_name } }' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.profileInfo.first_name).toBe('Иван');
      });
  });
  
  it('/GraphQL (POST) serves the API profileEducation', () => {
    return request(app.getHttpServer())
      .post('/GraphQL')
      .send({ query: '{ profileEducation { degree } }' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.profileEducation).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ degree: 'Бакалавр' }),
          ])
        );
      });
  });
  
  it('/GraphQL (POST) serves the API profileExperience', () => {
    return request(app.getHttpServer())
      .post('/GraphQL')
      .send({ query: '{ profileExperience { company_name } }' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.profileExperience[0].company_name).toBe('Tech Solutions');
      });
  });

  it('/GraphQL (POST) serves the API profileSkills', () => {
    return request(app.getHttpServer())
      .post('/GraphQL')
      .send({ query: '{ profileSkills { name } }' })
      .expect(200)
      .expect(({ body }) => {
        expect(body.data.profileSkills[0].name).toBe('SQL');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
