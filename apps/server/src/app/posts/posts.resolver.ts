import { ConnectionArgs } from '@libs/nest-shared/domain';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetPostArgs } from './dto/args/get-post-args.dto';
import { CategoryCount } from './models/category-count.model';
import { Post } from './models/post.model';
import { PostsConnection } from './models/posts.connection';
import { TagCount } from './models/tag-count.model';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
    constructor(private readonly postsService: PostsService) { }

    @Mutation(() => [Post])
    async initializePostData(): Promise<Post[]> {
        return this.postsService.initializePostData();
    }

    @Query(() => [Post], { name: 'posts' })
    async getPosts(): Promise<Post[]> {
        return this.postsService.getPosts();
    }

    @Query(() => Post, { name: 'post' })
    async getPost(
        @Args() getPostArgs: GetPostArgs,
    ) {
        return this.postsService.getPost(getPostArgs);
    }

    @Query(() => PostsConnection, { name: 'postsConnection' })
    async getPostsConnection(
        @Args() connectionArgs: ConnectionArgs
    ): Promise<PostsConnection> {
        return this.postsService.getPostsConnection(connectionArgs);
    }

    @Query(() => [Post], { name: 'randomPostsWithSameCategoryOrTag' })
    async getRandomPostsWithSameCategoryOrTag(
        @Args() getPostArgs: GetPostArgs,
    ): Promise<Post[] | null> {
        return this.postsService.getRandomPostsWithSameCategoryOrTag(getPostArgs);
    }

    @Query(() => [CategoryCount], { name: 'categoryCounts' })
    async getCategoryCounts(): Promise<CategoryCount[]> {
        return this.postsService.getCategoryCounts();
    }

    @Query(() => [TagCount], { name: 'tagCounts' })
    async getTagCounts(): Promise<TagCount[]> {
        return this.postsService.getTagCounts();
    }
}
