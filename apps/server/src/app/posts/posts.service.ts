import { ConnectionArgs, ConnectionQueryArgs, Consts, MarkdownHelper } from '@libs/nest-shared/domain';
import { HtmlUtils, ShuffleUtils, SortUtils } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { readFile, readdir } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { GetPostArgs } from './dto/args/get-post-args.dto';
import { GetPostByNameArgs } from './dto/args/get-post-by-name-args.dto';
import { GetPostsByCategoryArgs } from './dto/args/get-posts-by-category-args.dto';
import { GetPostsByTagArgs } from './dto/args/get-posts-by-tag-args.dto';
import { CreatePostInput } from './dto/input/create-post-input.dto';
import { CategoryCount } from './models/category-count.model';
import { Post } from './models/post.model';
import { PostDocument } from './models/post.schema';
import { TagCount } from './models/tag-count.model';
import { PostsConnection } from './posts.connection';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {

    private readonly distPostsPath = 'dist/apps/server/assets/posts';

    constructor(
        private readonly postsRepository: PostsRepository,
        private readonly postsConnection: PostsConnection
    ) { }

    async initializePostData(): Promise<Post[]> {

        // delete all posts data
        await this.postsRepository.deleteMany({});

        // create all posts data
        const posts: Post[] = [];
        const postInputs = await this.createPostsInput();
        for (const postInput of postInputs) {
            const postDocument = await this.postsRepository.create({
                ...postInput
            });
            // console.log(`post created: ${postInput.name}`);
            posts.push(this.toModel(postDocument));
        }

        console.log('initialized post data.');
        return posts;
    }

    async getPosts(): Promise<Post[]> {
        const postDocuments = await this.postsRepository.find({});
        return postDocuments.map((post) => this.toModel(post));
    }

    async getPost(
        getPostArgs: GetPostArgs,
    ) {
        const postDocument = await this.postsRepository.findOne({
            ...getPostArgs
        });
        return this.toModel(postDocument);
    }

    async getPostByName(
        getPosByNameArgs: GetPostByNameArgs,
    ) {
        const postDocument = await this.postsRepository.findOne({
            ...getPosByNameArgs
        });
        return this.toModel(postDocument);
    }

    async getPostsConnection(
        connectionQueryArgs: ConnectionQueryArgs): Promise<PostsConnection> 
    {
        await this.postsConnection.loadConnection(connectionQueryArgs);
        return this.postsConnection;
    }

    async getPostsConnectionByCategory(
        connectionArgs: ConnectionArgs,
        getPostsByCategoryArgs: GetPostsByCategoryArgs
    ): Promise<PostsConnection>
    {
        await this.postsConnection.loadConnectionByCategory(connectionArgs, getPostsByCategoryArgs.category);
        return this.postsConnection;
    }

    async getPostsConnectionByTag(
        connectionArgs: ConnectionArgs,
        getPostsByTagArgs: GetPostsByTagArgs
    ): Promise<PostsConnection>
    {
        await this.postsConnection.loadConnectionByTag(connectionArgs, getPostsByTagArgs.tag);
        return this.postsConnection;
    }

    async getRandomPostsWithSameCategoryOrTag(
        getPostArgs: GetPostArgs,
    ): Promise<Post[] | null> {

        const post = await this.getPost(getPostArgs);    
        if (!post) {
          return null;
        }
    
        const { categories, tags } = post;    
        const relatedPosts = await this.postsRepository.find({
          $or: [
            { categories: { $in: categories} }, 
            { tags: { $in: tags } }
        ],
          _id: { $ne: post._id },
        });
    
        if (relatedPosts.length === 0) {
          return null;
        }
    
        const shuffledPosts = ShuffleUtils.shuffleArray(relatedPosts);
        return shuffledPosts.slice(0, Consts.RELATED_ARTICLES_COUNT);
      }

    async getCategoryCounts(): Promise<CategoryCount[]> {
        const categoryCounts = await this.postsRepository.aggregate([
            {
                $group: {
                    _id: "$categories",
                    count: { $sum: 1 }
                }
            },
            {
                $unwind: "$_id"
            },
            {
                $group: {
                    _id: "$_id",
                    count: { $sum: "$count" }
                }
            },
            {
                $sort: {
                    count: -1 // order by count desc
                }
            }
        ]);

        return categoryCounts.map(({ _id, count }) => ({
            category: _id,
            count
        }));
    }

    async getTagCounts(): Promise<TagCount[]> {
        const tagCounts = await this.postsRepository.aggregate([
            {
                $group: {
                    _id: "$tags",
                    count: { $sum: 1 }
                }
            },
            {
                $unwind: "$_id"
            },
            {
                $group: {
                    _id: "$_id",
                    count: { $sum: "$count" }
                }
            },
            {
                $sort: {
                    count: -1 // order by count desc
                }
            }
        ]);

        return tagCounts.map(({ _id, count }) => ({
            tag: _id,
            count
        }));
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

    getPostImageFile(name: string, file: string, res: Response) {
        const imageFilePath = join(process.cwd(), this.distPostsPath, name, file);
        return res.sendFile(imageFilePath);
    }

    private async createPostsInput(): Promise<CreatePostInput[]> {
        const names = await this.getPostsNames();

        let posts: CreatePostInput[] = [];
        for (const name of names) {
            posts.push(await this.createPostInput(name));
        }

        posts = SortUtils.sortByDate(posts, 'date', 'asc');  // order by old post

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
            lead: ''
        };

        if (createPostData.thumbnail) {
            createPostData.thumbnail = join('/api/posts/img', createPostData.name, createPostData.thumbnail);
        }
        createPostData.article = MarkdownHelper.addMdPrefixToImageSource(createPostData.article, '/api/posts/img/' + createPostData.name + '/');
        createPostData.lead = HtmlUtils.extractLead(createPostData.article, Consts.ARTICLE_LEAD_MAX_LENGTH);

        return createPostData;
    }

    private toModel(postDocument: PostDocument): Post {
        return {
            _id: postDocument._id.toHexString(),
            ...postDocument
        } as unknown as Post;
    }
}
