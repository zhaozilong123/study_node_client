/**
 * @author fusitao
 * @name 通用接口代码，包括登陆登出，修改密码等
 * @type common
 */

const { staffcenter } = require('../../Model/staffcenter/index')


// 管理员登陆
const adminStaff = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;

  try {
    let doc = await staffcenter.find({
      staffName: req.userName,
      staffType: '管理员',
      staffCode: req.userCode
    })
    if(doc && doc.length > 0){
      code = 0
      result = doc
    }else{
      code = -1
      result = '查找失败'
    }
  } catch (err) {
    code = -1
    result = '查找失败： ' + err
  }

  ctx.response.body = {
    code,
    result
  }
  return result
}

// 普调员工登陆
const commonStaff = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;

  try {
    let doc = await staffcenter.find({
      staffName: req.userName,
      staffCode: req.userCode
    })
    if(doc && doc.length > 0){
      code = 0
      result = doc
    }else{
      code = -1
      result = '查找失败'
    }
  } catch (err) {
    code = -1
    result = '查找失败： ' + err
  }

  ctx.response.body = {
    code,
    result
  }
  return result
}



// 暴露出方法，在路由中使用
module.exports = {
  adminStaff: adminStaff,
  commonStaff:commonStaff
}
