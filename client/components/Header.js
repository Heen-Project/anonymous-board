import React from 'react'
import { Link } from 'react-router-dom'
import { graphql } from '@apollo/react-hoc'
import query from '../queries/CurrentUser'
import mutation from '../mutations/Logout'

class Header extends React.Component {
    onLogoutClick(){
        this.props.mutate({
            refetchQueries: [{ query }]
        })
    }
    renderButtons() {
        const { loading, user } = this.props.data
        if (loading) { return <div /> }
        if (user) {
            return (<button onClick={this.onLogoutClick.bind(this)} className="button button--link">Logout</button>)
        } else {
            return (
                <div>
                    <Link to="/login" className="button button--link">Login</Link>
                    <Link to="/signup" className="button button--link">Signup</Link>
                </div>
            )
        }

    }
    render() {
        return (
            <nav className="header">
                <div className="header__content container">
                    <Link to="/" className="header__title"><h1>Global Board</h1></Link>
                    <div className="header__actions">{ this.renderButtons() }</div>
                </div>
            </nav>
        )
    }
}

export default graphql(mutation)(graphql(query)(Header))