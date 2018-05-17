const xtpl = require('xtpl')
const path = require('path')
const databasetool = require(path.join(__dirname, "../tools/databasetool.js"))

//导出返回学生列表的页面
exports.getStudentListPage = (req, res) => {
    const keyword = req.query.keyword || ""

    databasetool.getList("studentInfo", { name: { $regex: keyword } }, (err, docs) => {
        //利用模版引擎渲染页面，并且最终返回给浏览器去呈现
        xtpl.renderFile(path.join(__dirname, "../statics/views/list.html"), {
            students: docs,
            keyword,
            loginedName:req.session.loginedName
        }, function (error, content) {
            res.send(content)
        });
    })
}

//返回新增学生页面
exports.getAddStudentPage = (req,res)=>{
    //利用模版引擎渲染页面，并且最终返回给浏览器去呈现
    xtpl.renderFile(path.join(__dirname, "../statics/views/add.html"), {
        loginedName:req.session.loginedName
    }, function (error, content) {
        res.send(content)
    });
}

//新增学生操作
exports.addStudent = (req,res)=>{
    databasetool.insertOne("studentInfo",req.body,(err,result)=>{
        if(err){//插入失败
            res.setHeader("Content-Type","text/html;charset=utf-8")
            res.end("<script>alert('插入失败')</script>")
        }else{//插入成功
            res.send("<script>window.location.href='/studentmanager/list'</script>")
        }   
    })
}

//返回修改学生的页面
exports.getEditStudentPage = (req,res)=>{
    const studentId = databasetool.ObjectId(req.params.studentId)

    databasetool.getOne("studentInfo",{_id:studentId},(err,doc)=>{
        xtpl.renderFile(path.join(__dirname,"../statics/views/edit.html"),{
            studentInfo:doc,
            loginedName:req.session.loginedName
        },(err,content)=>{
            res.send(content)
        })
    })
}

//修改学生信息
exports.editStudent = (req,res)=>{
    const studentId = databasetool.ObjectId(req.params.studentId)

    databasetool.updateOne('studentInfo',{_id:studentId},req.body,(err,result)=>{
        if(err){//修改失败
            res.setHeader("Content-Type","text/html;charset=utf-8")
            res.end("<script>alert('修改失败')</script>")
        }else{//修改成功
            res.send("<script>window.location.href='/studentmanager/list'</script>")
        }   
    })
}

//删除学生信息
exports.deleteStudent = (req,res)=>{
    const studentId = databasetool.ObjectId(req.params.studentId)

    databasetool.deleteOne('studentInfo',{_id:studentId},(err,result)=>{
        if(err){//删除失败
            res.setHeader("Content-Type","text/html;charset=utf-8")
            res.end("<script>alert('删除失败')</script>")
        }else{//删除成功
            res.send("<script>window.location.href='/studentmanager/list'</script>")
        }   
    })
}