import React, { Component } from 'react'
import { graphql } from '@apollo/react-hoc'
import query from '../../queries/fetchPost'
import { Link } from 'react-router-dom'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

class PostDetail extends Component {
    render(){
        const { post } = this.props.data
        if (!post) { return (<div></div>) }
        return (
            <div>
                <Link to="/dashboard" className="button--link button--link__no_decor">
                    <i className="material-icons">navigate_before</i> dashboard 
                </Link>
                <div className="auth-header">
                    <h2 className="auth-header__title">{ post.title }</h2>
                </div>
                <CommentList comments={post.comments}/>
                <CommentCreate postId={this.props.match.params.id} />
            </div>
        )   
    }
}

export default graphql(query, {
    options: (props) => ({ variables: { id: props.match.params.id } })
})(PostDetail)