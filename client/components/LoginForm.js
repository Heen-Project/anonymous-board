import React from 'react'
import AuthForm from './AuthForm'
import { graphql } from '@apollo/react-hoc'
import mutation from '../mutations/Login'
import query from '../queries/CurrentUser'

class LoginForm extends React.Component {
    constructor(props){
        super(props)
        this.state = { errors: [] }
    }

    componentWillUpdate(nextProps){
        if (!this.props.data.user && nextProps.data.user){
            this.props.history.push('/dashboard')
        }
    }

    onSubmit({ email, password }){
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message)
            this.setState({ errors })
        })
    }
    
    render() {
        return (
            <div>
                <div className="auth-header">
                    <h2 className="auth-header__title">Login</h2>
                </div>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
            </div>
        )
    }
}

export default graphql(query)(graphql(mutation)(LoginForm)) 