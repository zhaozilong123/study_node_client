/**
 * @author fusitao
 * @name common
 */
// 导如对应的控制器
const common_controller = require('../../Controller/common/index.js')
const Router = require('koa-router')
const router = new Router({

})

router.post('/adminLogin', common_controller.adminStaff)
router.post('/staffLogin', common_controller.commonStaff)
module.exports = router
