const express = require('express')
const mongoose = require('mongoose')

const DB_URL = 'mongodb://47.104.228.220:27017'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function(){
  console.log('mongo connect success')
})

// const User = mongoose.model('user',new mongoose.Schema({
//   user: {type: String, require:true},
//   age: {type:Number, require: true}
// }))

// User.create({
//   user: 'React_IM',
//   age: 26
// }, function(err, doc){
//   if (!err) {
//     console.log(doc)
//   } else {
//     console.log(err)
//   }
// })

//数据库的删除
// User.remove({age: 25},function(err,doc){
//   if (!err) {
//     console.log('delete success')
//     User.find({},function(e,d){
//       console.log(d)
//     })
//   }
// })

// //数据库的更新
// User.update({'user':'React_IM'},{'$set':{age:28}},function(err,doc){
//   if(!err) {
//     console.log('update success')
//     console.log(doc)
//   }
// })

const app = express()

// app.get('/data',function(req,res) {
//   res.json({name: 'IM', type: 'String'})
// })
//此外还有res.send

//数据库的查找
// app.get('/user', function(req, res) {
//   User.findOne({age: '28'},function(err,doc){
//     //查询所有就传入空对象
//     res.json(doc)
//   })
// })


app.listen(9000,function() {
  console.log('Node app start at port 9000')
})