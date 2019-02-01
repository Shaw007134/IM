import { combineReducers } from 'redux'
import { user } from './redux/user.redux'
import { chatUser } from './redux/chatUser.redux'
import { chat } from './redux/chat.redux'
const appReducer = combineReducers({ user, chatUser, chat })

const rootReducer = (state, action) => {
  if (action.type === 'CLEARALL') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
