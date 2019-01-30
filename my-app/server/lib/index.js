import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import userRouter from '../user'
import model from '../model'
import path from 'path'
import React from 'react'
import { renderToString, renderToStaticMarkup } from 'react-dom/server'

function App() {
  return (
    <div>
      <p>server render</p>
      <p>test rocks!</p>
    </div>
  )
}

console.log(renderToString(App))

const Chat = model.getModel('chat')
const app = express()

// 将socket 与 express关联
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket) {
  socket.on('sendmsg', function(data) {
    // io 广播数据
    // io.emit('recvmsg',data)
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    Chat.create({ chatid, from, to, content: msg }, function(err, doc) {
      console.log('io emit msg')
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })
})
// 上线过程
/*
1. 购买域名
2. DNS解析到服务器IP
3. 安装nginx
4. 使用pm2管理node进程
*/
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use(function(req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static')) {
    return next()
  }
  console.log(path.resolve('build/index.html'))
  return res.sendFile(path.resolve('build/index.html'))
})
app.use('/', express.static(path.resolve('build')))
server.listen(9000, function() {
  console.log('Node app start at port 9000')
})
