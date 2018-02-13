import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Bundle from './bundle'
import Home from './components/Home' // 首页不按需加载

// 按需加载静态页面,当前写法会引起 eslint 不适，所以这段先关掉
/* eslint-disable import/no-webpack-loader-syntax,import/first,import/no-unresolved,import/extensions */
import loadAbout from 'bundle-loader?lazy&name=[name]!./components/About'
import loadTopics from 'bundle-loader?lazy&name=[name]!./components/Topics'
import loadTodo from 'bundle-loader?lazy&name=[name]!./components/Todo'
/* eslint-enable */

// 按需加载组件
/* eslint-disable no-shadow */
const About = () => (
  <Bundle load={loadAbout}>
    { About => <About /> }
  </Bundle>
)

const Topics = match => (
  <Bundle load={loadTopics}>
    { Topics => <Topics match={match} /> }
  </Bundle>
)

const Todo = () => (
  <Bundle load={loadTodo}>
    { Todo => <Todo /> }
  </Bundle>
)
/* eslint-enable */


// 主页+路由等组件
const Dashboard = () => (
  <Router>
    <div className="wrap">
      {/* 左侧链接导航 */}
      <div className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/topics">Topics</Link></li>
          <li><Link to="/todo">Todo</Link></li>
        </ul>
      </div>

      {/* 右侧内容组件 */}
      <div className="content">
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
        <Route path="/todo" component={Todo} />
      </div>
    </div>
  </Router>
)

export default Dashboard
