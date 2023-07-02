import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from '../database/abstract.repository';
import { Post } from './models/post.model';
import { PostDocument } from './models/post.schema';

@Injectable()
export class PostsRepository extends AbstractRepository<PostDocument>{
    protected readonly logger: Logger = new Logger(PostsRepository.name);

    constructor(@InjectModel(Post.name) postModel: Model<PostDocument>){
        super(postModel)
    }
}