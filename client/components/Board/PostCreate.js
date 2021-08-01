import React, { Component } from 'react'
import { gql } from '@apollo/client'
import { graphql } from '@apollo/react-hoc'
import { Link }  from 'react-router-dom'
import query from '../../queries/fetchPosts'

class PostCreate extends Component {
    constructor(props){
        super(props)
        this.state = { title: '' }
    }
    onSubmit(e){
        e.preventDefault()
        this.props.mutate({
            variables: { title: this.state.title },
            refetchQueries: [{ query }]
        }).then(() => this.props.history.push('/dashboard'))
    }
    render(){
        return (
            <div>
                <Link to="/dashboard" className="button--link button--link__no_decor">
                    <i className="material-icons">navigate_before</i> dashboard 
                </Link>
                <h2>Add a new post</h2>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="input-group">
                        <label className="add-option">Post Title</label>
                        <input onChange={(e) => this.setState({ title: e.target.value })}
                            value={this.state.title}
                            className="add-option__input_v2" />
                    </div>
                    <button type="submit" className="button button--right">submit</button>
                </form>
            </div>
        )
    }
}

const mutation = gql`mutation AddPost ($title: String){
    addPost(title: $title){
        id
        title
    }
}`

export default graphql(mutation)(PostCreate)