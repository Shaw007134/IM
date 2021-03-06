import React from 'react'
import { Grid, List } from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(v => ({
        icon: require(`../../assets/avatar/${v}.png`),
        text: v
      }))
    const gridHeader = this.state.icon ? (
      <div>
        <span>Selected Avatar</span>
        <img style={{ width: 20 }} src={this.state.icon} alt="" />
      </div>
    ) : (
      'Please select an avatar'
    )
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={ele => {
              this.setState(ele)
              this.props.selectAvatar(ele.text)
            }}
          />
        </List>
      </div>
    )
  }
}

AvatarSelector.propTypes = {
  selectAvatar: PropTypes.func.isRequired
}

export default AvatarSelector
