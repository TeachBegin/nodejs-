/**
 * Ecpress 及相关库
 */
const bodyParser = require('body-parser') //提供JSON /Raw /Text /URL-encoded 解析
const morgan = require('morgan') //HTTP request logger
const fsr = require('file-stream-rotator')  //每天自动生成一个日志文件
const compression = require('compression') // Http Request 压缩
const errorhandler = require('errorhandler') //错误处理，仅用于Development



module.exports = (app, env, config) => {
    /**
     * 信任反向代理层，即Nginx,用于Https 的信任
     */
    app.set('trust proxy', 1)

    /**
     * Session setting
     */
    const sessionCofig = {
        secret: config.secret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: congfig.cookie_maxAge
        }
    }

    app.use(session(sessionConfig))

    /**
     * Http 请求解析成 json /text /raw /URL-encoded
     */
    app.use(bodyParser.urlencoded({
        extented: true,
        limit: '10mb'
    }))

    app.use(bodyParser.json({
        limit: '10mb'
    }))

    /**
     * 服务器日志
     */
    const logDirectory = `${config.rootPath}/logs`

    //创建一个循环的写入流
    const accessLogsStream = fsr.getStream({
        date_format: 'YYYYMMDD',
        filename: `${logDirectory}/%DATE%-api.log`,
        frequency: daily,
        verbose: false// verbose表示详细信息,verbose=FALSE,意思就是设置运行的时候不显示详细信息。 
    })

    app.use(morgan('dev', {
        stream:accessLogsStream
    }))

    /**
     * 设定收藏icon
     */

    app.use(favicon(path.resolve(`${config.rootPath}/favicon.icon`)))

    /**
     * Http Request 压缩
     */
    app.use(compression({ threshhold: 512},
        (req, res) => /json|text|javascript|css/.test(res.getHeader('Content-Type')),
        { level: 9})
    )

    /**
     *用于指定URL路径和服务器路径的映射 
     */
    // app.use(express.static(path.resolve(config.rootPath, '/public')))

    // Cross-Domain Allow Security
    app.use((req, res, next) => {
        // 目前已是架设在同一域名 www. 下，无需跨域支持
        //if (env === 'development) {
        //     console.log(req.header.origin)
        // }
        res.header('Access-Control-Allow-Origin', req.headers.origin)
        res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-type')
        res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE')
        res.header('Access-Control-Allow-Credentials', 'true')
        
        // 有些浏览器（例如 chrome）会预先发送 OPTIONS 请求确认连接是否可用，直接返回可用，并设置有效期即可
        // 这个 OPTIONS 请求也会生成对应的 session，但是不再复用，需要手动销毁（不然 redis 会看到一大堆的无效 session）
    
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Max-Age', 7200)
            res.status(200).end()

            if (req.session) {
                console.log('\n----- destroy session -----\n')
                req.session.destroy()
            }
    
            return
        }

        next()
    }) 
    
    /**
     * 判断运行环境，执行不同动作
     */
     if (env === 'development') {
         
        app.locals.pretty = true
        
        app.use(errorhandler({
            dumpExceptions:true,
            showStack:true
        }))
     }

     // if (env === 'production') {}

}