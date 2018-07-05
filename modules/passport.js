var db=require('./dbconnection')
var jwt=require('jsonwebtoken')
var session=require('express-session')
var secrate_key="ScapicChallenge"
var config=require('../config')
var User=null;
var token=null;
var GoogleStrategy=require('passport-google-oauth').OAuth2Strategy,
    FacebookStrategy=require('passport-facebook').Strategy
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

    passport.use(new FacebookStrategy({
        clientID        : config.Facebook.clientID,
        clientSecret    : config.Facebook.clientSecret,
        callbackURL     : config.Facebook.callbackURL
    },function (accessToken,refreshToken,profile,done) {
        console.log(profile)
        return done(null,profile)

    }))

    app.get('/auth/google',passport.authenticate('google', { scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ] }),(req,res)=>{});
    app.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/loginfailed' }),function (err,res) {
        res.redirect('/google/'+token);

    })

    app.get('/auth/facebook',passport.authenticate('facebook'))
    app.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect:'/loginfailed'}),function (err,res) {
        res.redirect('/facebook/'+token)

    })
    return passport;

}