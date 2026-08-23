import { Injectable } from '@nestjs/common';
import { ProfileObjectType } from './entities/profile.entity/profile.entity';

@Injectable()
export class ProfileService {
  async getProfileData(): Promise<ProfileObjectType> {
    return {
      id: 'usr_12345',
      username: 'john_doe',
      email: 'john@example.com',
      bio: 'Full-stack разработчик',
    };
  }
}
