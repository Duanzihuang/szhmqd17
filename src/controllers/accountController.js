const path = require('path')
const captchapng = require('captchapng')

/**
 * 暴露的返回登录页面的方法 
 */
exports.getLoginPage = (req, res) => {
    /**
    fs.readFile(path.join(__dirname,"../statics/views/login.html"),(err,data)=>{
        res.setHeader("Content-Type","text/html;charset=utf-8")
        res.end(data)
    })
     */
    res.sendFile(path.join(__dirname, "../statics/views/login.html"))
}

/**
 * 暴露一个返回图片验证码的方法
 */
exports.getVcodeImage = (req, res) => {
    /**
     * 在这里生成一张带有数字的图片，并且通过res返回给浏览器
     */
    var p = new captchapng(80, 30, parseInt(Math.random() * 9000 + 1000)); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

/**
 * 暴露的返回注册页面的方法 
 */
exports.getRegisterPage = (req,res)=>{
    res.sendFile(path.join(__dirname, "../statics/views/register.html"))
}