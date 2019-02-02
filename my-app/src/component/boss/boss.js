import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatUser.redux'
import UserCard from '../user-card/user-card'

@connect(
  state => state.chatUser,
  { getUserList }
)
class Boss extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.props.getUserList('candidate')
  }
  render() {
    return <UserCard userList={this.props.userList} />
  }
}

export default Boss
