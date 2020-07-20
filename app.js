/**
 * @author Tie Jianwen
 * @date 2019-01-01
 * @name Entrance for server
 */

/**
 * Define variables
 */
const Koa = require('koa')
const app = new Koa()
app.keys = ['ws:!#@sdjklu'] // 一串乱码,  session 用的
const to = require('await-to-js').default
const cors = require('koa2-cors')
/**
 * mondodb 初始化
 */
const mongoStart = require('./Model/mongo.start')
!(async () => {
    let [err, dbInfo] = await to(mongoStart())
    if (err) {
        console.log(err)
    }
})()

/**
 * Koa middleware
 */
const compose = require('koa-compose')
const onerror = require('koa-onerror')
const CookieParser = require('koa-cookie-parser')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session')

/**
 * self middleware
 */
const errStatus = require('./Middlewares/err-status')

/**
 * router
 */
const router = require('./Router')

/**
 * Each `app.use()` only accepts a single generator function.
 * If you want to combine multiple generator functions into a single one,
 * you can use `koa-compose` to do so.
 * This allows you to use `app.use()` only once.
 * Your code will end up looking something like:
 *
 *   app.use(compose([
 *     function *(){},
 *     function *(){},
 *     function *(){}
 *   ]))
 */
app.use(compose([
    async (ctx, next) => {
        const start = new Date()
        await next()
        const ms = new Date() - start
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    },
    CookieParser({
        cookieNameList: ['userId','uuId'],
        cipherKey: "hello world",
        maxAge: 60*60*24
    }),
    bodyparser({
        enableTypes:['json', 'form', 'text']
    }),
    cors({
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
        maxAge: 100,
        credentials: true,
        allowMethods: ['GET', 'POST', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
    }),
    session({
        key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 86400000,
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: true, /** (boolean) httpOnly or not (default true) */
        signed: true, /** (boolean) signed or not (default true) */
    }, app),
    logger(),
    errStatus(),
    router.routes(),
    router.allowedMethods(),
]))

onerror(app)

/**
 * Exports app
 */
module.exports = app
