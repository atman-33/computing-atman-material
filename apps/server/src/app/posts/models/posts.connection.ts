import { ConnectionArgs, ConnectionModel, ConnectionQueryArgs } from '@libs/nest-shared/domain';
import { Injectable, Logger } from '@nestjs/common';
import { ObjectType } from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
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
    
    async loadConnection(args: ConnectionQueryArgs){
        await super.loadConnection(args, this.model);
    }

    async loadConnectionByCategory(args: ConnectionArgs, category: string){
        let filterQuery: FilterQuery<PostDocument> = {};

        filterQuery = {
             categories: { $in: category} , 
        };

        await super.loadConnectionByFilterQuery(args, this.model, filterQuery)
    }

    async loadConnectionByTag(args: ConnectionArgs, tag: string){
        let filterQuery: FilterQuery<PostDocument> = {};

        filterQuery = {
             tags: { $in: tag} , 
        };

        await super.loadConnectionByFilterQuery(args, this.model, filterQuery)
    }
}