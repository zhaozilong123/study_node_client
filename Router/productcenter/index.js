/**
 * @author fusitao
 * @name userCenter
 */
// 导如对应的控制器
const productcenter_controller = require('../../Controller/productcenter/index.js')
const Router = require('koa-router')
const router = new Router({

})

router.post('/addNewProduct', productcenter_controller.addNewProduct)
router.get('/getAllProducts', productcenter_controller.getAllProducts)
router.post('/removeProduct', productcenter_controller.removeProduct)
router.post('/updateProduct', productcenter_controller.updateProduct)
router.post('/findProduct', productcenter_controller.findProduct)
module.exports = router
