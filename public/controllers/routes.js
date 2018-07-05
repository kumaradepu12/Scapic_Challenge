var app=angular.module('appRoutes',['ngRoute'])
    .config(function ($routeProvider,$locationProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'index.html'
            })
            .when('/google/:token',{
                templateUrl:'profile.html',
                controller:"loginctrl"
            })
            .when('/profile',{
                templateUrl:'profile.html',
            })
            .when('/signup',{
                templateUrl:'signup.html',
                controller:'signupCtrl'
            })
            .otherwise('/')
        $locationProvider.html5Mode(true);

        // $locationProvider.html5Mode({enable:true, requireBase:false})

    })