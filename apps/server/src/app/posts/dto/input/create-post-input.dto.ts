import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    title: string;

    @Field(() => Date)
    @IsNotEmpty()
    date: Date;

    @Field()
    @IsString()
    thumbnail?: string;

    @Field()
    @IsNotEmpty()
    @IsString()
    category: string;

    @Field(() => [String], { nullable: true })
    @IsString({ each: true })
    tags?: string[];

    @Field()
    @IsNotEmpty()
    @IsString()
    article: string;
}