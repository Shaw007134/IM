const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const utils = require('utility')
const __filter = { pwd: 0, __v: 0 }

Router.get('/list', (req, res) => {
  // User.remove({},function(err,doc){})
  User.find({}, function(err, doc) {
    return res.json(doc)
  })
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
  console.log(req.cookies)
  const { userid } = req.cookies
  if (!userid) {
    return res.json({ code: 1 })
  }
  User.findOne({ _id: userid }, __filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '服务器错误' })
    }
    if (doc) {
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
