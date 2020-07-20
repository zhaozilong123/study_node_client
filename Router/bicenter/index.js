/**
 * @author fusitao
 * @name userCenter
 */
// 导如对应的控制器
const bicenter_controller = require('../../Controller/bicenter/index.js')
const Router = require('koa-router')
const router = new Router({

})

router.post('/findBiByOne', bicenter_controller.findBIDataByOne)
router.post('/findBiByType', bicenter_controller.findBIDataByType)
module.exports = router
