import { Connection } from '@libs/nest-shared/domain';
import { ObjectType } from '@nestjs/graphql';
import { Post } from './models/post.model';

@ObjectType()
export class PostsConnection extends Connection<Post>(Post){}