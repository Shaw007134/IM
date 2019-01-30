import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
import Wrapper from '../../component/wrapper/wrapper'

//高阶组件，本质是接收一个组件作为参数，返回一个基于传入的组件新构建的组件的函数
//功能：代码复用，逻辑抽象，渲染劫持
//有两种高阶组件
//1. 属性代理 -- 在给组件加额外props或此外添加其他信息
// function HelloWrapper(Com) {
//   class WrapComp extends React.Component {
//     render() {
//       return (
//         <div>
//           <p>我是HOC wrapper</p>
//           <Com name="text" {...this.props} />
//         </div>
//       )
//     }
//   }
//   return WrapComp
// }

//2. 反向继承
// 返回的新组件不继承React.Component，而是继承传入的组件
// 可对原组件的生命周期等进行修改
// function HelloWrapper(Com) {
//   class WrapComp extends Com {
//     componentDidMount() {
//       console.log('高阶组件新增的生命周期，加载完成')
//     }
//     render() {
//       return (
//         <div>
//           <p>我是HOC wrapper</p>
//           <Com name="text" {...this.props} />
//         </div>
//       )
//     }
//   }
//   return WrapComp
// }

//@其实就是高阶组件的修饰器
// @HelloWrapper
// class Hello extends React.Component {
//   render() {
//     return <p>Hello, i love react</p>
//   }
// }

// Hello = HelloWrapper(Hello)

@connect(
  state => state.user,
  { login }
)
@Wrapper
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register() {
    console.log(this.props)
    this.props.history.push('/register')
  }
  handleLogin() {
    this.props.login(this.props.state)
  }
  render() {
    return (
      <div>
        {/* <Hello /> */}
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <Logo />
        <WingBlank>
          <List>
            {this.props.msg ? (
              <p className="error-msg">{this.props.msg}</p>
            ) : null}
            <InputItem onChange={v => this.props.handleChange('user', v)}>
              Username:
            </InputItem>
            <WhiteSpace />
            <InputItem
              type="password"
              onChange={v => this.props.handleChange('pwd', v)}
            >
              Password:
            </InputItem>
          </List>
          <WhiteSpace />

          <Button type="primary" onClick={this.handleLogin}>
            Login
          </Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">
            Register
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login
