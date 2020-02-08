const getList = (author, keyword) => {
    return [
        {
            id: 1,
            title: '标题',
            content: '内容',
            createtime: '15849793355',
            author: 'zhangsan',
        }
    ]
}

const getDetail = (id) => {
    return {
        id: 1,
        title: '标题',
        content: '内容',
        createtime: '15849793355',
        author: 'zhangsan',
    }
}

module.exports = {
    getList,
    getDetail
}