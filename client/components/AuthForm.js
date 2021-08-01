import React from 'react'

class AuthForm extends React.Component {
    constructor(props){
        super(props)
        this.state = { email: '', password: '' }   
    }
    onSubmit(e){
        e.preventDefault()
        this.props.onSubmit(this.state)
    }
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)} className="add-option">
                    <input className="add-option__input"
                        placeholder="Email" 
                        value={this.state.email} 
                        onChange={ e => this.setState({ email: e.target.value }) } />
                    <input className="add-option__input"
                        placeholder="Password" 
                        type="password"
                        value={this.state.password} 
                        onChange={ e => this.setState({ password: e.target.value }) } />
                    <div className="add-option-error">
                        { this.props.errors.map(err => <span key={err}>{err}</span>) }
                    </div>
                    <button className="button">Submit</button>
                </form>
            </div>
        )
    }
}

export default AuthForm