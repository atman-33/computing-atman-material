import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    @Get('names')
    async getPostsNames(): Promise<string[]> {
        return await this.postsService.getPostsNames();
    }

    @Get('img/:name/:file')
    getPostImageFile(
        @Param('name') name: string,
        @Param('file') file: string,
        @Res() res: Response) {
        return this.postsService.getPostImageFile(name, file, res);
    }
}
