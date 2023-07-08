import { ConnectionArgs, ConnectionModel } from '@libs/nest-shared/domain';
import { Injectable, Logger } from '@nestjs/common';
import { ObjectType } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './post.model';
import { PostDocument } from './post.schema';

@ObjectType()
@Injectable()
export class PostsConnection extends ConnectionModel<Post>(Post){
    protected readonly logger: Logger = new Logger(PostsConnection.name);
    private model: Model<PostDocument>;
    
    constructor(@InjectModel(Post.name) postModel: Model<PostDocument>){
        super(postModel);
        this.model = postModel;
    }
    
    async loadConnection(args: ConnectionArgs){
        await super.loadConnection(args, this.model);
    }
}