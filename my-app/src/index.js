import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Link } from 'react-router-dom'
// 使用redux-thunk来处理异步情况
import { counter } from './index.redux'

const store = createStore(
  counter,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
  )
)

function Login() {
  return <h2>我是entry</h2>
}

function Register() {
  return <h2>我是register</h2>
}

ReactDom.render(
  // 利用provider传入store，无须手动指定很多props
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
        <Route path="/" exact component={App} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
