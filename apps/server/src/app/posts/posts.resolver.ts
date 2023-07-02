import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetPostArgs } from './dto/args/get-post-args.dto';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
    constructor(private readonly postsService: PostsService){}

    @Mutation(()=> [Post])
    async initializePostData(): Promise<Post[]>{
        return this.postsService.initializePostData();
    }

    @Query(() => [Post], { name: 'posts' })
    async getPosts(
    ) {
        return this.postsService.getPosts();
    }

    @Query(() => Post, { name: 'post' })
    async getBookmark(
        @Args() getPostArgs: GetPostArgs,
    ) {
        return this.postsService.getPost(getPostArgs);
    }
}
