module.exports = (express, app, config) => {

    const router = express.Router()

    router.get('/',  (req, res) => {
        res.status(200).json({value: 'Hello World'})
    })

    /**
     * 当路由找不到时进行处理
     */
    router.get('*', (req,res) => {
        res.json({
            route: 'Sorry! This page does not exist ! 抱歉！ 该页面不存在'
        })
    })
    /**
     * URL路由需要加前缀
     */
    app.use('/name',router)
}