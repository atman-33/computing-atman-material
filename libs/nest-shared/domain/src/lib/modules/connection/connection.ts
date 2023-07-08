import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '../common/abstract.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Connection<T extends AbstractModel>(genericClass: Type<T>): any {

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
    class AbstractConnection {
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
    }

    return AbstractConnection;
}