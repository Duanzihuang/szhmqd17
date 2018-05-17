//导入express
const express = require('express')
const path = require('path')

const studentManagerRouter = express.Router()

//导入控制器
const studentManagerCTRL = require(path.join(__dirname,"../controllers/studentManagerController.js"))

//处理具体的请求
//获取学生列表
studentManagerRouter.get('/list',studentManagerCTRL.getStudentListPage)

//获取新增页面
studentManagerRouter.get('/add',studentManagerCTRL.getAddStudentPage)

//新增学生信息
studentManagerRouter.post('/add',studentManagerCTRL.addStudent)

//获取修改页面
studentManagerRouter.get('/edit/:studentId',studentManagerCTRL.getEditStudentPage)

//修改学生信息
studentManagerRouter.post('/edit/:studentId',studentManagerCTRL.editStudent)

//删除学生信息
studentManagerRouter.get('/delete/:studentId',studentManagerCTRL.deleteStudent)

module.exports = studentManagerRouter
