/**
 * StaffCenter_Shema
 * fusitao
 * 2019/03/13
 */

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose)
const Schema = mongoose.Schema

const StaffCenter_Shema = new Schema({
    staffID: {
        type: String,
        require: true,
    },
    staffName: {
        type: String,
        require: true,
    },
    staffCode: {
        type: String,
        require: true,
    },
    staffRealName: {
        type: String,
        require: false,
    },
    staffPhone: {
        type: String,
        require: true,
    },
    staffType: {
        type: String,
        require: true,
    },
    loginTime: {
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

StaffCenter_Shema.plugin(AutoIncrement, {inc_field: 'staff_id'})

module.exports = {
    staffcenter: mongoose.model('staffcenter', StaffCenter_Shema),
    StaffCenter_Shema
}
