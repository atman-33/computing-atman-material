import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetPaginatedPostsArgs } from './dto/args/get-paginated-posts-args.dto';
import { GetPostArgs } from './dto/args/get-post-args.dto';
import { CategoryCount } from './models/category-count.model';
import { Post } from './models/post.model';
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
    async getAllPosts(): Promise<Post[]> {
        return this.postsService.getAllPosts();
    }

    @Query(() => [Post], { name: 'paginatedPosts' })
    async getPaginatedPosts(
        @Args() getPaginatedPostsArgs: GetPaginatedPostsArgs,
    ): Promise<Post[]> {
        return this.postsService.getPaginatedPosts(getPaginatedPostsArgs);
    }

    @Query(() => Post, { name: 'post' })
    async getPost(
        @Args() getPostArgs: GetPostArgs,
    ) {
        return this.postsService.getPost(getPostArgs);
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
