const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')
const __filter = { pwd: 0, __v: 0 }
const Chat = model.getModel('chat')

Router.get('/list', (req, res) => {
  const { type } = req.query
  // User.remove({},function(err,doc){})
  User.find({ type }, function(err, doc) {
    return res.json({ code: 0, data: doc })
  })
})

Router.get('/getmsglist', (req, res) => {
  const user = req.cookies.userid
  User.find({}, function(err, userdoc) {
    let users = {}
    userdoc.forEach(v => {
      users[v._id] = { name: v.user, avatar: v.avatar }
    })
    Chat.find({ $or: [{ from: user }, { to: user }] }, function(err, doc) {
      if (!err) {
        return res.json({ code: 0, msgs: doc, users: users })
      }
    })
  })
})
Router.post('/readmsg', function(req, res) {
  const userid = req.cookies.userid
  const { from } = req.body
  Chat.update(
    { from, to: userid },
    { $set: { read: true } },
    { multi: true },
    function(err, doc) {
      if (!err) {
        return res.json({ code: 0, num: doc.nModified })
      }
      return res.json({ code: 1, msg: '修改失败' })
    }
  )
})
Router.post('/update', function(req, res) {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({ code: 1 })
  }
  const body = req.body
  User.findByIdAndUpdate(userid, body, function(err, doc) {
    const data = Object.assign(
      {},
      {
        user: doc.user,
        type: doc.type
      },
      body
    )
    return res.json({ code: 0, data })
  })
})
Router.post('/login', (req, res) => {
  const { user, pwd } = req.body
  User.findOne({ user, pwd: md5Pwd(pwd) }, __filter, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误' })
    }
    res.cookie('userid', doc._id)
    return res.json({ code: 0, data: doc })
  })
})

Router.post('/register', (req, res) => {
  const { user, pwd, type } = req.body
  User.findOne({ user }, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复' })
    }

    const userModel = new User({ user, pwd: md5Pwd(pwd), type })

    userModel.save(function(err, doc) {
      if (err) {
        return res.json({ code: 1, msg: '服务器错误' })
      }
      const { user, type, _id } = doc
      res.cookie('userid', _id)
      return res.json({ code: 0, data: { user, type, _id } })
    })
  })
})

Router.get('/info', (req, res) => {
  const { userid } = req.cookies
  if (!userid) {
    return res.json({ code: 1 })
  }
  User.findOne({ _id: userid }, __filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '服务器错误' })
    }
    if (doc) {
      console.log('info')
      return res.json({ code: 0, data: doc })
    }
  })
})

function md5Pwd(pwd) {
  const salt = 'react_shaw@007.com'
  pwd = utils
    .md5(pwd + salt)
    .split('')
    .reverse()
    .join('')
  return utils.md5(pwd)
}

module.exports = Router
