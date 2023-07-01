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
  images: Array<Scalars['String']['output']>;
  siteName: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBookmark: Bookmark;
  createUser: User;
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

export type Query = {
  __typename?: 'Query';
  bookmark: Bookmark;
  bookmarks: Array<Bookmark>;
  currentUser: User;
  links: Array<Link>;
  user: User;
};


export type QueryBookmarkArgs = {
  _id: Scalars['String']['input'];
};


export type QueryLinksArgs = {
  urls: Array<Scalars['String']['input']>;
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

export type CreateUserMutationVariables = Exact<{
  createUserData: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: string, email: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', email: string } };

export type LinksQueryVariables = Exact<{
  urls: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type LinksQuery = { __typename?: 'Query', links: Array<{ __typename?: 'Link', siteName: string, title: string, images: Array<string>, url: string }> };

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