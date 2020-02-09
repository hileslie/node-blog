# Node Blog


## 目标
- 基本功能
- server端开发


## 需求
- 首页、作者主页、博客详情页
- 登录页
- 管理中心、新建页、编辑页

## 技术方案
- 数据如何存储
    - 博客
    - 用户

| id | title | content | createtime | author |
| -- |  ------  |  ------  | ----- | ----- |
| 1  | 标题 | 内容 | 15265653246 |  张三  |

| id | username | password | realname |
| -- |  ------  |  ------  | ----- |
| 1  | zhangsan | 12345678 | 张三 |

- 接口设计
    - 列表
    - 内容
    - 新增
    - 更新
    - 删除
    - 登录

| 描述 | 接口 | 方法 | URL参数 | 备注 |
| --- |  ------  |  ------  | ----- | ------ |
| 获取博客列表  | /api/blog/list   | get | author，keyword | 参数为空，则不进行查询 |
| 获取博客内容  | /api/blog/detail | get | id |  |
| 新增博客     | /api/blog/new    | post | author，content |  |
| 更新博客     | /api/blog/update | post | id，content |  |
| 删除博客     | /api/blog/del    | post | id |  |
| 登录        | /api/user/login  | post |  |  |


## 开发

### 开发接口
- nodejs处理http请求
    - get请求 querystring
    - post请求 postdata
    - 路由
- 搭建开发环境
- 开发接口

### 搭建开发环境
- 原生node
- 使用nodemon检测文件变化，自动重启node
- 使用cross-env设置环境变量，兼容mac Linux windows

### 数据库 mysql
- 连接数据库
    - root 密码
- 建库
    - 新建一个名为myblog的库
- 建表
    - 创建users表

    | culumn   | datatye     | pk主键 | nn不为空 | AI自动增加 | Default |
    | -------- | ----------- | -----  | ------- | -------- | ----- |
    | id       | int         | Y      | Y       | Y        |       |
    | username | varchar(20) |        | Y       |          |       |
    | password | varchar(20) |        | Y       |          |       |
    | realname | varchar(10) |        | Y       |          |       |
    | state    | int         |        | Y       |          | 1     |

    - 创建blogs表

    | culumn     | datatye     | pk主键 | nn不为空 | AI自动增加 | Default |
    | ---------- | ----------- | -----  | ------- | -------- | ----- |
    | id         | int         | Y      | Y       | Y        |       |
    | title      | varchar(50) |        | Y       |          |       |
    | content    | longtext    |        | Y       |          |       |
    | createtime | bigint(20)  |        | Y       |          | 0     |
    | author     | varchar(20) |        | Y       |          |       |

- 表操作
    - 增、删、改、查
    - 使用sql语句

    ```
        use myblog;

        show tables;

        insert into users(username,`password`,realname)values('lisi','123','李四');

        select * from users;
        select id,username from users;
        select * from users where username='zhangsan';
        select * from users where username='zhangsan'and`password`='123';
        select * from users where username='zhangsan'or`password`='123';
        select * from users where username like '%zhang%';
        select * from users where password like '%1%' order by id desc;

        update users set realname='李四2' where username='lisi';
        如果报错 `Error Code: 1175. You are using safe update mode and you tried to update a table without a WHERE that uses a KEY column.  To disable safe mode, toggle the option in Preferences -> SQL Editor and reconnect.`
        则先执行 `SET SQL_SAFE_UPDATES=0;`

        delete from users where username='lisi'; // 真实删除

        select * from users where state='1';
        update users set state='0' where username='lisi'; // 软删除，通过控制state，可恢复数据
        select * from users where state<>'0';
    ```

- nodejs操作mysql
    - 连接

    ```
    连接时如果报错 `Client does not support authentication protocol requested by server; consider upgrading MySQL client`
    则在Workbench中执行 `ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';`
    password 为root密码
    ```

    - 封装：将其封装为系统可用的工具
    - 使用：让API直接操作数据库
