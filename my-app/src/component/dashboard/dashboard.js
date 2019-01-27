import React from 'react'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../nav-link/nav-link'
import { connect } from 'react-redux'
import { getMsgList, receiveMsg } from '../../redux/chat.redux'
import Boss from '../boss/boss'
import Candidate from '../candidate/candidate'
import UserCenter from '../user-center/user-center'

function Msg() {
  return <h2>消息列表</h2>
}

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
        title: '候选人列表',
        component: Boss,
        hide: user.type === 'candidate'
      },
      {
        path: '/candidate',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Candidate,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: UserCenter
      }
    ]
    return (
      <div>
        <NavBar className="fixd-header" mode="dard">
          {navList.find(v => v.path === pathname).title}
        </NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component} />
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList} />
      </div>
    )
  }
}

export default DashBoard
