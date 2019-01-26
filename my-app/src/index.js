import React from 'react'
import './config'
import './index.css'

import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import reducers from './reducer'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'
import BossInfo from './container/boss-info/boss-info'
import CandidateInfo from './container/candidate-info/candidate-info'
import DashBoard from './component/dashboard/dashboard'

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : () => {}
  )
)

ReactDom.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/boss/info" component={BossInfo} />
          <Route path="/candidate/info" component={CandidateInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={DashBoard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
