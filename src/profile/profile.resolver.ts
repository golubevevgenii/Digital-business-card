import { Resolver, Query } from '@nestjs/graphql';
import { ProfileObjectType, EducationObjectType, ExperienceObjectType, SkillObjectType } from './entities/profile.entity/profile.entity';
import { ProfileService } from './profile.service';

@Resolver(() => ProfileObjectType)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileObjectType, { name: 'profileInfo' })
  async getProfileInfo(){
    return this.profileService.getInfo();
  }

  @Query(() => [EducationObjectType], { name: 'profileEducation' })
  async getProfileEducation(){
    return this.profileService.getEducation();
  }

  @Query(() => [ExperienceObjectType], { name: 'profileExperience' })
  async getProfileExperience(){
    return this.profileService.getExperience();
  }

  @Query(() => [SkillObjectType], { name: 'profileSkills' })
  async getProfileSkills(){
    return this.profileService.getSkills();
  }
}
