import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TagCount {
  @Field(() => String)
  tag: string;

  @Field(() => Int)
  count: number;
}
