// 合并所有reducer并返回
import { counter } from './index.redux'
import { combineReducers } from 'redux'
import { auth } from './Auth.redux'

export default combineReducers({ counter, auth })
