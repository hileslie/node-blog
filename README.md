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