var app=angular.module('appRoutes',['ngRoute'])
    .config(function ($routeProvider,$locationProvider) {
        $routeProvider
            .when('/',{
                templateUrl:'index.html'
            })
            .when('/google/:token',{
                templateUrl:'sample.html',
                controller:"loginctrl"
            })
            .when('/facebook/:token',{
                templateUrl:'sample.html',
                controller:"loginctrl"
            })
            .when('/profile',{
                templateUrl:'profile.html',
            })
            .when('/signup',{
                templateUrl:'signup.html',
            })
            .otherwise('/')
        $locationProvider.html5Mode(true);

        // $locationProvider.html5Mode({enable:true, requireBase:false})

    })
app.run(['$rootScope','Auth','$location',function ($rootScope,Auth,$location) {
    $rootScope.$on('$routeChangeStart',function (event,next,current) {
        if(Auth.isLoggedin()){
            console.log("here")
            $location.path('/profile')
        }
        else $location.path('/')

    })

}])