import React from 'react'
import NavLinkBar from '../nav-link/nav-link'
import Boss from '../boss/boss'
import Candidate from '../candidate/candidate'
import UserCenter from '../user-center/user-center'
import Msg from '../../component/msg/msg'
import QueueAnim from 'rc-queue-anim'
import { getMsgList, receiveMsg } from '../../redux/chat.redux'
import { userInfo } from '../../redux/user.redux'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Route, Redirect } from 'react-router-dom'

@connect(
  state => state,
  { getMsgList, receiveMsg, userInfo }
)
class DashBoard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.receiveMsg()
      console.log(this.props)
    }
    if (!this.props.user.user) {
      this.props.userInfo()
      console.log(this.props)
    }
  }
  render() {
    const { pathname } = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: 'candidate',
        icon: 'boss',
        title: 'Candidate List',
        component: Boss,
        hide: user.type === 'candidate'
      },
      {
        path: '/candidate',
        text: 'boss',
        icon: 'job',
        title: 'Boss List',
        component: Candidate,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: 'Message',
        icon: 'msg',
        title: 'Message List',
        component: Msg
      },
      {
        path: '/me',
        text: 'Me',
        icon: 'user',
        title: 'User Center',
        component: UserCenter
      }
    ]
    const page = navList.find(v => v.path === pathname)
    return (
      <div>
        {!page ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar className="fixd-header" mode="dard">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div style={{ marginTop: 45 }}>
          {/* <Switch> */}
          <QueueAnim type="scaleX" duration={800}>
            <Route
              key={page.path}
              path={page.path}
              component={page.component}
            />

            {/* {navList.map(v => ( */}
            {/* <Route key={v.path} path={v.path} component={v.component} /> */}
            {/* ))} */}
          </QueueAnim>
          {/* </Switch> */}
        </div>
        <NavLinkBar data={navList} />
      </div>
    )
  }
}

export default DashBoard
