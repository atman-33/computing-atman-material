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

export type Query = {
  __typename?: 'Query';
  bookmark: Bookmark;
  bookmarks: Array<Bookmark>;
  currentUser: User;
  links: Array<Link>;
  post: Post;
  posts: Array<Post>;
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


export type QueryUserArgs = {
  _id: Scalars['String']['input'];
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

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = { __typename?: 'Query', posts: Array<{ __typename?: 'Post', _id: string, name: string, title: string, date: any, thumbnail?: string | null, categories?: Array<string> | null, tags?: Array<string> | null, article: string, lead: string }> };

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
export const PostsDocument = gql`
    query posts {
  posts {
    _id
    name
    title
    date
    thumbnail
    categories
    tags
    article
    lead
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class PostsGQL extends Apollo.Query<PostsQuery, PostsQueryVariables> {
    document = PostsDocument;
    
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