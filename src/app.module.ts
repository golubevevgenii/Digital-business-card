import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProfileModule } from './profile/profile.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EducationEntity,
  ExperienceEntity,
  ProfileInfoEntity,
  SkillEntity,
} from './profile/entities/database/profile.database.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [ProfileInfoEntity, EducationEntity, ExperienceEntity, SkillEntity],
      synchronize: true,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public'),
      serveRoot: '/',
      exclude: ['/graphql', '/graphql/*path'],
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: '/graphql',
      autoSchemaFile: true,
      playground: true,
    }),
    ProfileModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
