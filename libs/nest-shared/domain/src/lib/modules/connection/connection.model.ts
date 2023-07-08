import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { FilterQuery, Model } from 'mongoose';
import { AbstractModel } from '../common/abstract.model';
import { AbstractDocument } from '../database/abstract.schema';
import { ConnectionArgs } from './connection-args.dto';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ConnectionModel<T extends AbstractModel>(genericClass: Type<T>): any {

    @ObjectType(`${genericClass.name}PageInfo`, { isAbstract: true }) class PageInfo {
        @Field(() => Boolean, { nullable: false })
        hasNextPage!: boolean;

        @Field(() => Boolean, { nullable: false })
        hasPreviousPage!: boolean;

        @Field(() => String, { nullable: true })
        startCursor!: string;

        @Field(() => String, { nullable: true })
        endCursor!: string;
    }

    @ObjectType(`${genericClass.name}Edge`, { isAbstract: true }) class Edge<T>  {
        @Field(() => String, { nullable: false })
        cursor!: string;

        @Field(() => genericClass, { nullable: false })
        node!: T;
    }

    @ObjectType({ isAbstract: true })
    class Connection {
        @Field(() => [genericClass], { nullable: false })
        nodes!: T[];

        @Field(() => [Edge], { nullable: false })
        edges!: Edge<T>[];

        @Field(() => PageInfo, { nullable: false })
        pageInfo!: PageInfo;

        @Field(() => Int, { nullable: false })
        totalCount!: number;

        constructor() {
            this.edges  = []
        }

        async loadConnection<TDocument extends AbstractDocument>(args: ConnectionArgs, model: Model<TDocument>) {
            const { first, after, last, before, query } = args;

            let filterQuery: FilterQuery<AbstractDocument> = {};
    
            if (query) {
                filterQuery = {
                    ...filterQuery,
                    $text: { $search: query },
                };
            }
    
            let postsQuery = model.find(filterQuery);
    
            // after => first
            if (after) {
                postsQuery = postsQuery.find({ _id: { $gt: after } });
            }
    
            if (first) {
                postsQuery = postsQuery.sort({ _id: 1 }).limit(first);
            }
    
            // before => last
            if (before) {
                postsQuery = postsQuery.find({ _id: { $lt: before } });
            }
    
            if (last) {
                postsQuery = postsQuery.sort({ _id: -1 }).limit(last);
            }
    
            let posts = await postsQuery.exec();
            if (last) {
                posts = posts.reverse();
            }
            // console.log(posts);
    
            // post is Document(mongoose) type. then use toObject()
            this.nodes = posts.map((post) => this.toModel<TDocument>(post.toObject()));

            this.nodes.forEach((node) => {
                this.edges.push({
                    cursor: node._id,
                    node: node
                } as unknown as Edge<T>);
            });

            this.pageInfo = {
                hasNextPage: true,
                hasPreviousPage: true,
                startCursor: "dummy",
                endCursor: "dummy"
            },

                this.totalCount = 1;

        }

        init(nodes: T[]) {
            this.nodes = nodes;

            nodes.forEach((node) => {
                this.edges.push({
                    cursor: node._id,
                    node: node
                } as unknown as Edge<T>);
            });

            this.pageInfo = {
                hasNextPage: true,
                hasPreviousPage: true,
                startCursor: "dummy",
                endCursor: "dummy"
            },

                this.totalCount = 1;
        }

        private toModel<TDocument extends AbstractDocument>(document: TDocument): T {
            return {
                _id: document._id.toHexString(),
                ...document
            } as unknown as T;
        }
    }

    return Connection;
}