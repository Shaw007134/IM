import React from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import App from './App'
import { logout } from './Auth.redux'

function Login() {
  return <h2>我是entry</h2>
}

function Register() {
  return <h2>我是register</h2>
}

@connect(
  state => state.auth,
  { logout }
)
class Dashboard extends React.Component {

  render() {
    const match = this.props.match
    const redirectToLogin = <Redirect to="/login" />
    const app = (
      <div>
        <h1>Check</h1>
        {this.props.isAuth ? (
          <button onClick={this.props.logout}>注销</button>
        ) : null}
        <ul>
          <li>
            <Link to={`${match.url}/`}>首页</Link>
          </li>
          <li>
            <Link to={`${match.url}/login`}>Login</Link>
          </li>
          <li>
            <Link to={`${match.url}/register`}>Register</Link>
          </li>
        </ul>
        <Route path={`${match.url}/`} exact component={App} />
        <Route path={`${match.url}/login`} component={Login} />
        <Route path={`${match.url}/register`} component={Register} />
      </div>
    )
    return this.props.isAuth ? app : redirectToLogin
  }
}

export default Dashboard
