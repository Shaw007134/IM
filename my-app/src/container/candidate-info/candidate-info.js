import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/avatar-selector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
  state => state.user,
  { update }
)
class CandidateInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      desc: ''
    }
  }
  onChange(key, val) {
    this.setState({
      [key]: val
    })
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div id="info-page">
        {redirect && redirect !== path ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <NavBar mode="dark">Candidate Info</NavBar>
        <AvatarSelector
          selectAvatar={img => {
            this.setState({ avatar: img })
          }}
        />
        <InputItem id="target" onChange={v => this.onChange('title', v)}>
          Career Objective
        </InputItem>
        <TextareaItem
          onChange={v => this.onChange('desc', v)}
          rows={5}
          autoHeight
          title="Personal Profile"
        />
        <Button
          onClick={() => {
            console.log(this.state)
            this.props.update(this.state)
          }}
          type="primary"
        >
          Save
        </Button>
      </div>
    )
  }
}

export default CandidateInfo
