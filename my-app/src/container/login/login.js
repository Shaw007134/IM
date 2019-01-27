import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'

//高阶组件，本质是接收一个组件作为参数，返回一个基于传入的组件新构建的组件的函数
//有两种高阶组件
//1. 属性代理 -- 在给组件加额外props或此外添加其他信息
function HelloWrapper(Com) {
  class WrapComp extends React.Component {
    render() {
      return (
        <div>
          <p>我是HOC wrapper</p>
          <Com name="text" {...this.props} />
        </div>
      )
    }
  }
  return WrapComp
}

//2. 反向继承


//@其实就是高阶组件的修饰器
@HelloWrapper
class Hello extends React.Component {
  render() {
    return <p>Hello, i love react</p>
  }
}

// Hello = HelloWrapper(Hello)

@connect(
  state => state.user,
  { login }
)
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      pwd: ''
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register() {
    console.log(this.props)
    this.props.history.push('/register')
  }
  handleChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  handleLogin() {
    this.props.login(this.state)
  }
  render() {
    return (
      <div>
        <Hello />
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? (
              <p className="error-msg">{this.props.msg}</p>
            ) : null}
            <InputItem onChange={v => this.handleChange('user', v)}>
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v => this.handleChange('pwd', v)}
            >
              密码
            </InputItem>
          </List>
          <WhiteSpace />

          <Button type="primary" onClick={this.handleLogin}>
            登录
          </Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">
            注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
