import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetPostsByTagArgs {
    @Field()
    @IsNotEmpty()
    @IsString()
    tag: string;
}