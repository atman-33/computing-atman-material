import { env } from '@libs/shared/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: () => ({
                uri: env.MONGODB_URI,
            }),
        }),
    ]
})
export class DatabaseModule { }
