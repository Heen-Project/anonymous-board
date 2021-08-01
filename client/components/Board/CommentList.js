import React, { Component } from 'react'
import { gql } from '@apollo/client'
import { graphql } from '@apollo/react-hoc'

class CommentList extends Component {
    onLike(id, likes) {
        this.props.mutate({
            variables: { id },
            optimisticResponse: {
                __typename: 'Mutation',
                likeComment: {
                    id,
                    __typename: 'CommentType',
                    likes: likes+1
                }
            }
        })
    }
    render(){
        return (
            <div className="list-body">
                { this.props.comments.map(({ id, content, likes }) => (
                    <div key={ id } className="list-item">
                        { content }
                        <div className="vote-box">
                            <span>{ likes }</span>&nbsp;
                            <i className="material-icons" onClick={() => this.onLike(id, likes)}>thumb_up</i>
                        </div>
                    </div>
                )) }
            </div>
        )
    }
}

const mutation = gql`mutation LikeComment($id: ID){
    likeComment(id: $id){
        id
        likes
    }
}`

export default graphql(mutation)(CommentList)