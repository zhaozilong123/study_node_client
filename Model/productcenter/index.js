/**
 * ProductCenter_Shema
 * fusitao
 * 2019/03/13
 */

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const ProductCenter_Shema = new Schema({
    productID: {
        type: String,
        require: true,
    },
    productName: {
        type: String,
        require: true,
    },
    productPrice: {
        type: String,
        require: true,
    },
    creatTime: {
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

ProductCenter_Shema.plugin(AutoIncrement, {inc_field: 'product_id'})

module.exports = {
    productcenter: mongoose.model('productcenter', ProductCenter_Shema),
    ProductCenter_Shema
}
