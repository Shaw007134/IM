import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chat.redux'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

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
    const Header = Card.Header
    return (
      <WingBlank>
        {this.props.userList.map(v =>
          v.avatar ? (
            <Card key={v._id}>
              <Header
                title={v.user}
                thumb={require(`../../assets/avatar/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              />
            </Card>
          ) : null
        )}
      </WingBlank>
    )
  }
}

export default Candidate
