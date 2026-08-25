import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EducationEntity,
  ExperienceEntity,
  ProfileInfoEntity,
  SkillEntity,
} from './entities/database/profile.database.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProfileInfoEntity,
      EducationEntity,
      ExperienceEntity,
      SkillEntity,
    ]),
  ],
  providers: [ProfileResolver, ProfileService],
})
export class ProfileModule {}
