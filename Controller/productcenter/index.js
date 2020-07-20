/**
 * @author fusitao
 * @name 用户表增删改查
 * @type productCenter
 */

const to = require('await-to-js').default
const { productcenter } = require('../../Model/productcenter/index')

const getAllProducts = async (ctx, next) => {
  // get 请求返回所有数据
    const req = ctx.request.body;
    const data = await productcenter.find({});
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
        recordsTotal: data.length
    }
}

// post 带一个 name 参数，并插入数据库
const addNewProduct = async (ctx, next) => {
    const req = ctx.request.body;
    ctx.status = 200;
    if (!req.productID || typeof req.productID != 'string' || 
        !req.productName || typeof req.productName != 'string' ||
        !req.productPrice || typeof req.productPrice != 'string' ) {
      ctx.status = 401;
      ctx.body = {
        msg: '必要字段缺失',
        desc: `parameter error！！name: ${req.productName}`,
        data: req
      }
      return;
    }
    let result = 'sucess'
    // 通过实例化一个 Product 对象在添加用户
    // const newProduct = new productcenter({
    //     fstname: req.name,
    // })
    try{
       result = await productcenter.create({
        productID: req.productID,
        productName: req.productName,
        productPrice: req.productPrice,
        creatTime: req.creatTime
        });
       //result = '保存成功, ' + newProduct.save()
    } catch (error){
       result = error
    }
  
    ctx.body = {
      code: 0,
      msg: '提交成功',
      desc: 'insert success!',
      data: {
          code : 0,
          msg: result,
      }
    }
  }

// 根据用户名查找用户
const findProduct = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await productcenter.findOne({
      productID: req.productID
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
const updateProduct = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await productcenter.update(
      {
        productID: req.productID,
        productName: req.productName,
        productPrice: req.productPrice,
        creatTime: req.creatTime
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
const removeProduct = async (ctx) => {
  let code = 0 // 状态码
  let result = '' // 返回内容
  const req = ctx.request.body;
  try {
    let doc = await productcenter.remove(
      { productID: req.productID})
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
    getAllProducts: getAllProducts,
    addNewProduct: addNewProduct,
    findProduct: findProduct,
    updateProduct: updateProduct,
    removeProduct: removeProduct
}
