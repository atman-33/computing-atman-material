## open graphql play ground
after `nx serve server`  
```
http://localhost:3000/graphql
```

## create user
```
mutation{
  createUser(createUserData: {email: "test.me@gmail.com", password: "example"}){
    _id
    email
  }
}
```

## get user
```
query {
  user(_id: "648d99869cd41830dba35653"){
    _id
    email
  }
}
```

## get postsConnectionByQueryCategoryTag
```
query ($first: Int, $after: String, $last: Int, $before: String, $query: String, $category: String, $tag: String){
  postsConnectionByQueryCategoryTag(first: $first, after: $after, last: $last, before: $before, query: $query, category: $category, tag: $tag){
    totalCount
    pageInfo{
      startCursor
      endCursor
    }
    nodes{
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
```

query variables  
```
{"first": 5, "after": null, "last": null, "before": null,"query": "","category": "VBS", "tag": null}
```