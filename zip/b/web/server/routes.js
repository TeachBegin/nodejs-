module.exports = (express, app, config) => {

  const router = express.Router()

  /**
   * 每一条路由都要先执行该 middleware(中间件) 一遍
   */
  // router.use(req, res, next) => {}


  router.get('/', (req, res) => {
    res.render('index', { title: 'Base Scaffold'})
  })

  app.use('/', router)

}
