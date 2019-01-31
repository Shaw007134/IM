import React from 'react'
import QueueAnim from 'rc-queue-anim'

import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import {
  sendMsg,
  getMsgList,
  receiveMsg,
  readMsg
} from '../../redux/chat.redux'
import { getChatId } from '../../util'

@connect(
  state => state,
  { sendMsg, getMsgList, receiveMsg, readMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.fixCarousel = this.fixCarousel.bind(this)
    this.state = { text: '', msg: [], showEmoji: false }
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.receiveMsg()
    }
    this.fixCarousel()
  }
  componentWillUnmount() {
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  fixCarousel() {
    let timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
      clearTimeout(timer)
    }, 0)
  }
  handleSubmit() {
    console.log('sendmsg')
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '' })
  }

  render() {
    const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v => v)
      .map(v => ({ text: v }))
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if (!users[userid]) {
      return null
    }
    const chatid = getChatId(userid, this.props.user._id)
    const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)

    return (
      <div id="chat-page">
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
          mode="dark"
        >
          {users[userid].name}
        </NavBar>
        <QueueAnim type="right" delay={100}>
          {chatmsgs.map(v => {
            const avatar = require(`../../assets/avatar/${
              users[v.from].avatar
            }.png`)
            return v.from === userid ? (
              <List key={v._id}>
                <Item thumb={avatar}>{v.content}</Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item extra={<img src={avatar} />} className="chat-me">
                  {v.content}
                </Item>
              </List>
            )
          })}
        </QueueAnim>
        <div className="stick-footer">
          <InputItem
            placeholder="Say Something..."
            value={this.state.text}
            onChange={v => {
              this.setState({ text: v })
            }}
            extra={
              <div>
                <span
                  onClick={() => {
                    this.setState({
                      showEmoji: !this.state.showEmoji
                    })
                    this.fixCarousel()
                  }}
                  style={{ marginRight: 5 }}
                >
                  😃
                </span>
                <span
                  onClick={e => {
                    this.handleSubmit()
                  }}
                >
                  Send
                </span>
              </div>
            }
            // onExtraClick={e => {
            //   this.handleSubmit()
            // }}
          />
          {this.state.showEmoji ? (
            <Grid
              data={emoji}
              columnNum={9}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={el => {
                this.setState({
                  text: this.state.text + el.text
                })
                console.log(el)
              }}
            />
          ) : null}
        </div>
      </div>
    )
  }
}

export default Chat
