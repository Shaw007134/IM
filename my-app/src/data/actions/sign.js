export default function login(state){
  return {
    type: 'LOGIN_START',
    payload: {
      state: state
    }
  }
}