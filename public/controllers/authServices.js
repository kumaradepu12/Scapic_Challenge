angular.module('AuthServices',[])
.factory('Auth',function ($http,$window,Authtoken,$q,AuthInterceptors) {
    var authfactory={};
    authfactory.isLoggedin=function () {
        if(Authtoken.gettoken()){
           return true;
        }
        else return false

    }
    authfactory.getuser=function () {
        if(Authtoken.gettoken()){
            return $http.get('/api/me').then(function (response) {
                return response.data
            })
        }
        else $q.reject({message:"User has no token"})

    }
    return authfactory

})
.factory('Authtoken',function ($window) {
    var authtokenfactory={};
    authtokenfactory.settoken=function (token) {
        if(token)
            $window.localStorage.setItem('token',token)
        else $window.localStorage.removeItem('token')

    }
    authtokenfactory.gettoken=function () {
        return $window.localStorage.getItem('token')

    }
    return authtokenfactory

})
.factory('AuthInterceptors',function (Authtoken) {
    var authinterseptorsfactory={};
    authinterseptorsfactory.request=function (config) {
        var token=Authtoken.gettoken()
        if(token)
        {
            config.headers['Autherization']=token
        }
        return config;


    }
    return authinterseptorsfactory;

})