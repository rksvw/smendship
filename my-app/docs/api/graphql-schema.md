# 📘 GraphQL API Documentation for Facebook-like Web App

## 🔐 Authentication
All GraphQL requests should include an `Authorization` header:
```http
Authorization: Bearer <your_jwt_token>
```

---

## 📚 Schema Overview

### 🧾 Types
```graphql
type User {
  id: ID!
  name: String!
  email: String!
}

type AuthPayload {
  token: String!
  user: User!
}
```

### 📤 Mutations

#### 🚀 signUp
Registers a new user.
```graphql
mutation SignUp($name: String!, $email: String!, $password: String!) {
  signUp(name: $name, email: $email, password: $password) {
    token
    user {
      id
      name
      email
    }
  }
}
```

#### 🔐 login
Logs in a user.
```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      name
      email
    }
  }
}
```

---

### 📥 Queries

#### 👋 hello
Returns a friendly test message.
```graphql
query {
  hello
}
```
**Returns:**
```json
{
  "data": {
    "hello": "Hello World! 🌍"
  }
}
```

---

## 📦 Example Headers (for Postman)
```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer <your_jwt_token>"
}
```

---

## ✅ Environment (.env) Sample
```
PORT=4000
DATABASE_URL=postgresql://<user>:<pass>@localhost:5432/<yourdb>
JWT_SECRET=yourSecretKey
```

---

> Add more queries and mutations in the future (posts, comments, likes...) to grow your API.
