import { AbstractModel } from '@libs/nest-shared/domain';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User extends AbstractModel{
    @Field()
    readonly email: string;
}