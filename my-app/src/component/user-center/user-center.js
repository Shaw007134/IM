import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Modal, Button } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit, clearAll } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import { endMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  { logoutSubmit, endMsg, clearAll }
)
class UserCenter extends React.Component {
  logOut = () => {
    const alert = Modal.alert
    alert('Logout', 'Confirm to logout?', [
      { text: 'Cancle', onPress: () => console.log('cancle') },
      {
        text: 'Confirm',
        onPress: () => {
          browserCookie.erase('userid')
          // window.location.href = window.location.href
          this.props.endMsg()
          this.props.clearAll()
          this.props.logoutSubmit()
        }
      }
    ])
  }
  render() {
    const props = this.props.user
    const Item = List.Item
    const Brief = Item.Brief
    const desc = props.type === 'boss' ? 'Job Description' : 'Personal Profile'
    console.log(this.props)
    return props.user ? (
      <div>
        <Result
          img={
            <img
              src={require(`../../assets/avatar/${props.avatar}.png`)}
              style={{ width: 50 }}
              alt=""
            />
          }
          title={props.user}
          message={props.type === 'boss' ? props.company : null}
        />
        <List renderHeader={() => desc}>
          <Item multipleLine>
            {props.title}
            {props.desc
              ? props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)
              : null}
            {props.salary ? <Brief>Salary：{props.salary}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace />
        <Button type="primary" onClick={this.logOut}>
          Logout
        </Button>
      </div>
    ) : (
      <Redirect to={props.redirectTo} />
    )
  }
}

export default UserCenter
