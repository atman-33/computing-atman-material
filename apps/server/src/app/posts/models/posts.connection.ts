import { ConnectionArgs, ConnectionModel } from '@libs/nest-shared/domain';
import { ObjectType } from '@nestjs/graphql';
import { Model } from 'mongoose';
import { Post } from './post.model';
import { PostDocument } from './post.schema';

@ObjectType()
export class PostsConnection extends ConnectionModel<Post>(Post){
    
    async loadConnection(args: ConnectionArgs, postModel: Model<PostDocument>){
        await super.loadConnection(args, postModel);
    }
}