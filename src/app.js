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

/**
 * all代表包含所有的方法 ，比如GET/POST/PUT/DELETE
 * * 是代表所有的url
 * 
 * next 控制你是否能继续访问，如果调用了，就能访问，如果没有调用，就不能再往下走了
 */
app.all("*",(req,res,next)=>{
    if(req.url.includes("studentmanager")){
        if(req.session.loginedName){//登陆了
            next()
        }else{
            res.send("<script>alert('请先登录!');window.location='/account/login'</script>")
        }
    }else{//除开学生管理
        next()
    }
})

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