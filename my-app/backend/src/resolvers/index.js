// File: backend/src/resolvers/index.js
import bcrypt, { compareSync } from "bcrypt";
import jwt from "jsonwebtoken";
import {
  AuthenticationError,
  UserInputError,
  ValidationError,
} from "apollo-server-express";
import prisma from "../config/prismaConfig.js";
import {
  FRIEND_REQUEST_ACCEPTED,
  FRIEND_REQUEST_SENT,
  pubsub,
} from "../config/pubsub.js";

const resolvers = {
  Query: {
    hello: () => "Hello World! 🌍",
    getpost: async (_, { id }, context) => {
      const userId = getUserIdFromToken(context);
      if (!userId) throw new AuthenticationError("Unauthorized");

      const post = await prisma.post.findUnique({
        where: {
          id,
        },
      });

      return {
        post,
      };
    },
    getcomments: async (_, { postId }, context) => {
      const token = getToken(context);
      if (!token) throw new AuthenticationError("Priveledged violation!");

      const mycomment = await prisma.comment.findMany({
        where: {
          postId,
        },
      });
      return {
        token,
        mycomment,
      };
    },
  },
  Mutation: {
    // Mutation is like a router for GraphQL
    signup: async (_, { name, email, password }) => {
      if (
        !name ||
        !email ||
        !password ||
        name === "" ||
        email === "" ||
        password === ""
      ) {
        throw new UserInputError(
          "Invalid User Credentials! Please fill required Fields"
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword },
      });

      const token = jwt.sign(
        { userId: newUser.id, role: newUser.role },
        process.env.JWT_SECRET
      );

      return {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
        },
      };
    },
    login: async (_, { email, password }) => {
      if (!email || !password || email === "" || password === "") {
        throw new UserInputError(
          "Invalid User Credentials! Please fill required Fields"
        );
      }

      const reqUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!reqUser) throw new ValidationError("Invalid User");

      const valid = await bcrypt.compare(password, reqUser.password);
      if (!valid) throw new ValidationError("Invalid Password");

      const token = jwt.sign(
        { userId: reqUser.id, role: reqUser.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      if (!token) {
        throw new AuthenticationError("UnAuthentic Account");
      }
      return {
        token,
        user: {
          id: reqUser.id,
          name: reqUser.name,
          email: reqUser.email,
          createdAt: reqUser.createdAt,
        },
      };
    },
    createpost: async (_, { title, content, category }, context) => {
      const userId = getUserIdFromToken(context);
      if (!userId) throw new AuthenticationError("Unauthorized");

      const post = await prisma.post.create({
        data: {
          title,
          content,
          category,
          authorId: userId,
        },
        include: {
          author: true,
        },
      });
      return {
        post: {
          id: userId,
          title,
          content,
          category,
        },
      };
    },
    updatepost: async (_, { id, title, content, category }, context) => {
      const userId = getUserIdFromToken(context);
      if (!userId) throw new AuthenticationError("Unauthorized");

      const data = {};
      if (title) {
        data["title"] = title;
      }
      if (content) {
        data["content"] = content;
      }

      if (category) {
        data["category"] = category;
      }

      const post = await prisma.post.update({
        where: { id },
        data,
      });
      return {
        post,
      };
    },
    deletepost: async (_, { id }, context) => {
      const userId = getUserIdFromToken(context);
      if (!userId) throw new AuthenticationError("Unauthorized");

      const post = await prisma.post.delete({
        where: { id },
      });

      return {
        message: "Post deleted Successfully",
      };
    },
    likepost: async (_, { postId }, context) => {
      const userId = getUserIdFromToken(context);
      if (!userId) throw new AuthenticationError("Unauthorized");

      const token = getToken(context);
      if (!token) throw new AuthenticationError("Priviledged violation!");

      try {
        const existing = await prisma.postLike.findUnique({
          where: {
            userId_postId: { userId, postId },
          },
        });

        if (existing) {
          const dislike = await prisma.postLike.delete({
            where: {
              id: existing.id,
            },
          });

          const likeCount = await prisma.postLike.count({
            where: {
              postId,
            },
          });

          const setPostLikes = await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              likeCount,
            },
          });
          return { liked: false };
        } else {
          const like = await prisma.postLike.create({
            data: {
              userId,
              postId,
            },
          });

          const likeCount = await prisma.postLike.count({
            where: {
              postId,
            },
          });

          const setPostLikes = await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              likeCount,
            },
          });

          return { liked: true };
        }
      } catch (err) {
        throw new Error("Internal Server Error");
      }
    },
    updateprofile: async (_, { name, email }, context) => {
      const userId = getUserIdFromToken(context);
      if (!userId) throw new AuthenticationError("Unauthorized");

      const data = {};

      if (name) {
        data["name"] = name;
      }

      if (email) {
        data["email"] = email;
      }

      const user = await prisma.user.update({
        where: { id: userId },
        data,
      });

      const token = getToken(context);
      if (!token) throw new AuthenticationError("Priviledged violation");

      return {
        token,
        user,
      };
    },
    deleteuser: async (_, { id }, context) => {
      const userId = getUserIdFromToken(context);
      if (!userId) throw new AuthenticationError("Unauthorized");

      const isAdmin = checkIsAdmin(context);
      if (
        isAdmin === undefined ||
        isAdmin === null ||
        isAdmin === "" ||
        !isAdmin ||
        isAdmin.toLowerCase() === "user"
      )
        throw new AuthenticationError("Unauthorized");

      await prisma.user.delete({
        where: { id },
      });

      return {
        message: "User removed Successfully",
      };
    },
    createcomment: async (_, { comment, postId }, context) => {
      const authorId = getUserIdFromToken(context);
      if (!authorId) throw new AuthenticationError("Unauthorized");

      const token = getToken(context);
      if (!token) throw new AuthenticationError("Priviledged violation!");

      const mycomment = await prisma.comment.create({
        data: { comment, postId, authorId },
      });

      return {
        token,
        mycomment,
      };
    },
    updatecomment: async (_, { comment, id }, context) => {
      const authorId = getUserIdFromToken(context);
      if (!authorId) throw new AuthenticationError("Unauthorized");

      const token = getToken(context);
      if (!token) throw new AuthenticationError("Priveledged violation!");

      const mycomment = await prisma.comment.update({
        where: {
          id,
        },
        data: {
          comment,
        },
      });

      return {
        token,
        mycomment,
      };
    },
    deletecomment: async (_, { id }, context) => {
      const authorId = getUserIdFromToken(context);
      if (!authorId) throw new AuthenticationError("Unauthorized");

      const token = getToken(context);
      if (!token) throw new AuthenticationError("Priveledged violation!");

      await prisma.comment.delete({
        where: { id },
      });

      return {
        message: "Comment deleted Successfully!",
      };
    },
    likecomment: async (_, { postId, commentId }, context) => {
      const userId = getUserIdFromToken(context);
      if (!userId) throw new AuthenticationError("Unauthorized");

      try {
        const existing = await prisma.commentLike.findUnique({
          where: {
            userId_postId_commentId: { userId, postId, commentId },
          },
        });

        if (existing) {
          const dislike = await prisma.commentLike.delete({
            where: { id: existing.id },
          });

          const likeCount = await prisma.commentLike.count({
            where: {
              commentId,
            },
          });

          const setCommentLike = await prisma.comment.update({
            where: {
              id: commentId,
            },
            data: { likeCount },
          });

          return {
            liked: false,
          };
        } else {
          const like = await prisma.commentLike.create({
            data: {
              userId,
              postId,
              commentId,
            },
          });

          const likeCount = await prisma.commentLike.count({
            where: {
              commentId,
            },
          });

          const setCommentLike = await prisma.comment.update({
            where: {
              id: commentId,
            },
            data: { likeCount },
          });

          return {
            liked: true,
          };
        }
      } catch (error) {
        throw new Error("Internal Server Error!");
      }
    },
    friendSendRequest: async (_, { receiverId }, context) => {
      const senderId = getUserIdFromToken(context);
      if (!senderId) throw new AuthenticationError("Unauthorized");

      const req = await prisma.friendRequest.create({
        data: { senderId, receiverId },
      });

      console.log(req, "\n Request is saved successfully");

      const notification = await prisma.notification.create({
        data: {
          toUserId: receiverId,
          message: `User ${senderId} sent you a friend request`,
          type: "FRIEND_REQUEST_SENT",
        },
      });

      // real-time publish (online user) --> When user1 is send request user2 notify
      await pubsub.publish(FRIEND_REQUEST_SENT, {
        friendSentRequest: { req, notification },
      });
    },
    friendAcceptRequest: async (_, { requestId }, context) => {
      const reqAccept = await prisma.friendRequest.update({
        where: { id: requestId },
        data: { isAccepted: true, acceptedAt: new Date() },
      });

      const getUserInfo = await prisma.friendRequest.findUnique({
        where: { id: requestId },
      });

      const isFriend = await prisma.friendship.findFirst({
        where: {
          OR: [
            { user1Id: getUserInfo.senderId, user2Id: getUserInfo.receiverId },
            { user1Id: getUserInfo.receiverId, user2Id: getUserInfo.senderId },
          ],
        },
      });

      if (!isFriend) {
        const stabilizedFriendship = await prisma.friendship.create({
          data: {
            user1Id: getUserInfo.senderId,
            user2Id: getUserInfo.receiverId,
            notifyId: getUserInfo.notifyId,
          },
        });

        console.log(
          stabilizedFriendship,
          "\n Friendship is accepted successfully"
        );

        const notification = await prisma.notification.update({
          where: {
            id: stabilizedFriendship.notifyId,
          },
          data: {
            message: "Friendship stabilised successfully",
            seenAt: new Date(),
          },
        });

        console.log(notification, "\n Notification sent successfully");

        // Notify both users
        await pubsub.publish(FRIEND_REQUEST_ACCEPTED, {
          friendAcceptedRequest: {
            reqAccept,
            notification,
          },
        });
        console.log("All done successfully");
      } else {
        console.log("Friendship already exists!");
      }
    },
  },
  Subscription: {
    friendSentRequest: {
      subscribe: () => pubsub.asyncIterableIterator(FRIEND_REQUEST_SENT),
    },
    friendAcceptedRequest: {
      subscribe: () => pubsub.asyncIterableIterator(FRIEND_REQUEST_ACCEPTED),
    },
  },
};

function getToken(context) {
  const token = context.token;
  return token;
}

function getUserIdFromToken(context) {
  const token = context.token;
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    return verifiedToken.userId;
  } catch (err) {
    return null;
  }
}

function checkIsAdmin(context) {
  const token = context.token;
  try {
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(verifiedToken.role);
    return verifiedToken.role;
  } catch (err) {
    return null;
  }
}

export default resolvers;
