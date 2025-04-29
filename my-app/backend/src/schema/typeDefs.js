// File: backend/src/schema/typeDefs.js
import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Post {
    id: ID!
    title: String!
    content: String!
    category: String!
    authorId: String!
    createdAt: String!
  }

  type FriendRequest {
    id: ID!
    senderId: User!
    receiverId: User!
    isAccepted: Boolean
  }

  type Notification {
    id: ID!
    toUser: User!
  }

  type RequestAccepted {
    isAccepted: Boolean
  }

  type Comment {
    id: ID!
    comment: String!
    authorId: String!
    postId: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    createdAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type PostPayload {
    post: Post!
  }

  type Message {
    message: String
  }

  type FriendRequestPayload {
    token: String!
    request: FriendRequest
    notification: Notification
  }

  type CommentPayload {
    token: String!
    mycomment: Comment!
  }

  type CommentsPayload {
    token: String!
    mycomment: [Comment!]!
  }

  type LikeResponse {
    liked: Boolean!
  }

  type Query {
    hello: String!
    getpost(id: String!): PostPayload
    getcomments(postId: String!): CommentsPayload
  }

  type Mutation {
    signup(name: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    updateprofile(name: String, email: String): AuthPayload
    deleteuser(id: String!): Message
    createpost(title: String!, content: String!, category: String!): PostPayload
    likepost(postId: ID!): LikeResponse!
    updatepost(
      id: String!
      title: String
      content: String
      category: String
    ): PostPayload
    deletepost(id: String!): Message
    createcomment(comment: String!, postId: String!): CommentPayload
    updatecomment(id: String!, comment: String!): CommentPayload
    deletecomment(id: String!): Message
    likecomment(postId: ID!, commentId: ID!): LikeResponse
    friendSendRequest(receiverId: String!): FriendRequestPayload
    friendAcceptRequest(requestId: String!): FriendRequestPayload

    friendRequestSent(senderId: String!, receiverId: String!): FriendRequestPayload
    acceptFriendRequest(requestId: String!): FriendRequestPayload
  }

  type Subscription {
  friendSentRequest(receiverId: String!): FriendRequestPayload
  friendAcceptedRequest(fromUserId: String!): FriendRequestPayload
  }
`;

export default typeDefs;
