#!/bin/sh
cd /Users/leslie/Documents/personal/node-blog/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log