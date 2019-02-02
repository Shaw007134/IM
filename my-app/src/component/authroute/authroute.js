import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userInfo } from '../../redux/user.redux'
import axios from 'axios'
@withRouter
@connect(
  null,
  { userInfo }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    // 获取用户信息
    // 认证前的判断
    const publicList = ['/login', '/register', '/me']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    } else {
      axios.get('/user/info').then(response => {
        let res = response.data
        console.log(res)
        if (response.status === 200) {
          if (res.code === 1) {
            this.props.history.push('/login')
          } else {
            this.props.userInfo(res.data)
          }
        }
      })
    }
  }
  render() {
    return <div />
  }
}

export default AuthRoute
