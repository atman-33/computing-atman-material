/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { env } from '@libs/shared/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';
import { PostsService } from './app/posts/posts.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // initialize Post Data in DB
  const postsService = app.get(PostsService);
  await postsService.initializePostData();
  
  const port = process.env.PORT || env.PORT;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
