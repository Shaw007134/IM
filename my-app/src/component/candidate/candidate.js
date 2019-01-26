import React from 'react'
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
class Candidate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    axios.get('/user/list?type=boss').then(res => {
      if (res.data.code === 0) {
        this.setState({ data: res.data.data })
      }
    })
  }
  render() {
    console.log(this.state)
    const Header = Card.Header
    return (
      <WingBlank>
        {this.state.data.map(v =>
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
