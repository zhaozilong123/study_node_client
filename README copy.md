
# guagua-node-service

> 服务于 guagua 项目应用的基础 node 服务

## QUICK START

#### install

```sh
yarn 
# or 
npm install
```

#### run project

```sh
# 开发环境
yarn server:dev
# or 
npm run server:dev

# 测试环境
yarn server:test
# or 
npm run server:test

# 生产环境
yarn server:pro
# or 
npm run server:pro
```

## STRUCTURE

```sh
.
├── bin
│   └── www ·············· 项目入口文件
├── Controller ··········· 请求逻辑及业务逻辑
├── Middlewares ·········· 自定义中间件
│   └── err-status.js ···· 错误请求中间件
├── Model ················ 数据库连接及定义
├── Router ··············· 路由文件
│   └── index.js ········· 路由汇总文件
├── app.js ··············· 项目启动文件
├── global.config.js ····· 全局配置文件
├── process.json ········· pm2 配置文件
├── Config ··············· 配置目录
│   └── dbConfig.js ······ 数据库配置文件
└── Docs ················· 文档目录
```
