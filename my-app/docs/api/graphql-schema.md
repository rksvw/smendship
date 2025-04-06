# GraphQL Schema Overview

## Types

```graphql
type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post]
}


query GetAllUsers {
    users {
        id
        name
    }
}