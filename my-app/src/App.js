import React from 'react'
import { connect } from 'react-redux'
import { add, remove, addAsync } from './index.redux'
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

const mapStatetoProps = state => {
  return { num: state }
}
const actionCreators = { add, remove, addAsync }
// connect 会把state挂载到props上，另外方法调用会自动dispatch，不用通过store.dispatch
App = connect(
  mapStatetoProps,
  actionCreators
)(App)
export default App
