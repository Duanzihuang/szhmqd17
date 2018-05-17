//导入
const express = require('express')
const path = require('path')

//创建路由对象
const accountRouter = express.Router()

//导入accountControl控制器
const accountCtrl = require(path.join(__dirname,"../controllers/accountController.js"))

//接收到请求，然后交给与我们这个路由对应的控制器处理
//处理浏览器想要登录页面
accountRouter.get('/login',accountCtrl.getLoginPage)

//处理浏览器想要图片验证码
accountRouter.get('/vcode',accountCtrl.getVcodeImage)

//处理浏览器想要注册页面
accountRouter.get('/register',accountCtrl.getRegisterPage)

//处理浏览器注册用户的请求
accountRouter.post('/register',accountCtrl.register)

//处理浏览器用户的登录请求
accountRouter.post('/login',accountCtrl.login)

//导出
module.exports = accountRouter