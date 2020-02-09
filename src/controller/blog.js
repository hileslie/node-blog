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

const newBlog = (blogData = {}) => {
    return {
        id: 2,
    }
}

const updateBlog = (id, blogData = {}) => {
    return true;
}

const delBlog = (id) => {
    return true;
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
}