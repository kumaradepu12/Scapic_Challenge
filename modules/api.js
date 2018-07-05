
var db=require('./dbconnection');
var User=db.mongoConnect(function (err,db) {
    if(err) throw err;
    User=db.collection("user")

})
module.exports=function (router) {


    router.post('/signup',function (req,res) {

    var user={
            _id:req.body.email,
            Name:req.body.firstName+" "+req.body.lastName,
            password:req.body.password
    }
        User.findOne({_id:user._id},function (err,exist) {
            if(err) throw err;
            if(exist){
                res.json({success:false,message:"User already existed"})
            }
            else{
                User.insertOne(user,function (err,inserted) {
                    if(err) throw err;
                    res.json({success:true,message:"Successfully registered"})

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
                    res.json({success:true,user:user})
                }
                else res.json({success:false,msg:"Password does not match"})
            }
            else{
                res.json({success:false,msg:"User does not registered"})
            }


        })
    })


    return router
    
}