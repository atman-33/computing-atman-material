import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetPostsByCategoryArgs {
    @Field()
    @IsNotEmpty()
    @IsString()
    category: string;
}