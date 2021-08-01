import React from 'react'
import { graphql } from '@apollo/react-hoc'
import { Link }  from 'react-router-dom'
import { gql } from '@apollo/client'
import query from '../queries/fetchPosts'
 
class Dashboard extends React.Component {
    onPostDelete(id){
        this.props.mutate({ variables: { id } }).then(() => this.props.data.refetch())
    }
    renderPosts(){
        return this.props.data.posts.map(({ id, title}) => (
            <div key={id} className="list-item">
                <Link to={`/dashboard/post/${id}`} className="list-item__title list__no-link">{title}</Link>
                <i className="material-icons" onClick={() => this.onPostDelete(id)}>delete</i>
            </div>
        ))
    }
    render(){
        if (this.props.data.loading) return (<div>Loading...</div>)
        return (
            <div>
                <h2>Post List</h2>
                <div className="list-body">
                    {this.renderPosts()}
                </div>
                <Link to="/dashboard/post/add" className="button button--round button--right"><i className="material-icons">add</i></Link>
            </div>
        )
    }
}

const mutation = gql`mutation deletePost ($id: ID){
    deletePost(id: $id){
        id
    }
}`

export default graphql(mutation)(
    graphql(query)(Dashboard)
)