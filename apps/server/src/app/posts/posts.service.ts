import { SortUtils } from '@libs/shared/domain';
import { Injectable } from '@nestjs/common';
import { readFile, readdir } from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { Post } from './models/post.model';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {

    private readonly distPostsPath = 'dist/apps/server/assets/posts';

    constructor(private readonly postsRepository: PostsRepository) { }

    initializeData(): Promise<Post[]> {
        throw new Error('Method not implemented.');

        // TODO:mongodbのデータを削除（後で実装）        

        // const bookmarkDocument = await this.bookmarksRepository.create({
        //     ...createBookmarkData,
        //     links: [],
        //     userId,
        // });

        // return this.toModel(bookmarkDocument);


    }

    /**
     * Get all post names. Post name is (assets/posts/)folder name.
     * @returns 
     */
    async findPostNames(): Promise<string[]> {
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

    private async findAllPosts(): Promise<Post[]> {
        const names = await this.findPostNames();

        let allPosts: Post[] = [];
        for (const name of names) {
            allPosts.push(await this.findPostByName(name));
        }

        allPosts = SortUtils.sortByDate(allPosts, 'date', 'desc');  // order by new post

        return allPosts;
    }
    async findPostByName(name: string): Promise<Post> {
        const filePath = join(process.cwd(), this.distPostsPath, name, 'index.md');
        try {
            const content = promisify(readFile)(filePath, { encoding: 'utf-8' });
            return this.parsePostContent(name, await content);
        } catch (error) {
            console.error(`Failed to read file: ${filePath}`);
            console.error(error);
        }
    }

  private parsePostContent(name: string, content: string): Post {
    // console.log(`id: ${id}`);

    let post: Post = {
      name: name,
      title: markdownHelper.getMetadataValue(content, 'title:'),
      date: markdownHelper.getMetadataValue(content, 'date:'),
      thumbnail: markdownHelper.getMetadataValue(content, 'thumbnail:'),
      tags: markdownHelper.getMetadataArray(content, 'tags:'),
      categories: markdownHelper.getMetadataArray(content, 'categories:'),
      article: markdownHelper.getMdContent(content),
    };

    post = this.addPrefixTothumbnail(post);
    post = this.addPrefixToImageSource(post);

    return post;
  }
}
