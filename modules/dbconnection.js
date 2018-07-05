var MongoClient=require('mongodb').MongoClient;
var url="mongodb://localhost:27017/Scapic";
var connect = function (cb)
{
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db) {
        cb(err,db);
    })
}
module.exports={mongoConnect:connect};
