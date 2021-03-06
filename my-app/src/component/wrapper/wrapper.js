import React from 'react'

export default function Wrapper(Comp) {
  return class WrapperCom extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key, val) {
      this.setState({
        [key]: val
      })
    }
    render() {
      return (
        <Comp
          handleChange={this.handleChange}
          state={this.state}
          {...this.props}
        />
      )
    }
  }
}
