const graphql = require('graphql')
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql
const mongoose = require('mongoose')
const Post = mongoose.model('post')
const Comment = mongoose.model('comment')
const UserType = require('./user_type')
const PostType = require('./post_type')
const CommentType = require('./comment_type')

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
        type: UserType,
        resolve(parentValue, args, req) {
            return req.user
        }
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue, args, req) {
        return Post.find({})
      }
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return Post.findById(id)
      }
    },
    comment: {
      type: CommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return Comment.findById(id)
      }
    }
  }
})

module.exports = RootQueryType