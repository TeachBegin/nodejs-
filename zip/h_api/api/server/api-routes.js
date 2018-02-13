module.exports = (express, app, config) => {

  const router = express.Router()

  router.get('/', function (req, res) {
    res.status(200).json({value: 'Hello World!'})
  })


  /**
   * 當路由找不到時進行處理
   */
  router.get('*', (req, res) => {
    res.json({
      route: 'Sorry! This page does not exist! 抱歉!该页面不存在!'
    })
  })


  /**
   * URL路由需要加前綴
   */
  app.use('/', router)
}
