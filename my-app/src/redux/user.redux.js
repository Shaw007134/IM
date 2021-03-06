import axios from 'axios'
import { getRedirectPath } from '../util'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'
const REGSIGER = 'REGSIGER'
const initState = {
  redirectTo: '',
  msg: '',
  user: undefined,
  type: '',
  isAuth: false
}

// reducer
export function user(state = initState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        isAuth: true,
        redirectTo: getRedirectPath(action.payload),
        ...action.payload
      }
    case ERROR_MSG:
      return { ...state, msg: action.msg, isAuth: false }
    case LOAD_DATA:
      return { ...state, ...action.payload, isAuth: true }
    case LOGOUT:
      return { ...initState, redirectTo: '/login' }
    case REGSIGER:
      return { ...state, redirectTo: '/register' }
    default:
      return state
  }
}

function errorMsg(msg) {
  return { msg, type: ERROR_MSG }
}

function authSuccess(obj) {
  const { pwd, ...data } = obj
  return { type: AUTH_SUCCESS, payload: data }
}

export function loadData(userinfo) {
  return { type: LOAD_DATA, payload: userinfo }
}

export function userInfo(data) {
  return dispatch => {
    dispatch(loadData(data))
  }
}

// export function getUserInfo() {
//   return dispatch => {
//     axios.get('/user/info').then(response => {
//       let res = response.data
//       console.log(res)
//       if (response.status === 200 && res.code === 0) {
//         dispatch(loadData(res.data))
//       }
//     })
//   }
// }

export function update(data) {
  return dispatch => {
    axios.post('/user/update', data).then(res => {
      console.log(res)
      if (res.status === 200 && res.data.code === 0) {
        // dispatch(authSuccess(res.data.data))
        dispatch(clearAll())
        dispatch(logoutSubmit())
        console.log('dispatch logout')
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('用户名和密码必须输入')
  }
  return dispatch => {
    axios.post('/user/login', { user, pwd }).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function loginRegister() {
  return { type: REGSIGER }
}

export function register({ user, pwd, repeatpwd, type }) {
  console.log(user)
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码与确认密码不一致')
  }
  return dispatch => {
    axios.post('/user/register', { user, pwd, type }).then(res => {
      console.log(res)
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({ user, pwd, type }))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}

export function clearAll() {
  console.log('clear all')
  return {
    type: 'CLEARALL'
  }
}
export function logoutSubmit() {
  return { type: LOGOUT }
}
