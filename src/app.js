//导入
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

//create app
const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Use the session middleware
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 10*60000 }}))

//设置内置中间件，对我们的静态资源进行处理
app.use(express.static(path.join(__dirname,"statics")))

//在app.js对浏览器的请求分开处理
const accountRouter = require(path.join(__dirname,'./routers/accountRouter.js'))
app.use('/account',accountRouter)

const studentManagerRouter = require(path.join(__dirname,'./routers/studentManagerRouter.js'))
app.use('/studentmanager',studentManagerRouter)

//启动
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }

    console.log("start OK")
})