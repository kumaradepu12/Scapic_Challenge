var db=require('./dbconnection')
var GoogleStrategy=require('passport-google-oauth').OAuth2Strategy
var jwt=require('jsonwebtoken')
var session=require('express-session')
var secrate_key="ScapicChallenge"
var config=require('../config')
var User=null;
var token=null;
db.mongoConnect(function (err,db) {
    if(err) throw err;
    User=db.collection("user");

})
module.exports=function (app,passport) {

    app.use(passport.initialize())
    app.use(passport.session());
    app.use(session({ secret: secrate_key, resave: false, saveUninitialized: true, cookie: { secure: false } }));

    passport.serializeUser(function (user,done) {
        return done(null,user)

    })
    passport.deserializeUser(function (id,done) {
        return done(null,id)

    })

    passport.use(new GoogleStrategy({
        clientID: config.Google.clientID,
        clientSecret: config.Google.clientSecret,
        callbackURL: config.Google.callbackURL,
        profileFields: ['id', 'displayName', 'photos', 'email'],
        status:true
    },function(accessToken, refreshToken, profile, done) {
            var pro=profile._json
            var person={
                _id:pro.emails[0].value,
                Name:pro.displayName,
                pic:pro.image.url,
                gender:pro.gender
            }
            User.findAndModify({_id:person._id},[],{$set:person},{upsert:true,new:true},function (err,user) {
                console.log(user.value)
                token=jwt.sign(user.value,secrate_key)
                return done(null,user.value)

            })
    }))

    app.get('/auth/google',passport.authenticate('google', { scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ] }),(req,res)=>{});
    app.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/loginfailed' }),function (err,res) {
        res.redirect('/google/'+token);

    })
    return passport;

}