import { Injectable } from '@nestjs/common';
import { readdir } from 'fs';
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
    
        allPosts = Utils.sortByDate(allPosts, 'date', 'desc');  // order by new post
    
        return allPosts;
      }
    findPostByName(name: string): Post | PromiseLike<Post> {
        throw new Error('Method not implemented.');
    }
}
