import React from 'react'
import { connect } from 'react-redux'
import { register } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo/logo'
import {
  List,
  InputItem,
  Radio,
  WingBlank,
  WhiteSpace,
  Button
} from 'antd-mobile'
import Wrapper from '../../component/wrapper/wrapper'
const RadioItem = Radio.RadioItem

@connect(
  state => state.user,
  { register }
)
@Wrapper
class Register extends React.Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   user: '',
    //   pwd: '',
    //   repeatpwd: '',
    //   type: 'candidate'
    // }

    this.handleRegister = this.handleRegister.bind(this)
  }

  componentDidMount() {
    this.props.handleChange('type', 'candidate')
  }
  handleRegister() {
    this.props.register(this.props.state)
    console.log(this.props.state)
  }
  render() {
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? (
              <p className="error-msg">{this.props.msg}</p>
            ) : null}
            <InputItem onChange={v => this.props.handleChange('user', v)}>
              User Name
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('pwd', v)}
            >
              Password
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('repeatpwd', v)}
            >
              Confirm password
            </InputItem>
            <WhiteSpace />

            <RadioItem
              checked={this.props.state.type === 'candidate'}
              onChange={() => this.props.handleChange('type', 'candidate')}
            >
              Candidate
            </RadioItem>
            <RadioItem
              checked={this.props.state.type === 'boss'}
              onChange={() => this.props.handleChange('type', 'boss')}
            >
              Boss
            </RadioItem>
            <WhiteSpace />
          </List>
          <Button type="primary" onClick={this.handleRegister}>
            Register
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register
