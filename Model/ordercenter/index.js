/**
 * OrderCenter_Shema
 * fusitao
 * 2019/03/13
 */

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const OrderCenter_Shema = new Schema({
    orderID: {
        type: String,
        require: true,
    },
    orderStatus: {
        type: String,
        require: true,
    },
    creatTime: {
        type: String,
        require: true,
    },
    creatPeople: {
        type: String,
        require: true,
    },
    designTime: {
        type: String,
        require: false,
    },
    designPeople: {
        type: String,
        require: false,
    },
    firstprice: {
        type: String,
        require: false,
    },
    productInfo: {
        type: String,
        require: false,
    },
    contractNum: {
        type: String,
        require: false,
    },
    totalPrice: {
        type: String,
        require: false,
    },
    operateTime: {
        type: String,
        require: false,
    },
    operatePeople: {
        type: String,
        require: false,
    },
    overTime: {
        type: String,
        require: false,
    },
    meta: {
        createAt: {
        type: Date,
        default: Date.now()
        },
        updateAt: {
        type: Date,
        default: Date.now()
        },
        deleteAt: {
        type: Date,
        default: Date.now()
        },
    },
})

OrderCenter_Shema.plugin(AutoIncrement, {inc_field: 'id'})

module.exports = {
    ordercenter: mongoose.model('ordercenter', OrderCenter_Shema),
    OrderCenter_Shema
}
