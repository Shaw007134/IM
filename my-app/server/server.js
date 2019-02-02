const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const model = require('./model')
const Chat = model.getModel('chat')
const path = require('path')
const app = express()
// 将socket 与 express关联
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connect', function(socket) {
  socket.on('sendmsg', function(data) {
    // io 广播数据
    // io.emit('recvmsg',data)
    const { from, to, msg } = data
    const chatid = [from, to].sort().join('_')
    if (to) {
      Chat.create({ chatid, from, to, content: msg }, function(err, doc) {
        io.emit('recvmsg', Object.assign({}, doc._doc))
      })
    }
  })

  socket.on('endmsg', function() {
    console.log('disconnect server')
    socket.removeAllListeners('recvmsg')
    socket.removeAllListeners('endmsg')
    socket.disconnect()
    io.removeAllListeners('connection')
  })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)
app.use(function(req, res, next) {
  if (req.url.startsWith('/user/') || req.url.startsWith('/static')) {
    return next()
  }
  console.log(req.url)
  return res.sendFile(path.resolve('build/index.html'))
})
app.use(express.static(path.resolve('build')))
server.listen(9001, function() {
  console.log('Node app start at port 9001')
})

// 5 app.get('*.js', function (req, res, next) {
//   46  req.url = req.url + '.gz';
//   47  res.set('Content-Encoding', 'gzip');
//   48  res.set('Content-Type', 'text/javascript');
//   49  next();
//   50
// });
// 51
// 52 app.get('*.css', function (req, res, next) {
//   53  req.url = req.url + '.gz';
//   54  res.set('Content-Encoding', 'gzip');
//   55  res.set('Content-Type', 'text/css');
//   56  next();
//   57
// });
