import React from 'react'
import { connect } from 'react-redux'
import { add, remove, addAsync } from './index.redux'

// const mapStatetoProps = state => {
//   return { num: state }
// }
// const actionCreators = { add, remove, addAsync }
// App = connect(
//   mapStatetoProps,
//   actionCreators
// )(App)

@connect(
  // state中需要的属性
  state => ({ num: state }),
  // store中的方法，会被放到props中，自动dispatch
  { add, remove, addAsync }
)
class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h1> App is now, num is {this.props.num}</h1>
        <button onClick={this.props.add}>add num</button>
        <button onClick={this.props.addAsync}>add num with delay</button>
      </div>
    )
  }
}

// connect 会把state挂载到props上，另外方法调用会自动dispatch，不用通过store.dispatch

export default App
