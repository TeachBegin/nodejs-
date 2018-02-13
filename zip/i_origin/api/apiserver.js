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
 * Author: Hertz
 * Date: 25 Oct 2017
 *
 */


const http = require('http')
const express = require('express')

const config = require('../config/config')


/**
 * 创建服务器
 */
const app = module.exports = express()

const env = process.env.NODE_ENV || 'development'
const apiport = process.env.PORT || config.apiport || 3000

app.set('env', env)
app.set('port', apiport)

require('./server/api-express')(app, env, config)
require('./server/api-routes')(express, app, config)

http.createServer(app).listen(apiport, () => {
  console.info(`==> 🌐  ${config.name} Server started on port ${apiport}, env=${env}`)
})
