import React from 'react'
import PropTypes from 'prop-types'
import { TabBar } from 'antd-mobile'
import { withRouter } from 'react-router-dom'
@withRouter
class NavLinkBar extends React.Component {
  render() {
    const navList = this.props.data.filter(v => !v.hide)
    console.log(navList)
    const { pathname } = this.props.location
    return (
      <TabBar>
        {navList.map(v => (
          <TabBar.Item
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
    )
  }
}

NavLinkBar.protoTypes = {
  data: PropTypes.array.isRequired
}

export default NavLinkBar
