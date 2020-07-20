/**
 * UserCenter_Shema
 * fusitao
 * 2019/03/13
 */

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const UserCenter_Shema = new Schema({
    userID: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        require: false,
    },
    phone: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: false,
    },
    room: {
        type: String,
        require: false,
    },
    gender: {
        type: String,
        require: false,
    },
    houseInfo: {
        type: String,
        require: false,
    },
    operaPeople: {
        type: String,
        require: true,
    },
    inputTime: {
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

UserCenter_Shema.plugin(AutoIncrement, {inc_field: 'user_id'})

module.exports = {
    usercenter: mongoose.model('usercenter', UserCenter_Shema),
    UserCenter_Shema
}
