import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post } from './models/post.model';
import { PostSchema } from './models/post.schema';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  providers: [PostsResolver, PostsService, PostsRepository],
  controllers: [PostsController],
  exports:[PostsService]
})
export class PostsModule {}
