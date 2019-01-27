import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chat.redux'
import UserCard from '../user-card/user-card'

@connect(
  state => state.chatUser,
  { getUserList }
)
class Candidate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.props.getUserList('boss')
  }
  render() {
    console.log(this.state)
    return <UserCard userList={this.props.userList} />
  }
}

export default Candidate
