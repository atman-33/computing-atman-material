import { ConnectionArgs, ConnectionModel } from '@libs/nest-shared/domain';
import { ObjectType } from '@nestjs/graphql';
import { Model } from 'mongoose';
import { Post } from './models/post.model';
import { PostDocument } from './models/post.schema';

@ObjectType()
export class PostsConnection extends ConnectionModel<Post>(Post){

    async loadConnection(args: ConnectionArgs, postModel: Model<PostDocument>){
        await super.loadConnection(args, postModel);
    }
}