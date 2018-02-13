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

module.exports = (express, app, config) => {

  const router = express.Router()

  router.get('/', (req, res) => {
    res.status(200).json({ value: 'Hello World!' })
  })

  // 设置session
  router.get('/setSession', (req, res) => {
    console.log('\n----- setSession -----\n')

    const sessionData = req.session
    sessionData.foo = 'Nintendo Switch'

    res.send('\n----- setSession -----\n')
  })

  // 读取Session
  router.get('/getSession', (req, res) => {
    console.log('\n----- getSession -----\n')

    const { foo } = req.session

    res.send(`This attribute is ${foo}`)
  })


  /**
  * 當路由找不到時進行處理
  */
  router.get('*', (req, res) => {
    res.status(404).json({ route: 'Sorry! This page does not exist! 抱歉!该页面不存在!' })
  })


  /**
  * URL路由需要加前綴
  */
  app.use('/', router)
}
