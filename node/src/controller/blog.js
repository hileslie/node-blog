const { exec } = require('../db/mysql');
const xss = require('xss');
const getList = (author, keyword) => {
    // 1=1 保证author, keyword都没传的情况，也能查
    let sql = `select * from blogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `;
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `;
    }
    sql += `order by createtime desc;`;

    return exec(sql);
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}';`;
    return exec(sql).then(rows => {
        return rows[0];
    })
}

const newBlog = (blogData = {}) => {
    // 防止xss攻击
    const content = xss(blogData.title);
    
    const { title, author } = blogData;
    const createtime = Date.now();
    const sql = `insert into blogs (title,content,createtime,author) 
    value ('${title}','${content}','${createtime}','${author}');`
    return exec(sql).then(insertData => {
        // console.log('insertData: ', insertData);
        return {
            id: insertData.insertId
        }
    })
}

const updateBlog = (id, blogData = {}) => {
    const { title, content } = blogData;
    const sql = `
        update blogs set title='${title}', content='${content}' where id='${id}';
    `;
    return exec(sql).then(updateData => {
        // console.log('updateData: ', updateData);
        if (updateData.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

const delBlog = (id, author) => {
    const sql = `delete from blogs where id='${id}' and author='${author}';`;
    return exec(sql).then(delData => {
        console.log('delData: ', delData);
        if (delData.affectedRows > 0) {
            return true;
        }
        return false;
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog,
}