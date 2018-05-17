//导入express
const express = require('express')
const path = require('path')

const studentManagerRouter = express.Router()

//导入控制器
const studentManagerCTRL = require(path.join(__dirname,"../controllers/studentManagerController.js"))

//处理具体的请求
studentManagerRouter.get('/list',studentManagerCTRL.getStudentListPage)

module.exports = studentManagerRouter
