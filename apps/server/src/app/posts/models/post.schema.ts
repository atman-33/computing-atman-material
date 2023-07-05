import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { index } from '@typegoose/typegoose';
import { AbstractDocument } from '../../database/abstract.schema';

@Schema({ versionKey: false})
@index({ name: 'text', title: 'text', article: 'text', lead: 'text' })
export class PostDocument extends AbstractDocument{
    @Prop()
    name: string

    @Prop()
    title: string;

    @Prop({ type: Date})
    date: Date;

    @Prop()
    thumbnail?: string

    @Prop([String])
    categories: string[]

    @Prop([String])
    tags?: string[]

    @Prop()
    article: string

    @Prop()
    lead: string
}

export const PostSchema = SchemaFactory.createForClass(PostDocument);