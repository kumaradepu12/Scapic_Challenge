
var db=require('./dbconnection');
var User=db.mongoConnect(function (err,db) {
    if(err) throw err;
    User=db.collection("user")

})
var jwt=require('jsonwebtoken')
var secrate_key="ScapicChallenge";
module.exports=function (router) {
    function verifytoken(req,res,next) {
        // console.log(req.headers)
        if(!req.headers['autherization']){
            res.status(401).send("UnAuthorized Request")
        }
        else{
            var token=req.headers.autherization;
            console.log(token)
            if(token===null || token===undefined){
                res.json({success:false,msg:"UnAuthorized Request"})
            }
            else{
                jwt.verify(token,secrate_key,function (err,decoded) {
                    if(err) {
                        res.json({success:false,msg:"UnAuthorized Request"})
                    }
                    else{
                        req.decoded=decoded
                        next()
                    }
                })

            }

        }



    }
    router.get('/me',verifytoken,function (req,res) {
        console.log("here")
        console.log(req.decoded)
        res.send(req.decoded)

    })
    router.post('/signup',function (req,res) {
    var user={
            _id:req.body.email,
            Name:req.body.firstName+" "+req.body.lastName,
            password:req.body.password
            }
        User.findOne({_id:user._id},function (err,exist) {
            if(err) throw err;
            if(exist){
                res.status(401).send({success:false,message:"User already existed"})
            }
            else{
                User.insertOne(user,function (err,inserted) {
                    if(err) throw err;
                    res.status(200).send({success:true,message:"Successfully registered"})
                })
            }
        })
    })
    router.post('/login',function (req,res) {
        console.log(req.body)
        User.findOne({_id:req.body.email},function (err,user) {
            if(err) throw err;
            if(user){
                if(user.password===req.body.password){
                    token=jwt.sign(user,secrate_key)
                    res.status(200).send({token})
                }
                else res.status(401).send({msg:"Password does not match"})
            }
            else{
                res.status(401).send({msg:"User does not registered"})
            }


        })
    })




    return router
    
}