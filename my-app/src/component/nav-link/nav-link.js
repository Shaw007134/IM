import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
@withRouter
@connect(state => state.chat)
class NavLinkBar extends React.Component {
  render() {
    const navList = this.props.data.filter(v => !v.hide)
    const { pathname } = this.props.location
    return (
      <div id="nav-link">
        <TabBar>
          {navList.map(v => (
            <TabBar.Item
              badge={v.path === '/msg' ? this.props.unread : 0}
              key={v.path}
              title={v.text}
              icon={{ uri: require(`../../assets/nav/${v.icon}.png`) }}
              selectedIcon={{
                uri: require(`../../assets/nav/${v.icon}-active.png`)
              }}
              selected={pathname === v.path}
              onPress={() => {
                this.props.history.push(v.path)
              }}
            />
          ))}
        </TabBar>
      </div>
    )
  }
}

NavLinkBar.protoTypes = {
  data: PropTypes.array.isRequired
}

export default NavLinkBar
