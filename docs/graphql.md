## open graphql play ground
after `nx serve server`  
```
http://localhost:3000/graphql
```

## create user command
```
mutation{
  createUser(createUserData: {email: "test.me@gmail.com", password: "example"}){
    _id
    email
  }
}
```

## get user command
```
query {
  user(_id: "648d99869cd41830dba35653"){
    _id
    email
  }
}
```