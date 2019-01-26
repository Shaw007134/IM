import React from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chat.redux'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

@connect(
  state=>state.chatUser,
  {getUserList}
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
    console.log(this.state)
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
        <WhiteSpace />

        {this.props.userList.map(v =>
          v.avatar ? (
            <Card key={v._id}>
              <Header
                title={v.user}
                thumb={require(`../../assets/avatar/${v.avatar}.png`)}
                extra={<span>{v.title}</span>}
              />
              <Body>
                {v.desc.split('\n').map(v => (
                  <div key={v}>{v}</div>
                ))}
              </Body>
            </Card>
          ) : null
        )}
      </WingBlank>
    )
  }
}

export default Boss
