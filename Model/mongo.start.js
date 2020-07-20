/**
 * mongo start
 */

const mongoose = require('mongoose')
const dbConfig = require('../Config/dbConfig')
const MONGO_DB_URL = dbConfig.mongoUrl[process.env.NODE_ENV] || 'development'

module.exports = () => new Promise((resolve, reject) => {
    mongoose.connect(MONGO_DB_URL, { 
        useCreateIndex: true,
        useNewUrlParser: true 
    })

    // 连接成功
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connection connected');
        resolve(mongoose.connections)
    })

    // 连接失败
    mongoose.connection.on('error', error => {
        console.log('Mongoose connection error')
        reject(error)
    })

    // 断开连接
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection disconnected');
        reject('Mongoose connection disconnected')
    })
})
