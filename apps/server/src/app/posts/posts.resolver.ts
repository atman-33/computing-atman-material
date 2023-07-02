import { Mutation, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver()
export class PostsResolver {
    constructor(private readonly postsService: PostsService){}

    @Mutation(() => [Post])
    async initializeData(): Promise<Post[]>{
        return this.postsService.initializeData();
    }
}
