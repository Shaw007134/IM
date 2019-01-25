const ADD = 'add'
const REMOVE = 'remove'

// reducer
export function counter(state = 10, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'remove':
      return state - 1
    default:
      return 10
  }
}

// action creator
export function add() {
  return { type: ADD }
}

export function remove() {
  return { type: REMOVE }
}

// 之前返回的是对象，现在返回的是函数
export function addAsync() {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: ADD })
    }, 2000)
  }
}
