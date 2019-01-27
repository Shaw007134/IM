import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'

class UserCard extends React.Component {
  render() {
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
                {v.type === 'boss' ? <div>公司:{v.company}</div> : null}
                {v.desc.split('\n').map(d => (
                  <div key={d}>{d}</div>
                ))}
                {v.type === 'boss' ? <div>薪资:{v.salary}</div> : null}
              </Body>
            </Card>
          ) : null
        )}
      </WingBlank>
    )
  }
}

UserCard.protoTypes = {
  userList: PropTypes.array.isRequired
}

export default UserCard
