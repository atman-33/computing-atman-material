import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CategoryCount {
  @Field(() => String)
  category: string;

  @Field(() => Int)
  count: number;
}
