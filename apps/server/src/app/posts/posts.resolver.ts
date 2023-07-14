import { ConnectionArgs, ConnectionQueryArgs } from '@libs/nest-shared/domain';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetPostArgs } from './dto/args/get-post-args.dto';
import { GetPostByNameArgs } from './dto/args/get-post-by-name-args.dto';
import { GetPostsByCategoryArgs } from './dto/args/get-posts-by-category-args.dto';
import { GetPostsByTagArgs } from './dto/args/get-posts-by-tag-args.dto';
import { CategoryCount } from './models/category-count.model';
import { Post } from './models/post.model';
import { TagCount } from './models/tag-count.model';
import { PostsConnection } from './posts.connection';
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

    @Query(() => Post, { name: 'postByName' })
    async getPostByName(
        @Args() getPosByNameArgs: GetPostByNameArgs,
    ) {
        return this.postsService.getPostByName(getPosByNameArgs);
    }


    @Query(() => PostsConnection, { name: 'postsConnection' })
    async getPostsConnection(
        @Args() connectionQueryArgs: ConnectionQueryArgs
    ): Promise<PostsConnection> {
        return this.postsService.getPostsConnection(connectionQueryArgs);
    }

    @Query(() => PostsConnection, {name: 'postsConnectionByCategory'})
    async getPostsConnectionByCategory(
        @Args() connectionArgs: ConnectionArgs,
        @Args() getPostsByCategoryArgs: GetPostsByCategoryArgs
    ): Promise<PostsConnection> {
        return this.postsService.getPostsConnectionByCategory(connectionArgs, getPostsByCategoryArgs);
    }

    @Query(() => PostsConnection, {name: 'postsConnectionByTag'})
    async getPostsConnectionByTag(
        @Args() connectionArgs: ConnectionArgs,
        @Args() getPostsByTagArgs: GetPostsByTagArgs
    ): Promise<PostsConnection> {
        return this.postsService.getPostsConnectionByTag(connectionArgs, getPostsByTagArgs);
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
