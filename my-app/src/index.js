import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
// 使用redux-thunk来处理异步情况
import { counter } from './index.redux'

const store = createStore(
  counter,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
  )
)


  ReactDom.render(
    // 利用provider传入store，无须手动指定很多props
    (<Provider store={store}>
      <App  />
    </Provider>),
    document.getElementById('root')
  )
