import { AbstractModel } from '@libs/nest-shared/domain';
import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class Bookmark extends AbstractModel {
    @Field()
    readonly name: string;

    @Field()
    readonly userId: string;

    @Field(() => [String])
    readonly links: string[];
}