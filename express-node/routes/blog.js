var express = require('express');
var router = express.Router();
const { 
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel} = require('../model/resModel');

/* GET home page. */
router.get('/list', function (req, res, next) {
	// 获取列表
	let author = req.query.author || '';
	const keyword = req.query.keyword || '';
	if (req.query.isadmin) {
		if (req.session.username === null) {
			// 未登录
			res.json(new ErrorModel('未登录'));
			return;
		}
		author = req.session.username;
	}
	const result = getList(author, keyword);
	return result.then(listData => {
		res.json(new SuccessModel(listData));
	})
});

router.get('/detail', function (req, res, next) {
	res.json({
		error: 0,
		data: {
			id: 0,
			title: 'xxx'
		}
	})
});

module.exports = router;