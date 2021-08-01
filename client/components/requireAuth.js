import React from 'react'
import { graphql } from '@apollo/react-hoc'
import query from '../queries/CurrentUser'

export default (WrappedComponent) => {
    class RequireAuth extends React.Component {
        componentWillUpdate(nextProps){
            const available_path = ['/', '/login', '/signup']
            const is_available = available_path.includes(nextProps.location.pathname)
            if (!nextProps.data.user && !nextProps.data.loading && !is_available){
                this.props.history.push('/login')
            }
            else if (nextProps.data.user && nextProps.location.pathname === '/'){
                this.props.history.push('/dashboard')
            }
        }

        render () {
            return <WrappedComponent {...this.props} />
        }
    }
    
    return graphql (query)(RequireAuth)
}