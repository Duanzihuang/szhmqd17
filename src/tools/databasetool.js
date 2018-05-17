/**
 * 该模块承上启下
 */
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId

exports.ObjectId = ObjectId

// Connection URL
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'szhmqd17'

/**
 * 暴露出去的公共方法，给所有的控制器都可以使用【查询列表的方法】
 * 参数1：你要操作的集合
 * 参数2：条件
 * 参数3：回调函数，操作完毕之后把结果返回给控制器
 */
exports.getList = (collectionName, params, callback) => {
    MongoClient.connect(url, function (err, client) {
        //获取到db对象
        const db = client.db(dbName);

        //获取要操作的collection
        const collection = db.collection(collectionName)

        // Find some documents
        collection.find(params).toArray(function (err, docs) {
            client.close();
            callback(err,docs) //[{},{}]
        });
    });
}

/**
 * 暴露出去的公共方法，给所有的控制器都可以使用【查询一个的方法】 //{}
 * 参数1：你要操作的集合
 * 参数2：条件
 * 参数3：回调函数，操作完毕之后把结果返回给控制器
 */
exports.getOne = (collectionName, params, callback) => {
    MongoClient.connect(url, function (err, client) {
        //获取到db对象
        const db = client.db(dbName);

        //获取要操作的collection
        const collection = db.collection(collectionName)

        //查询一个
        collection.findOne(params,(err,doc)=>{
            client.close();

            callback(err,doc)
        })
    })
}

/**
 * 暴露出去的公共方法，给所有的控制器都可以使用【插入一个的方法】 //{}
 * 参数1：你要操作的集合
 * 参数2：条件
 * 参数3：回调函数，操作完毕之后把结果返回给控制器
 */
exports.insertOne = (collectionName, params, callback) => {
    MongoClient.connect(url, function (err, client) {
        //获取到db对象
        const db = client.db(dbName);

        //获取要操作的collection
        const collection = db.collection(collectionName)

        //插入一个
        collection.insertOne(params,(err,result)=>{
            client.close();
            
            callback(err,result)
        })
    })
}

/**
 * 暴露出去的公共方法，给所有的控制器都可以使用【修改一个的方法】 //{}
 * 参数1：你要操作的集合
 * 参数2：条件
 * 参数3：回调函数，操作完毕之后把结果返回给控制器
 */
exports.updateOne = (collectionName, condition,params, callback) => {
    MongoClient.connect(url, function (err, client) {
        //获取到db对象
        const db = client.db(dbName);

        //获取要操作的collection
        const collection = db.collection(collectionName)

        //修改一个
        collection.updateOne(condition,{$set:params},(err,result)=>{
            client.close();
            
            callback(err,result)
        })
    })
}

/**
 * 暴露出去的公共方法，给所有的控制器都可以使用【修改一个的方法】 //{}
 * 参数1：你要操作的集合
 * 参数2：条件
 * 参数3：回调函数，操作完毕之后把结果返回给控制器
 */
exports.deleteOne = (collectionName, params, callback) => {
    MongoClient.connect(url, function (err, client) {
        //获取到db对象
        const db = client.db(dbName);

        //获取要操作的collection
        const collection = db.collection(collectionName)

        //删除一个
        collection.deleteOne(params,(err,result)=>{
            client.close();
            
            callback(err,result)
        })
    })
}