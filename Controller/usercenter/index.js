/**
 * @author fusitao
 * @name 用户表增删改查
 * @type userCenter
 */

const to = require('await-to-js').default
const { usercenter } = require('../../Model/usercenter/index')

const getAllUsers = async (ctx, next) => {
  // get 请求返回所有数据
    const req = ctx.request.body;
    const data = await usercenter.find({});
    let newdata = []
    if(req.startNum || req.pageSize){//说明是分页数据，返回分页
      newdata = data.slice(req.startNum, parseInt(req.startNum) + parseInt(req.pageSize))
    }else{//否则原样返回
      newdata = data.slice()
    }
    ctx.status = 200;
    ctx.body = {
      code: 0,
      msg: 'get request!!',
      data: newdata,
      recordsTotal: data.length
    }
}

// post 带一个 name 参数，并插入数据库
const addNewUsers = async (ctx, next) => {
    const req = ctx.request.body;
    let code = 0
    ctx.status = 200;
    if (!req.userID || typeof req.userID != 'string' || 
        !req.phone || typeof req.phone != 'string' ||
        !req.operaPeople || typeof req.operaPeople != 'string' ) {
      ctx.status = 401;
      ctx.body = {
        code: 0,
        msg: '必要字段缺失',
        desc: `parameter error！！name: ${req.userName}`,
        data: req
      }
      return;
    }
    let result = 'sucess'
    try{
       result = await usercenter.create({
        userID: req.userID,
        userName: req.userName,
        phone: req.phone,
        address: req.address,
        room: req.room,
        gender: req.gender,
        houseInfo: req.houseInfo,
        operaPeople: req.operaPeople,
        inputTime: req.inputTime,
        });
        code = 0
       //result = '保存成功, ' + newUser.save()
    } catch (error){
       code = -1
       result = error
    }
  
    ctx.body = {
      code,
      result
    }
  }

// 根据用户名查找用户
const findUser = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await usercenter.findOne(
      {$or:
        [
          {userName: req.userName},
          {phone: req.phone},
          {userID: req.userID}
        ]
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
// 根据用户名查找用户
const queryUserInfo = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await usercenter.findOne({userID: req.userID})
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

// 修改用户数据
// conditions: 查询条件；updateDoc：需要修改的数据, 都是一个对象
// multi (boolean)： 默认为false。是否更新多个查询记录。
const updateUser = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await usercenter.update(
      {
        userID: req.userID,
        userName: req.userName,
        phone: req.phone,
        address: req.address,
        room: req.room,
        gender: req.gender,
        houseInfo: req.houseInfo,
        operaPeople: req.operaPeople,
        inputTime: req.inputTime
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

// 删除用户数据
const removeUser = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await usercenter.remove(
      { userID: req.userID})
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

// 暴露出方法，在路由中使用
module.exports = {
    getAllUsers: getAllUsers,
    addNewUsers: addNewUsers,
    findUser: findUser,
    updateUser: updateUser,
    removeUser: removeUser,
    queryUserInfo: queryUserInfo
}
