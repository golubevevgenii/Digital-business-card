export class ProfileEntity {}

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ProfileObjectType {
  @Field(() => ID)
  id!: string;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field({ nullable: true })
  bio?: string;
}
