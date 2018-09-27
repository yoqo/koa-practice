# koa-practice

### KOA框架原型

基于Node.js(v8.11.2)、npm(5.6.0)、Koa(2.5.2)、MySQL、React(16.5.2)开发，使用来创建项目原型〜

#### 项目地址
https://github.com/meizikeai/koa-practice.git

#### 项目结构

| 路径           | 描述                       | 详情        |
| -------------- | -------------------------- | ----------- |
| bin            | 启动文件                   | -           |
| client         | 客户端目录（reactjs） | 附件        |
| configs        | 配置目录                   | -           |
| logs           | 日志目录                  | -           |
| middleware     | 中间件目录                | -           |
| pm2            | pm2配置文件               | -           |
| public         | 静态文件目录               | favicon.ico |
| servers        | 服务端目录                 | 附件        |
| views          | HTML文件                   | -           |
| .eslintrc.json | ESLint规则                 | -           |
| .gitignore     | Git要排除的文件            | -           |
| app.js         | 入口文件                   | -           |
| package.json   | 项目依赖包                 | -           |
| shipitfile.js  | shipit配置文件             | 发布信息    |

#### 开发环境

开发环境需要依赖ESLint，请使用支持它的编辑器，如[开发神器](https://code.visualstudio.com/)

- 克隆项目
  - `$ git clone https://github.com/meizikeai/koa-practice.git`

- 安装依赖
  - `$ cd koa-practice && npm i`

- 启动项目
  - // 启动后通过 http://localhost:10086 访问
  - `$ npm run start                // 启动项目-连接测试环境的数据库 - 开发使用`
  - `$ npm run development          // 启动项目-测试环境`
  - `$ npm run production           // 启动项目-正式环境`

- 发布部署
  - // 发布部署依赖shipit-cli，请执行 npm install -g shipit-cli
  - `$ npm run deploy:dev     // 发布到测试环境`
  - `$ npm run deploy         // 发布到正式环境`

- 部署回滚
  - // 从shipitfile.js配置文件来看，目前回滚只支持一个版本，发布部署时请谨慎操作
  - `$ npm run rollback:dev   // 回滚至上一个版本（测试环境）`
  - `$ npm run rollback       // 回滚至上一个版本（正式环境）`

#### 服务相关

- 测试服务器
  - 用户@地址：work@192.168.1.1
  - Git分支：test
  - 访问地址：http://localhost:10086
- 线上服务器
  - 用户@地址：work@192.168.1.1
  - Git分支：master
  - 访问地址：http://localhost:10086

---

#### 附件

##### client目录说明

当前为空置状态〜

##### servers目录说明

```
servers
├── controller            // 处理业务流程
│    ├── common.js               
│    └── other.js
├── service               // 业务逻辑、通用业务组件
│    ├── common.js
│    └── other.js
└── routers.js            // 集中的路由器入口
```

---
