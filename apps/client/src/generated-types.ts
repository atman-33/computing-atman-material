import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Bookmark = {
  __typename?: 'Bookmark';
  _id: Scalars['String']['output'];
  links: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type CategoryCount = {
  __typename?: 'CategoryCount';
  category: Scalars['String']['output'];
  count: Scalars['Int']['output'];
};

export type CreateBookmarkInput = {
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Link = {
  __typename?: 'Link';
  images?: Maybe<Array<Scalars['String']['output']>>;
  siteName?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBookmark: Bookmark;
  createUser: User;
  initializePostData: Array<Post>;
  updateBookmark: Bookmark;
};


export type MutationCreateBookmarkArgs = {
  createBookmarkData: CreateBookmarkInput;
};


export type MutationCreateUserArgs = {
  createUserData: CreateUserInput;
};


export type MutationUpdateBookmarkArgs = {
  updateBookmarkData: UpdateBookmarkInput;
};

export type Post = {
  __typename?: 'Post';
  _id: Scalars['String']['output'];
  article: Scalars['String']['output'];
  categories?: Maybe<Array<Scalars['String']['output']>>;
  date: Scalars['DateTime']['output'];
  lead: Scalars['String']['output'];
  name: Scalars['String']['output'];
  tags?: Maybe<Array<Scalars['String']['output']>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type PostEdge = {
  __typename?: 'PostEdge';
  cursor: Scalars['String']['output'];
  node: Post;
};

export type PostPageInfo = {
  __typename?: 'PostPageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PostsConnection = {
  __typename?: 'PostsConnection';
  edges: Array<PostEdge>;
  nodes: Array<Post>;
  pageInfo: PostPageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  bookmark: Bookmark;
  bookmarks: Array<Bookmark>;
  categoryCounts: Array<CategoryCount>;
  currentUser: User;
  links: Array<Link>;
  post: Post;
  postByName: Post;
  posts: Array<Post>;
  postsConnection: PostsConnection;
  postsConnectionByCategory: PostsConnection;
  postsConnectionByQueryCategoryTag: PostsConnection;
  postsConnectionByTag: PostsConnection;
  randomPostsWithSameCategoryOrTag: Array<Post>;
  tagCounts: Array<TagCount>;
  user: User;
};


export type QueryBookmarkArgs = {
  _id: Scalars['String']['input'];
};


export type QueryLinksArgs = {
  urls: Array<Scalars['String']['input']>;
};


export type QueryPostArgs = {
  _id: Scalars['String']['input'];
};


export type QueryPostByNameArgs = {
  name: Scalars['String']['input'];
};


export type QueryPostsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostsConnectionByCategoryArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  category: Scalars['String']['input'];
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryPostsConnectionByQueryCategoryTagArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostsConnectionByTagArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  tag: Scalars['String']['input'];
};


export type QueryRandomPostsWithSameCategoryOrTagArgs = {
  _id: Scalars['String']['input'];
};


export type QueryUserArgs = {
  _id: Scalars['String']['input'];
};

export type TagCount = {
  __typename?: 'TagCount';
  count: Scalars['Int']['output'];
  tag: Scalars['String']['output'];
};

export type UpdateBookmarkInput = {
  _id: Scalars['String']['input'];
  links: Array<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['String']['output'];
  email: Scalars['String']['output'];
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', email: string } };

export type CreateUserMutationVariables = Exact<{
  createUserData: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, email: string } };

export type PostByNameQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type PostByNameQuery = { __typename?: 'Query', postByName: { __typename?: 'Post', _id: string, name: string, title: string, date: any, thumbnail?: string | null, categories?: Array<string> | null, tags?: Array<string> | null, article: string } };

export type RandomPostsWithSameCategoryOrTagQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type RandomPostsWithSameCategoryOrTagQuery = { __typename?: 'Query', randomPostsWithSameCategoryOrTag: Array<{ __typename?: 'Post', _id: string, name: string, title: string, date: any, thumbnail?: string | null, tags?: Array<string> | null, lead: string }> };

export type PostsConnectionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
}>;


export type PostsConnectionQuery = { __typename?: 'Query', postsConnection: { __typename?: 'PostsConnection', totalCount: number, pageInfo: { __typename?: 'PostPageInfo', startCursor?: string | null, endCursor?: string | null }, nodes: Array<{ __typename?: 'Post', _id: string, name: string, title: string, date: any, thumbnail?: string | null, categories?: Array<string> | null, tags?: Array<string> | null, lead: string }> } };

export type PostsConnectionByQueryCategoryTagQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  tag?: InputMaybe<Scalars['String']['input']>;
}>;


export type PostsConnectionByQueryCategoryTagQuery = { __typename?: 'Query', postsConnectionByQueryCategoryTag: { __typename?: 'PostsConnection', totalCount: number, pageInfo: { __typename?: 'PostPageInfo', startCursor?: string | null, endCursor?: string | null }, nodes: Array<{ __typename?: 'Post', _id: string, name: string, title: string, date: any, thumbnail?: string | null, categories?: Array<string> | null, tags?: Array<string> | null, lead: string }> } };

export type CategoryCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoryCountsQuery = { __typename?: 'Query', categoryCounts: Array<{ __typename?: 'CategoryCount', category: string, count: number }> };

export type TagCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagCountsQuery = { __typename?: 'Query', tagCounts: Array<{ __typename?: 'TagCount', tag: string, count: number }> };

