import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetPostsByQueryCategoryTagArgs {
    @Field({ nullable: true })
    query?: string;

    @Field({ nullable: true })
    category?: string;

    @Field({ nullable: true })
    tag?: string;
}