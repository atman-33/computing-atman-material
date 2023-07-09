import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetPostByNameArgs {
    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;
}