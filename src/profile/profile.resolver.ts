import { Resolver, Query } from '@nestjs/graphql';
import { ProfileObjectType } from './entities/profile.entity/profile.entity';
import { ProfileService } from './profile.service';

@Resolver(() => ProfileObjectType)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileObjectType, { name: 'profile' })
  async getProfile(): Promise<ProfileObjectType> {
    return this.profileService.getProfileData();
  }
}
