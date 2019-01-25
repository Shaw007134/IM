import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import reducers from './reducer'
import './config'
// import 'antd-mobile/dist/antd-mobile.css'
import Login from './container/login/login'
import Register from './container/register/register'

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
  )
)

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
