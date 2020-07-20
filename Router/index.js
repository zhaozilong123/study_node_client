/**
 * @author Tiejianwen
 * @name router
 */

const userCenterRouter = require('./usercenter/index.js')
const staffCenterRouter = require('./staffcenter/index.js')
const productCenterRouter = require('./productcenter/index.js')
const orderCenterRouter = require('./ordercenter/index.js')
const biCenterRouter = require('./bicenter/index.js')
const commonnRouter = require('./common/index.js')
const Router = require('koa-router')
const router = new Router({

})

router.use(
    userCenterRouter.routes(),
    userCenterRouter.allowedMethods()
)
.use(
    staffCenterRouter.routes(),
    staffCenterRouter.allowedMethods()
)
.use(
    productCenterRouter.routes(),
    productCenterRouter.allowedMethods()
)
.use(
    orderCenterRouter.routes(),
    orderCenterRouter.allowedMethods()
)
.use(
    biCenterRouter.routes(),
    biCenterRouter.allowedMethods()
)
.use(
    commonnRouter.routes(),
    commonnRouter.allowedMethods()
)

module.exports = router
