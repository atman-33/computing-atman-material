import { AbstractDocument } from '@libs/nest-shared/domain';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false})
export class PostDocument extends AbstractDocument{
    @Prop({index: true, text:true})
    name: string

    @Prop({text:true})
    title: string;

    @Prop({ type: Date})
    date: Date;

    @Prop()
    thumbnail?: string

    @Prop([String])
    categories: string[]

    @Prop([String])
    tags?: string[]

    @Prop({text:true})
    article: string

    @Prop()
    lead: string
}

export const PostSchema = SchemaFactory.createForClass(PostDocument);