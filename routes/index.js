var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	//没次index首页刷新触发get方法时，查询数据库表中内容
	post.find({},function(err,docs){
		if (err) {
            console.error(err);
            return;
        }
        // docs 是包含了符合条件的多个文档的一个数组
        // console.log(docs);
        res.render('index', { title: '博客首页', name: '博客', content: docs.reverse()});

	})
});

router.get('/update', function(req, res, next) {
  res.render('update', { title: '博客更新页', name: '博客更新'});
});

//监听此路由下发送的请求
router.post('/',function(req,res){
	var content = req.body.content
	var date = req.body.date
	
	//添加处理
	if(content&&date){
		var newPost = new post({
			content:content,
			date:date
		})
	
	newPost.save(function(err){
		if(err){
			console.error(err)
			return
		}
		console.log('保存成功啦!')
		res.send(200)
	})
//				post.save({content:content,date:date},function(err){
//					 if (err) {
//              console.error(err);
//              return;
//          }
//          //js脚本会在shell中显示
//          console.log('保存成功！');
//          res.send(200);
//				})
	}
	
	//删除处理
	var deleteContent = req.body.deleteContent;
    if (deleteContent) {
    		//此处的post就是数据库操作对象模型即postModel
        post.remove({content: deleteContent}, function(err) {
            if (err) {
                console.error(err);
                return;
            }
            //js脚本会在shell中显示
            console.log('删除成功！');
            res.send(200);
        });
    }
    
  //更新操作
    var oldContent = req.body.oldContent,
        updateContent = req.body.updateContent;

    if (oldContent && updateContent) {
        post.update({content: oldContent}, {$set: {'content': updateContent}}, function(err) {
            if (err) {
                console.error(err);
                return;
            }
            console.log('更新成功！');
            res.send(200);
        });
    }
  
})

//导出路由
module.exports = router;
