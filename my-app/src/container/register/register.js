import React from 'react'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  Radio,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: 'candidate'
    }
  }

  render() {
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <Logo />
        <h2>注册页</h2>
        <WingBlank>
          <List>
            <InputItem>用户名</InputItem>
            <WhiteSpace />
            <InputItem>密码</InputItem>
            <WhiteSpace />
            <InputItem>确认密码</InputItem>
            <WhiteSpace />

            <RadioItem checked={this.state.type === 'candidate'}>
              Candidate
            </RadioItem>
            <RadioItem checked={this.state.type === 'boss'}>Boss</RadioItem>
            <WhiteSpace />
          </List>
          <Button type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register
