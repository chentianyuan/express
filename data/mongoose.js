//引入mongoose模块
var mongoose = require('mongoose')

//连接blog数据库
mongoose.connect('mongodb://localhost/blog')

//定义一个以文件形式存储的数据库模型骨架，不具备数据库的操作能力，Schema生成model，model可以操作数据库
var blogSchema = new mongoose.Schema({
	content:{type:String,unique:true},
	date:String
	//设置要发送到的数据库表名
},{collection:'post'})

//由Schema骨架对象生成model对象并发布
//这里定义的post也可以叫postModel
//后面的post是数据库的表名，连接blog数据库中的post表
//需要进行操作时使用model，如postModel.find({...}),postModel.remove({...})
var post = mongoose.model('post',blogSchema)

//导出的post在app.js入口文件被使用
module.exports = post
