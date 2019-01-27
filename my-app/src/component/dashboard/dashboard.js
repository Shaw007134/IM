import React from 'react'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../nav-link/nav-link'
import { connect } from 'react-redux'
import Boss from '../boss/boss'
import Candidate from '../candidate/candidate'

function Msg() {
  return <h2>消息列表</h2>
}

function User() {
  return <h2>Me</h2>
}
@connect(state => state)
class DashBoard extends React.Component {
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
        component: User
      }
    ]
    return (
      <div>
        <NavBar className="fixd-header" mode="dard">
          {navList.find(v => v.path == pathname).title}
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
