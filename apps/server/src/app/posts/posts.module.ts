import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post } from './models/post.model';
import { PostSchema } from './models/post.schema';
import { PostsRepository } from './posts.repository';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

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
})
export class PostsModule {}
