const path = require('path')
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  context: path.resolve(__dirname, '..'),
  node: {
    __dirname: true
  },

  // 入口
  entry: {
    vendor: ['react', 'react-dom', 'react-router-dom'],
    style: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './web/src/style/main.scss'
    ],
    components: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './web/src/App.js'
    ]
  },

  // 打包输出设置
  output: {
    path: path.resolve(__dirname, '../bundle'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/bundle/',
    sourceMapFilename: 'map/[file].map'
  },

  // Loader 模块加载
  module: {
    rules: [
      { // js|jsx rules
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react']
            }
          }
        ]
      }, // end of js|jsx rules

      { // css rules
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
          },
          'sass-loader'
        ]
      }, // end of scss|sass rules

      { // css rules
        test: /\.css$/,
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
      }, // end of css rules

      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }, // end of module

  resolve: {
    extensions: ['.js', 'jsx']
  },

  // 插件设置
  plugins: [
    new DashboardPlugin(), // 格式模板插件
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.HotModuleReplacementPlugin(), // 热加载插件
    new webpack.optimize.OccurrenceOrderPlugin(), // 排序输出，属于最小化插件之一
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    })
  ] // end of plugins
}
