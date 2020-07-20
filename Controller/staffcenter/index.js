/**
 * @author fusitao
 * @name 员工表增删改查
 * @type staffCenter
 */

const to = require('await-to-js').default
const { staffcenter } = require('../../Model/staffcenter/index')

const getAllStaffs = async (ctx, next) => {
  // get 请求返回所有数据
    const req = ctx.request.body;
    const data = await staffcenter.find({});
    ctx.status = 200;
    let newdata = []
    if(req.startNum || req.pageSize){//说明是分页数据，返回分页
      newdata = data.slice(req.startNum,parseInt(req.startNum) + parseInt(req.pageSize))
    }else{//否则原样返回
      newdata = data.slice()
    }
    ctx.body = {
      code: 0,
      msg: 'get request!!',
      data:newdata,
      recordsTotal: data.length
    }
}
const getDiffStaffs = async (ctx, next) => {
  // get 请求返回所有数据
    const req = ctx.request.body;
    const data = await staffcenter.find({
      staffType: req.staffType,
    });
    ctx.status = 200;
    ctx.body = {
      code: 0,
      msg: 'get request!!',
      data: {
            data: data,
          }
    }
}

// post 带一个 name 参数，并插入数据库
const addNewStaff = async (ctx, next) => {
    const req = ctx.request.body;
    ctx.status = 200;
    let code = 0
    if (!req.staffID || typeof req.staffID != 'string' || 
        !req.staffName || typeof req.staffName != 'string' ||
        !req.staffCode || typeof req.staffCode != 'string' ) {
      ctx.status = 401;
      ctx.body = {
        code: 0,
        msg: '必要字段缺失',
        desc: 'parameter error',
        data: req
      }
      return;
    }
    let result = 'sucess'
    // 通过实例化一个 User 对象在添加用户
    // const newUser = new staffcenter({
    //     fstname: req.name,
    // })
    try {
      let doc = await staffcenter.findOne({
        staffName: req.staffName
      })
      if(doc !== null){
        code = -1
        result = doc
      }
    } catch (err) {
      code = -2
      result = err
    }
    if(code == -1){
      ctx.body = {
        code: 0,
        msg: '改用户已经存在，请修改用户名',
        desc: 'insert failed!',
      }
      return
    }
    try{
       result = await staffcenter.create({
        staffID: req.staffID,
        staffName: req.staffName,
        staffCode: req.staffCode,
        staffRealName: req.staffRealName,
        staffPhone: req.staffPhone,
        staffType: req.staffType,
        loginTime: req.loginTime,
        });
       //result = '保存成功, ' + newUser.save()
    } catch (error){
       code = -1
       result = error
    }
    ctx.body = {
      code: 0,
      msg: '提交成功',
      desc: 'insert success!',
      result
    }
  }

// 根据用户名查找用户
const findStaff = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await staffcenter.findOne({$or:
      [
        {staffName: req.staffName},
        {staffPhone: req.staffPhone}
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

// 根据指定条件查找所有用户
// find指的是查找指定表的所有数据，返回的是数组
// findOne指的是查找指定表的单条数据，返回一个对象

// 修改用户数据
// conditions: 查询条件；updateDoc：需要修改的数据, 都是一个对象
// multi (boolean)： 默认为false。是否更新多个查询记录。
const updateStaff = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await staffcenter.update(
      {
        staffID: req.staffID,
        staffName: req.staffName,
        staffCode: req.staffCode,
        staffRealName: req.staffRealName,
        staffPhone: req.staffPhone,
        staffType: req.staffType,
        loginTime: req.loginTime,
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

// multi (boolean)： 默认为false。是否更新多个查询记录。
const changeStaffCode = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await staffcenter.update(
      {staffName: req.staffName, staffCode: req.oldCode},{$set:{"staffCode":req.staffCode}},false ,false)
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

// 删除用户数据
const removeStaff = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await staffcenter.remove(
      { staffID: req.staffID})
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
    getAllStaffs: getAllStaffs,
    addNewStaff: addNewStaff,
    findStaff: findStaff,
    updateStaff: updateStaff,
    removeStaff: removeStaff,
    getDiffStaffs: getDiffStaffs,
    changeStaffCode: changeStaffCode
}