export type LinksQueryVariables = Exact<{
  urls: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type LinksQuery = { __typename?: 'Query', links: Array<{ __typename?: 'Link', siteName?: string | null, title: string, images?: Array<string> | null, url: string }> };

export type UpdateBookmarkMutationVariables = Exact<{
  updateBookmarkData: UpdateBookmarkInput;
}>;


export type UpdateBookmarkMutation = { __typename?: 'Mutation', updateBookmark: { __typename?: 'Bookmark', _id: string, name: string, userId: string, links: Array<string> } };

export type BookmarkQueryVariables = Exact<{
  _id: Scalars['String']['input'];
}>;


export type BookmarkQuery = { __typename?: 'Query', bookmark: { __typename?: 'Bookmark', _id: string, name: string, userId: string, links: Array<string> } };

export type BookmarksQueryVariables = Exact<{ [key: string]: never; }>;


export type BookmarksQuery = { __typename?: 'Query', bookmarks: Array<{ __typename?: 'Bookmark', _id: string, name: string, userId: string, links: Array<string> }> };

export type CreateBookmarkMutationVariables = Exact<{
  createBookmarkData: CreateBookmarkInput;
}>;


export type CreateBookmarkMutation = { __typename?: 'Mutation', createBookmark: { __typename?: 'Bookmark', _id: string, name: string, userId: string } };

export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CurrentUserGQL extends Apollo.Query<CurrentUserQuery, CurrentUserQueryVariables> {
    document = CurrentUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateUserDocument = gql`
    mutation createUser($createUserData: CreateUserInput!) {
  createUser(createUserData: $createUserData) {
    _id
    email
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
    document = CreateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PostByNameDocument = gql`
    query postByName($name: String!) {
  postByName(name: $name) {
    _id
    name
    title
    date
    date
    thumbnail
    categories
    tags
    article
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PostByNameGQL extends Apollo.Query<PostByNameQuery, PostByNameQueryVariables> {
    document = PostByNameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RandomPostsWithSameCategoryOrTagDocument = gql`
    query randomPostsWithSameCategoryOrTag($_id: String!) {
  randomPostsWithSameCategoryOrTag(_id: $_id) {
    _id
    name
    title
    date
    thumbnail
    tags
    lead
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RandomPostsWithSameCategoryOrTagGQL extends Apollo.Query<RandomPostsWithSameCategoryOrTagQuery, RandomPostsWithSameCategoryOrTagQueryVariables> {
    document = RandomPostsWithSameCategoryOrTagDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PostsConnectionDocument = gql`
    query postsConnection($first: Int, $after: String, $last: Int, $before: String, $query: String) {
  postsConnection(
    first: $first
    after: $after
    last: $last
    before: $before
    query: $query
  ) {
    totalCount
    pageInfo {
      startCursor
      endCursor
    }
    nodes {
      _id
      name
      title
      date
      thumbnail
      categories
      tags
      lead
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PostsConnectionGQL extends Apollo.Query<PostsConnectionQuery, PostsConnectionQueryVariables> {
    document = PostsConnectionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const PostsConnectionByQueryCategoryTagDocument = gql`
    query postsConnectionByQueryCategoryTag($first: Int, $after: String, $last: Int, $before: String, $query: String, $category: String, $tag: String) {
  postsConnectionByQueryCategoryTag(
    first: $first
    after: $after
    last: $last
    before: $before
    query: $query
    category: $category
    tag: $tag
  ) {
    totalCount
    pageInfo {
      startCursor
      endCursor
    }
    nodes {
      _id
      name
      title
      date
      thumbnail
      categories
      tags
      lead
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PostsConnectionByQueryCategoryTagGQL extends Apollo.Query<PostsConnectionByQueryCategoryTagQuery, PostsConnectionByQueryCategoryTagQueryVariables> {
    document = PostsConnectionByQueryCategoryTagDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CategoryCountsDocument = gql`
    query categoryCounts {
  categoryCounts {
    category
    count
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CategoryCountsGQL extends Apollo.Query<CategoryCountsQuery, CategoryCountsQueryVariables> {
    document = CategoryCountsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const TagCountsDocument = gql`
    query tagCounts {
  tagCounts {
    tag
    count
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class TagCountsGQL extends Apollo.Query<TagCountsQuery, TagCountsQueryVariables> {
    document = TagCountsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LinksDocument = gql`
    query links($urls: [String!]!) {
  links(urls: $urls) {
    siteName
    title
    images
    url
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LinksGQL extends Apollo.Query<LinksQuery, LinksQueryVariables> {
    document = LinksDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateBookmarkDocument = gql`
    mutation updateBookmark($updateBookmarkData: UpdateBookmarkInput!) {
  updateBookmark(updateBookmarkData: $updateBookmarkData) {
    _id
    name
    userId
    links
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateBookmarkGQL extends Apollo.Mutation<UpdateBookmarkMutation, UpdateBookmarkMutationVariables> {
    document = UpdateBookmarkDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const BookmarkDocument = gql`
    query bookmark($_id: String!) {
  bookmark(_id: $_id) {
    _id
    name
    userId
    links
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BookmarkGQL extends Apollo.Query<BookmarkQuery, BookmarkQueryVariables> {
    document = BookmarkDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const BookmarksDocument = gql`
    query bookmarks {
  bookmarks {
    _id
    name
    userId
    links
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class BookmarksGQL extends Apollo.Query<BookmarksQuery, BookmarksQueryVariables> {
    document = BookmarksDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateBookmarkDocument = gql`
    mutation createBookmark($createBookmarkData: CreateBookmarkInput!) {
  createBookmark(createBookmarkData: $createBookmarkData) {
    _id
    name
    userId
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateBookmarkGQL extends Apollo.Mutation<CreateBookmarkMutation, CreateBookmarkMutationVariables> {
    document = CreateBookmarkDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }