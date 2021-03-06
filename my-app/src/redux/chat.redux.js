import io from 'socket.io-client'
import axios from 'axios'
let socket

const MSG_LIST = 'MSG_LIST'
const MSG_RECV = 'MSG_RECV'
const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  users: {},
  unread: 0
}

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatmsg: action.payload.msgs,
        users: action.payload.users,
        unread: action.payload.msgs.filter(
          v => !v.read && v.to === action.payload.userid
        ).length
      }
    case MSG_RECV:
      const n = action.payload.msg.to === action.payload.userid ? 1 : 0
      return {
        ...state,
        chatmsg: [...state.chatmsg, action.payload.msg],
        unread: state.unread + n
      }
    case MSG_READ:
      const { from, num } = action.payload
      return {
        ...state,
        chatmsg: state.chatmsg.map(v => ({
          ...v,
          read: from === v.from ? true : v.read
        })),
        unread: state.unread - num
      }
    default:
      return state
  }
}

function msgList(msgs, users, userid) {
  return { type: 'MSG_LIST', payload: { msgs, users, userid } }
}

function msgRecv(msg, userid) {
  return { type: 'MSG_RECV', payload: { msg, userid } }
}

export function sendMsg({ from, to, msg }) {
  console.log('sendmsg')
  if (!socket) {
    socket = io('ws://localhost:9001')
    console.log(socket)
  }
  return () => {
    socket.emit('sendmsg', { from, to, msg })
  }
}

export function endMsg() {
  return () => {
    socket.emit('endmsg')
    socket.disconnect()
  }
}

export function receiveMsg() {
  if (!socket) {
    socket = io('ws://localhost:9001')
  }
  return (dispatch, getState) => {
    socket.on('recvmsg', function(data) {
      const userid = getState().user._id
      dispatch(msgRecv(data, userid))
    })
  }
}

function msgRead({ from, userid, num }) {
  return { type: MSG_READ, payload: { from, userid, num } }
}

// export function readMsg(from) {
//   return async (dispatch, getState) => {
//     const res = await axios.post('/user/readmsg', { from })
//     const userid = getState().user._id
//     if (res.status === 200 && res.data.code === 0) {
//       dispatch(msgRead({ userid, from, num: res.data.num }))
//     }
//   }
// }

export function readMsg(from) {
  return (dispatch, getState) => {
    axios.post('/user/readmsg', { from }).then(res => {
      const userid = getState().user._id
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgRead({ userid, from, num: res.data.num }))
      }
    })
  }
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getmsglist').then(res => {
      if (res.status === 200 && res.data.code === 0) {
        const userid = getState().user._id
        dispatch(msgList(res.data.msgs, res.data.users, userid))
      }
    })
  }
}
