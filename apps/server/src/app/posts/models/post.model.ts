import { Field, ObjectType } from '@nestjs/graphql';
import { AbstractModel } from '../../common/abstract.model';

@ObjectType()
export class Post extends AbstractModel {

    /**
     * Folder name
     */
    @Field()
    readonly name: string

    @Field()
    readonly title: string

    @Field(() => Date)
    readonly date: Date

    @Field({ nullable: true })
    readonly thumbnail?: string

    @Field(() => [String], { nullable: true })
    readonly categories?: string[]

    @Field(() => [String], { nullable: true })
    readonly tags?: string[]

    @Field()
    readonly article: string;

    @Field()
    readonly lead: string;
}