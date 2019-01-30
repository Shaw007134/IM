import React from 'react'
import { NavBar } from 'antd-mobile'
import { Route } from 'react-router-dom'
import NavLinkBar from '../nav-link/nav-link'
import { connect } from 'react-redux'
import { getMsgList, receiveMsg } from '../../redux/chat.redux'
import Boss from '../boss/boss'
import Candidate from '../candidate/candidate'
import UserCenter from '../user-center/user-center'
import Msg from '../../component/msg/msg'
import QueueAnim from 'rc-queue-anim'
@connect(
  state => state,
  { getMsgList, receiveMsg }
)
class DashBoard extends React.Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.receiveMsg()
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
    console.log(page)
    return (
      <div>
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
