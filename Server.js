var express=require('express')
var app=express();
var bodyParser=require('body-parser')
var port=process.env.PORT || 8000
var passport=require('passport')
var path=require('path')

var router=express.Router();
var passport=require('./modules/passport')(app,passport)
var appRoutes=require('./modules/api')(router)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'views')))
app.use('/api',appRoutes)

app.get('/*',function (req,res) {

    console.log("******************8")
    res.sendFile(path.join(__dirname,'views/index.html'))

})

app.listen(port,()=>{
    console.log("Server is Running on "+port)
})