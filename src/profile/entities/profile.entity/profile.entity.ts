import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class ProfileObjectType {
  @Field(() => ID)
  id!: string;

  @Field()
  first_name!: string;

  @Field()
  last_name!: string;

  @Field(() => Int, { nullable: true })
  birth_year?: number;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  telegram_url?: string;

  @Field({ nullable: true })
  location?: string;
}
@ObjectType()
export class EducationObjectType {
  @Field(() => ID)
  id!: string;

  @Field()
  university!: string;

  @Field(() => Int, { nullable: true })
  start_year?: number;

  @Field(() => Int, { nullable: true })
  end_year?: number;

  @Field({ nullable: true })
  degree?: string;

  @Field({ nullable: true })
  field_of_study?: string;
}

@ObjectType()
export class ExperienceObjectType {
  @Field(() => ID)
  id!: string;

  @Field()
  company_name!: string;

  @Field(() => Int, { nullable: true })
  start_year?: number;

  @Field(() => Int, { nullable: true })
  end_year?: number;

  @Field(() => [String], { defaultValue: [] })
  achievements!: string[];
}

@ObjectType()
export class SkillObjectType {
  @Field(() => ID)
  id!: string;

  @Field()
  skill!: string;
}

