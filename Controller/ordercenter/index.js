/**
 * @author fusitao
 * @name 用户表增删改查
 * @type userCenter
 */

const to = require('await-to-js')
const { ordercenter } = require('../../Model/ordercenter/index')

const getAllOrders = async (ctx, next) => {
  // get 请求返回所有数据
    const req = ctx.request.body;
    const examples = await ordercenter.find({});
    ctx.status = 200;
    ctx.body = {
    msg: 'get request!!',
        data: {
            data: req,
            examples,
        }
    }
}
const getdiffOrders = async (ctx, next) => {
  // get 请求返回所有数据
    const req = ctx.request.body;
    const data = await ordercenter.find(
      {'orderStatus' : {'$gte' : req.orderStatus[0], '$lte' : req.orderStatus[1]}}
      ).sort({'_id':-1})
    let newdata = []
    if(req.startNum || req.pageSize){//说明是分页数据，返回分页
      newdata = data.slice(req.startNum,parseInt(req.startNum) + parseInt(req.pageSize))
    }else{//否则原样返回
      newdata = data.slice()
    }
    ctx.status = 200;
    ctx.body = {
        code: 0,
        msg: 'get request!!',
        data: newdata,
        length:data.length
    }
}

// post 带一个 name 参数，并插入数据库
const addNewOrder = async (ctx, next) => {
    const req = ctx.request.body;
    let code = 0 // 状态码
    ctx.status = 200;
    if (!req.orderID || typeof req.orderID != 'string' || 
        !req.orderStatus || typeof req.orderStatus != 'string') {
      ctx.status = 401;
      ctx.body = {
        msg: '必要字段缺失',
        desc: `parameter error！！name: ${req.orderID}`,
        data: req
      }
      return;
    }
    let result = 'sucess'
    // 通过实例化一个 Order 对象在添加用户
    // const newOrder = new ordercenter({
    //     fstname: req.name,
    // })
    try{
       code = 0
       result = await ordercenter.create({
        orderID: req.orderID,
        orderStatus: req.orderStatus,
        creatTime: Date.now(),
        creatPeople: req.creatPeople,
        designTime: req.designTime,
        designPeople: req.designPeople,
        firstprice: req.firstprice,
        contractNum: req.contractNum,
        productInfo: req.productInfo,
        totalPrice: req.totalPrice,
        operateTime: req.operateTime,
        operatePeople: req.operatePeople,
        overTime: req.overTime
        });
       //result = '保存成功, ' + newOrder.save()
    } catch (error){
       code = -1
       result = '保存失败, ' + error
    }
    ctx.response.body = {
      code,
      result,
    }
  }

// 根据订单ID查找订单
const findOrder = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await ordercenter.findOne({
      orderID: req.orderID
    })
    code = 0
    result = doc
  } catch (err) {
    code = -1
    result = err
  }

  ctx.response.body = {
    code,
    result
  }
  return result
}

// 根据指定条件查找所有用户
// find指的是查找指定表的所有数据，返回的是数组
// findOne指的是查找指定表的单条数据，返回一个对象

// 分配设计师
// conditions: 查询条件；updateDoc：需要修改的数据, 都是一个对象
// multi (boolean)： 默认为false。是否更新多个查询记录。
const arrangeDesigner = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await ordercenter.update({"orderID" : req.orderID},{
      $set: {
        orderStatus:req.orderStatus, 
        designPeople: req.designPeople
      }
    })
    code = 0
    result = doc
    console.log(doc)
  } catch (err) {
    code = -1
    result = err
  }
  ctx.response.body = {
    code,
    result
  }
  return result
}
// 修改订单设计信息
const designOrder = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await ordercenter.update({"orderID" : req.orderID},{
      $set: {
        orderStatus:req.orderStatus, 
        firstprice: req.firstprice,
        productInfo: req.productInfo,
        contractNum: req.contractNum,
        operateTime: req.operateTime,
        designTime: Date.now(),
      }
    })
    code = 0
    result = req
  } catch (err) {
    code = -1
    result = err
  }
  ctx.response.body = {
    code,
    result
  }
  return result
}

// 修改订单状态，分配设计师
const updateOrder = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await ordercenter.update(
      {
        orderID: req.orderID,
        orderStatus: req.orderStatus,
        creatTime: req.creatTime,
        creatPeople: req.creatPeople,
        designTime: req.designTime,
        designPeople: req.designPeople,
        firstprice: req.firstprice,
        productInfo: req.productInfo,
        totalPrice: req.totalPrice,
        operateTime: req.operateTime,
        operatePeople: req.operatePeople,
        overTime: req.overTime
      })
    code = 0
    result = doc
    console.log(doc)
  } catch (err) {
    code = -1
    result = err
  }

  ctx.response.body = {
    code,
    result
  }
  return result
}
// 财务确认订单
const financialConfirm = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await ordercenter.update({"orderID" : req.orderID},{
      $set: {
        orderStatus:req.orderStatus, 
        totalPrice: req.totalPrice,
      }
    }, false, false)
    code = 0
    result = doc
  } catch (err) {
    code = -1
    result = err
  }
  ctx.response.body = {
    code,
    result
  }
  return result
}
// 分配售后员
// conditions: 查询条件；updateDoc：需要修改的数据, 都是一个对象
// multi (boolean)： 默认为false。是否更新多个查询记录。
const arrangeOpera = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await ordercenter.update({"orderID" : req.orderID},{
      $set: {
        orderStatus:req.orderStatus, 
        operatePeople: req.operatePeople
      }
    })
    code = 0
    result = doc
    console.log(doc)
  } catch (err) {
    code = -1
    result = err
  }
  ctx.response.body = {
    code,
    result
  }
  return result
}
// 售后提交照片信息
const afterSaleOrder = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await ordercenter.update({"orderID" : req.orderID},{
      $set: {
        orderStatus:req.orderStatus, 
        moreInfo: req.moreInfo,
        operateTime: Date.now()
      }
    })
    code = 0
    result = req
  } catch (err) {
    code = -1
    result = err
  }
  ctx.response.body = {
    code,
    result
  }
  return result
}
// 删除用户数据
const removeOrder = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await ordercenter.remove(
      { orderID: req.orderID})
    code = 0
    result = doc
    console.log(doc)
  } catch (err) {
    code = -1
    result = err
  }

  ctx.response.body = {
    code,
    result
  }
  return result
}
// h5端获取用户订单数据
const getH5Orders = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc
    if(req.staffType === '销售员'){
      doc = await ordercenter.find({
        creatPeople: req.staffName
      })
    }else if(req.staffType === '设计师'){
      doc = await ordercenter.find({
        designPeople: req.staffName
      })
    }else if(req.staffType === '售后员'){
      doc = await ordercenter.find({
        operatePeople: req.staffName
      })
    }
    code = 0
    result = doc
  } catch (err) {
    code = -1
    result = err
  }

  ctx.response.body = {
    code,
    result
  }
  return result
}

// 暴露出方法，在路由中使用
module.exports = {
    getAllOrders: getAllOrders,
    addNewOrder:addNewOrder,
    findOrder:findOrder,
    updateOrder:updateOrder,
    removeOrder:removeOrder,
    getdiffOrders:getdiffOrders,
    arrangeDesigner:arrangeDesigner,
    designOrder:designOrder,
    financialConfirm:financialConfirm,
    arrangeOpera:arrangeOpera,
    afterSaleOrder:afterSaleOrder,
    getH5Orders:getH5Orders
}
