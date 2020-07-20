/**
 * @author fusitao
 * @name staffcenter
 */
// 导如对应的控制器
const staffcenter_controller = require('../../Controller/staffcenter/index.js')
const Router = require('koa-router')
const router = new Router({

})

router.post('/addNewStaff', staffcenter_controller.addNewStaff)
router.post('/getAllStaffs', staffcenter_controller.getAllStaffs)
router.post('/removeStaff', staffcenter_controller.removeStaff)
router.post('/updateStaff', staffcenter_controller.updateStaff)
router.post('/findStaff', staffcenter_controller.findStaff)
router.post('/getDiffStaffs', staffcenter_controller.getDiffStaffs)
router.post('/changeCode', staffcenter_controller.changeStaffCode)
module.exports = router
