const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql
const mongoose = require('mongoose')
const Post = mongoose.model('post')
const Comment = mongoose.model('comment')
const UserType = require('./types/user_type')
const PostType = require('./types/post_type')
const CommentType = require('./types/comment_type')
const AuthService = require('../services/auth')

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req) {
                return AuthService.signup({ email, password, req })
            }
        },
        logout: {
            type: UserType,
            resolve(parentValue, args, req) {
                const { user } = req
                req.logout()
                return user
            }
        },
        login: {
            type: UserType,
            args: {
                email: { type: GraphQLString },
                password: { type: GraphQLString }
            },
            resolve(parentValue, { email, password }, req) {
                return AuthService.login({ email, password, req })
            }
        },
        addPost: {
          type: PostType,
          args: {
            title: { type: GraphQLString }
          },
          resolve(parentValue, { title }) {
            return (new Post({ title })).save()
          }
        },
        addCommentToPost: {
          type: PostType,
          args: {
            content: { type: GraphQLString },
            postId: { type: GraphQLID }
          },
          resolve(parentValue, { content, postId }) {
            return Post.addComment(postId, content)
          }
        },
        likeComment: {
          type: CommentType,
          args: { id: { type: GraphQLID } },
          resolve(parentValue, { id }) {
            return Comment.like(id)
          }
        },
        deletePost: {
          type: PostType,
          args: { id: { type: GraphQLID } },
          resolve(parentValue, { id }) {
            return Post.remove({ _id: id })
          }
        }
    }
})
  
module.exports = mutation