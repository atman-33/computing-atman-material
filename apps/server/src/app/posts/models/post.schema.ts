import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from '../../database/abstract.schema';

@Schema({ versionKey: false})
export class PostDocument extends AbstractDocument{
    @Prop()
    name: string

    @Prop()
    title: string;

    @Prop({ type: Date})
    date: Date;

    @Prop()
    thumbnail?: string

    @Prop()
    category: string

    @Prop([String])
    tags?: string[]

    @Prop()
    article: string
}

export const PostSchema = SchemaFactory.createForClass(PostDocument);