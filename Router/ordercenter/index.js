/**
 * @author fusitao
 * @name userCenter
 */
// 导如对应的控制器
const ordercenter_controller = require('../../Controller/ordercenter/index.js')
const Router = require('koa-router')
const router = new Router({

})

router.post('/addNewOrder', ordercenter_controller.addNewOrder)
router.post('/getdiffOrders', ordercenter_controller.getdiffOrders)
router.get('/getAllOrders', ordercenter_controller.getAllOrders)
router.post('/removeOrder', ordercenter_controller.removeOrder)
router.post('/updateOrder', ordercenter_controller.updateOrder)
router.post('/findOrder', ordercenter_controller.findOrder)
router.post('/arrangeDesigner', ordercenter_controller.arrangeDesigner)
router.post('/designOrder', ordercenter_controller.designOrder)
router.post('/financialConfirm',ordercenter_controller.financialConfirm)
router.post('/arrangeOpera', ordercenter_controller.arrangeOpera)
router.post('/afterSaleOrder',ordercenter_controller.afterSaleOrder)
router.post('/getH5Orders', ordercenter_controller.getH5Orders)
module.exports = router
