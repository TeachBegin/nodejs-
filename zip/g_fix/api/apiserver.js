/**
 *　　┏┓　　　┏┓+ +
 *　┏┛┻━━━┛┻┓ + +
 *　┃　　　　　　　┃ 　
 *　┃　　　━　　　┃ ++ + + +
 * ████━████ ┃+
 *　┃　　　　　　　┃ +
 *　┃　　　┻　　　┃
 *　┃　　　　　　　┃ + +
 *　┗━┓　　　┏━┛
 *　　　┃　　　┃　　　　　　　　　　　
 *　　　┃　　　┃ + + + +
 *　　　┃　　　┃
 *　　　┃　　　┃ +  神兽保佑
 *　　　┃　　　┃    代码无bug　　
 *　　　┃　　　┃　　+　　　　　　　　　
 *　　　┃　 　　┗━━━┓ + +
 *　　　┃ 　　　　　　　┣┓
 *　　　┃ 　　　　　　　┏┛
 *　　　┗┓┓┏━┳┓┏┛ + + + +
 *　　　　┃┫┫　┃┫┫
 *　　　　┗┻┛　┗┻┛+ + + +
 *
 *
 * Author: ZouSong
 * Date: 2017年12月12日
 *
 */

 const http = require('http')
 const express = require('express')

 const config=require('../config/config')

 /**
  * 创建服务器
  */
  const app= module.exports =express()

  const env = proccess.env.NODE_ENV || 'devrlopment'
  const apiport = proccess.env.PORT || config.apiport || 3000

  app.set('env',env)
  app.set('port', apiport)

  require('./server/api-express')(app, env, config)
  require('./server/api-routes')(express, app, config)

  // 127.0.0.1限制本机访问，用于生产环境仅允许域名访问nginx跳转
// 要注意用手机调试时去掉

http.createServer(app).listen(apiport, () => {
    const.info(`${config.name} Server started on port ${apiport}, env=${env}`)
})