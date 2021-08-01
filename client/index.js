import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import App from './components/App'
import Header from './components/Header'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Dashboard from './components/Dashboard'
import requireAuth from './components/requireAuth'
import PostCreate from './components/Board/PostCreate'
import PostDetail from './components/Board/PostDetail'
import 'normalize.css/normalize.css'
import './styles/style.scss'


const client = new ApolloClient({
  link: createHttpLink({ uri: '/graphql', credentials: 'same-origin' }),
  cache: new InMemoryCache({ 
    typePolicies: {
      UserType: {
        keyFields: ['id'],
      }
    }
  })
})

export const history = createBrowserHistory()

const Root = () => (
  <ApolloProvider client={client}>
    <Router history={history}>
      <Header />
      <div className="container">
        <Route path="/" component={requireAuth(App)} exact />
        <Route path="/login" component={LoginForm} />
        <Route path="/signup" component={SignupForm} />
        <Route path="/dashboard" component={requireAuth(Dashboard)} exact />
        <Route path="/dashboard/post/add" component={requireAuth(PostCreate)} />
        <Route path="/dashboard/post/:id" component={requireAuth(PostDetail)} />
      </div>
    </Router>
  </ApolloProvider>
)

ReactDOM.render(<Root />, document.querySelector('#root'))