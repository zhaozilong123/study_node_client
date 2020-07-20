/**
 * @author fusitao
 * @name userCenter
 */
// 导如对应的控制器
const usercenter_controller = require('../../Controller/usercenter/index.js')
const Router = require('koa-router')
const router = new Router({

})

router.post('/addNewUser', usercenter_controller.addNewUsers)
router.post('/getAllUsers', usercenter_controller.getAllUsers)
router.post('/removeUser', usercenter_controller.removeUser)
router.post('/updateUser', usercenter_controller.updateUser)
router.post('/findUser', usercenter_controller.findUser)
router.post('/queryUserInfo', usercenter_controller.queryUserInfo)
module.exports = router
