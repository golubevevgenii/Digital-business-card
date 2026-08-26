import * as GraphQL from 'graphql';
import { Resolver, Query, Info } from '@nestjs/graphql';
import { ProfileObjectType, EducationObjectType, ExperienceObjectType, SkillObjectType } from './entities/profile.entity/profile.entity';
import { ProfileService } from './profile.service';
import { parseResolveInfo, ResolveTree, simplifyParsedResolveInfoFragmentWithType } from 'graphql-parse-resolve-info';

@Resolver(() => ProfileObjectType)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  private extractFields(info: GraphQL.GraphQLResolveInfo, requiredField: string = 'id'): string[] {
    const parsedInfo = parseResolveInfo(info) as ResolveTree;
    if (!parsedInfo) return [];

    const simplified = simplifyParsedResolveInfoFragmentWithType(parsedInfo, info.returnType);
    const fields = Object.keys(simplified.fields);
    if (requiredField && !fields.includes(requiredField)) {
      fields.push(requiredField);
    }
    
    return fields;
  }

  @Query(() => ProfileObjectType, { name: 'profileInfo' })
  async getProfileInfo(@Info() info: GraphQL.GraphQLResolveInfo){
    const  fields = this.extractFields(info)    
    return this.profileService.getInfo(fields);
  }

  @Query(() => [EducationObjectType], { name: 'profileEducation' })
  async getProfileEducation(@Info() info: GraphQL.GraphQLResolveInfo) {
    const fields = this.extractFields(info);
    return this.profileService.getEducation(fields);
  }

  @Query(() => [ExperienceObjectType], { name: 'profileExperience' })
  async getProfileExperience(@Info() info: GraphQL.GraphQLResolveInfo) {
    const fields = this.extractFields(info);
    return this.profileService.getExperience(fields);
  }

  @Query(() => [SkillObjectType], { name: 'profileSkills' })
  async getProfileSkills(@Info() info: GraphQL.GraphQLResolveInfo) {
    const fields = this.extractFields(info);
    return this.profileService.getSkills(fields);
  }
}
