const path = require('path')
const webpack = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    context: path.resolve(__dirname,'..'),

    node: {
        __dirname: true
    },

    entry: {
        vendor: ['react', 'react-dom', 'react-router-dom'],
        style: ['./web/src/style/main.scss'],
        components: ['./web/src/App.js']
    },

    output: {
        path: path.resolve(__dirname, '../bundle'),
        filename: '[name].js',
        //filename: '[name].[chunkhash:4].js'
        chunkFilename: '[name].chunk.js',
        publicPath: '/bundle/',
        // sourceMapFilename: ''map/[file].map
    },

    module: {
        rules: [
            {// js|jsx rules
              test:  /\.(js|jsx)$/,
              exclude: /node_modules/,
              use:[
                  {
                      loader: 'babel-loader',
                      options: {
                          presets: ['env', 'react']
                      }
                  }
              ]
            }, //end of js|jsx rules

            {   // css rules
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('precss'),
                                require('autoprefixer')
                            ]
                        }
                    }
                ]

            }, //end of css rules

            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                loader: 'url-loader?limit=100000'
            }
        ]
    }, //end of module

    resolve: {
        extensions: ['.js', 'jsx']
    },

    plugins: [

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
            __DEVELOPMENT__: false
        }),
 
        new webpack.optimize.OccurrenceOrderPlugin(),


        new webpack.optimize.UglifyJsPlugin({
            uglifyOptions: {
                ie8: false,
                output: {
                    comments: false,
                    beautiful:false
                },
                mangle: {
                    keep_fnames: true
                },
                compress: {
                    warning: false,
                    drop_console: true
                }
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),

        // new webpack.optimize.CommonsChunkPlugin({
        //   name: "commons", // ( 公共chunk(commnons chunk) 的名称)
        //   filename: "commons.[chunkhash:4].js", // ( 公共chunk 的文件名)
        //   minChunks: 3, // (模块必须被 3个 入口chunk 共享)
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //   children: true,
        //   async: true,
        //   minChunks: 3,
        // }) // 单入口才生效
    ] //end of plugin
} 

