import React, { Component } from 'react'
import { gql } from '@apollo/client'
import { graphql } from '@apollo/react-hoc'

class CommentCreate extends Component {
    constructor(props){
        super(props)
        this.state = { content: '', is_disabled: false }
    }
    onSubmit(e){
        e.preventDefault()
        this.setState({ is_disabled: true })
        this.props.mutate({
            variables: {
                postId: this.props.postId,
                content: this.state.content
            }
        }).then(() => this.setState({ content: '', is_disabled: false}))
    }
    render(){
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="input-group">
                    <label className="add-option">Add a comment</label>
                    <input 
                        value={this.state.content}
                        onChange={ (e) => this.setState({ content: e.target.value }) }
                        disabled={this.state.is_disabled}
                        className="add-option__input_v2"
                    />
                </div>
            </form>
        )
    }
}

const mutation = gql`mutation ($content: String!, $postId: ID!){
    addCommentToPost(postId: $postId, content: $content){
        id
        comments{
            id
            content
            likes
        }
    }
}`

export default graphql(mutation)(CommentCreate)