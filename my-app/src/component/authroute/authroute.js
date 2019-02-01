import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { userInfo } from '../../redux/user.redux'
@withRouter
@connect(
  null,
  { userInfo }
)
class AuthRoute extends React.Component {
  componentDidMount() {
    // 获取用户信息
    // 认证前的判断
    const publicList = ['/login', '/register']
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    this.props.userInfo()
  }
  render() {
    return null
  }
}

export default AuthRoute
