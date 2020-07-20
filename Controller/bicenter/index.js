/**
 * @author fusitao
 * @name 业绩查询查询
 * @type BICenter
 */

const to = require('await-to-js').default
const { ordercenter } = require('../../Model/ordercenter/index')

const findBIDataByType = async (ctx, next) => {
  // get 请求返回所有数据
    let code = 0 // 状态码
    let result = '' // 返回内容
    const req = ctx.request.body
    try {
      let doc = []
      if(req.staffType === '销售员'){
        doc = await ordercenter.find({
          creatTime : {'$gte' : new Date(req.dateTime[0]).getTime(), '$lte' : new Date(req.dateTime[1]).getTime()}
        },{orderID:1, orderStatus:1, creatTime:1, creatPeople:1})
      }else if(req.staffType === '设计师'){
        doc = await ordercenter.find({
          designTime : {'$gte' : new Date(req.dateTime[0]).getTime(), '$lte' : new Date(req.dateTime[1]).getTime()}
        },{orderID:1, orderStatus:1, designTime:1, designPeople:1})
      }else if(req.staffType === '售后员'){
        doc = await ordercenter.find({
          operateTime : {'$gte' : new Date(req.dateTime[0]).getTime(), '$lte' : new Date(req.dateTime[1]).getTime()}
        },{orderID:1, orderStatus:1, operateTime:1, operatePeople:1})
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


// 根据用户名查找用户
const findBIDataByOne = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = []
    if(req.staffType === '销售员'){
      doc = await ordercenter.find({
        creatPeople: req.staffName,
        creatTime : {'$gte' : new Date(req.dateTime[0]).getTime(), '$lte' : new Date(req.dateTime[1]).getTime()}
      },{orderID:1, orderStatus:1, creatTime:1, creatPeople:1})
    }else if(req.staffType === '设计师'){
      doc = await ordercenter.find({
        designPeople: req.staffName,
        designTime : {'$gte' : new Date(req.dateTime[0]).getTime(), '$lte' : new Date(req.dateTime[1]).getTime()}
      },{orderID:1, orderStatus:1, designTime:1, designPeople:1})
    }else if(req.staffType === '售后员'){
      doc = await ordercenter.find({
        operatePeople: req.staffName,
        operateTime : {'$gte' : new Date(req.dateTime[0]).getTime(), '$lte' : new Date(req.dateTime[1]).getTime()}
      },{orderID:1, orderStatus:1, operateTime:1, operatePeople:1})
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
  findBIDataByType,
  findBIDataByOne,
}
