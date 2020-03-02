# 上线

## 线上环境
- 服务器稳定性
- 充分利用服务器硬件资源，以便提高性能
- 线上日志记录

## PM2
- 进程守护，系统崩溃自动重启
- 启动多进程，充分利用CPU和内存
- 自带日志记录功能

## 目录
- PM2介绍
    - 下载安装

        `npm install pm2 -g`

    - 基本使用

        `pm2 start` 

    - 常用命令

        `pm2 list`
        `pm2 restart <AppName>/<id>`
        `pm2 stop <AppName>/<id>`
        `pm2 delete <AppName>/<id>`
        `pm2 info <AppName>/<id>`
        `pm2 log <AppName>/<id>`
        `pm2 monit <AppName>/<id>`

- PM2进程守护
- PM2配置和日志记录
- PM2多进程
- 服务器运维
