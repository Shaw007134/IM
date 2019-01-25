import React from 'react'
import ReactDom from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
// 使用redux-thunk来处理异步情况
import Auth from './Auth'
import Dashboard from './Dashboard'
import reducers from './reducer'
import './config'
import 'antd-mobile/dist/antd-mobile.css'

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
  )
)
// class Test extends React.Component {
//   render() {
//     console.log(this.props)
//     return <h2>测试组件 {this.props.match.params.location}</h2>
//   }
// }

ReactDom.render(
  // 利用provider传入store，无须手动指定很多props
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {/* 只渲染第一个命中的 */}
        {/* <Route path="/" exact component={App} /> */}
        <Route path="/login" component={Auth} />
        <Route path="/dashboard" component={Dashboard} />
        {/* <Route path="/:location" component={Test} /> */}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// < Redirect to = "/" />

// < Route path = "/login" component = { Login } />
//   <Route path="/register" component={Register} />
