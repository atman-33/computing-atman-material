import { MarkdownHelper } from '@libs/nest-shared/domain';
import { SortUtils } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';
import { readFile, readdir } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { CreatePostInput } from './dto/input/create-post-input.dto';
import { Post } from './models/post.model';
import { PostDocument } from './models/post.schema';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {

    private readonly distPostsPath = 'dist/apps/server/assets/posts';

    constructor(private readonly postsRepository: PostsRepository) { }

    async initializePostData(): Promise<Post[]> {
        
        // delete all posts data
        await this.postsRepository.deleteMany({});

        // create all posts data
        const posts: Post[] = [];
        const postInputs = await this.createPostsInput();
        for(const postInput of postInputs){
            const postDocument = await this.postsRepository.create({
                ...postInput
            })
            // console.log(`post created: ${postInput.name}`);
            posts.push(this.toModel(postDocument));
        }

        return posts;
    }

    /**
     * Get all post names. Post name is (assets/posts/)folder name.
     * @returns 
     */
    async getPostsNames(): Promise<string[]> {
        const folderPath = join(process.cwd(), this.distPostsPath);
        try {
            const dirents = await promisify(readdir)(
                folderPath, {
                withFileTypes: true,
            });

            const folders = dirents
                .filter((dirent) => dirent.isDirectory())
                .map((dirent) => dirent.name);
            return folders;
        } catch (error) {
            console.error(`Failed to read directories: ${error}`);
            throw new Error('Failed to read directories');
        }
    }

    private async createPostsInput(): Promise<CreatePostInput[]> {
        const names = await this.getPostsNames();

        let posts: CreatePostInput[] = [];
        for (const name of names) {
            posts.push(await this.createPostInput(name));
        }

        posts = SortUtils.sortByDate(posts, 'date', 'desc');  // order by new post

        return posts;
    }

    private async createPostInput(name: string): Promise<CreatePostInput> {
        const filePath = join(process.cwd(), this.distPostsPath, name, 'index.md');
        try {
            const content = promisify(readFile)(filePath, { encoding: 'utf-8' });
            return this.parsePostContent(name, await content);
        } catch (error) {
            console.error(`Failed to read file: ${filePath}`);
            console.error(error);
        }
    }

    private parsePostContent(name: string, content: string): CreatePostInput {
        const createPostData: CreatePostInput = {
            name: name,
            title: MarkdownHelper.getMetadataValue(content, 'title:'),
            date: new Date(MarkdownHelper.getMetadataValue(content, 'date:')),
            thumbnail: MarkdownHelper.getMetadataValue(content, 'thumbnail:'),
            categories: MarkdownHelper.getMetadataArray(content, 'categories:'),
            tags: MarkdownHelper.getMetadataArray(content, 'tags:'),
            article: MarkdownHelper.getMdContent(content),
        };

        if (createPostData.thumbnail) {
            createPostData.thumbnail = join('/api/posts/img', createPostData.name, createPostData.thumbnail);
        }        
        createPostData.article = MarkdownHelper.addMdPrefixToImageSource(createPostData.article, './api/posts/img/' + createPostData.name + '/');

        return createPostData;
    }

    private toModel(postDocument: PostDocument): Post {
        return {
            _id: postDocument._id.toHexString(),
            ...postDocument
        } as unknown as Post;
    }
}
