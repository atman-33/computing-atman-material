import { ArgsType, Field, Int } from '@nestjs/graphql';
import { PostDocument } from '../../models/post.schema';

@ArgsType()
export class GetPaginatedPostsArgs {
    @Field(() => Int)
    pageSize: number;

    @Field({ nullable: true })
    cursor?: string;

    @Field(() => String, { nullable: true })
    sortField?: keyof PostDocument;

    @Field({ nullable: true })
    sortOrder?: 'asc' | 'desc';
}