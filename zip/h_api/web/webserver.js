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
 * Date: 2017年3月23日
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
const webport = process.env.PORT || config.webport || 3000

app.set('env', env)
app.set('port', webport)

// Express configure
require('./web-express')(app, env, config)

// Express routes
app.use(function(req, res) {
  res.sendFile('/index.html', { root: __dirname })
})

// 参数 '127.0.0.1' 限制本机访问，用于生产环境仅允许域名访问nginx跳转
// 要注意用手机调试时去掉该参数
http.createServer(app).listen(webport, '127.0.0.1', () => {
  console.info(`==> 🌐  ${config.name} Server started on port ${webport}, env=${env}`)
})
