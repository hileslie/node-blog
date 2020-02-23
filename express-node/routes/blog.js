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
const loginCheck = require('../middleware/loginCheck');

/* GET home page. */
router.get('/list', (req, res, next) => {
	// 获取列表
	let author = req.query.author || '';
	const keyword = req.query.keyword || '';
	if (req.query.isadmin) {
		if (!req.session.username) {
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

router.get('/detail', (req, res, next) => {
	const id = req.query.id;
	const result = getDetail(id)
	return result.then(data => {
		res.json(new SuccessModel(data));
	})
});

router.post('/new', loginCheck, (req, res, next) => {
	req.body.author = req.session.username;
	const result = newBlog(req.body);
	return result.then(data => {
		res.json(new SuccessModel(data));
	})	
})

router.post('/update', loginCheck, (req, res, next) => {
	const id = req.query.id;
	const result = updateBlog(id, req.body);
	return result.then(val => {
		if (val) {
			res.json(new SuccessModel(val));
		} else {
			res.json(new ErrorModel('更新失败'));
		}
	})
})

router.post('/del', loginCheck, (req, res, next) => {
	const id = req.query.id;
	const author = req.session.username;
	const result = delBlog(id, author);
	return result.then(val => {
		if (val) {
			res.json(new SuccessModel(val));
		} else {
			res.json(new ErrorModel('删除失败'));
		}
	})
})

module.exports = router;