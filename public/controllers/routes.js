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
            .when('/loginfailed',{
                templateUrl:'sample.html',
                controller:"loginctrl"
            })
            .otherwise('/')
        $locationProvider.html5Mode(true);

        // $locationProvider.html5Mode({enable:true, requireBase:false})

    })
app.run(['$rootScope','Auth','$location',function ($rootScope,Auth,$location) {
    $rootScope.$on('$routeChangeStart',function (event,next,current) {
        if(Auth.isLoggedin()){
            console.log("when('/',{\n" +
                "                templateUrl:'index.html'\n" +
                "            })\n" +
                "            .when('/google/:token',{\n" +
                "                templateUrl:'sample.html',\n" +
                "                controller:\"loginctrl\"\n" +
                "            })\n" +
                "            .when('/facebook/:token',{\n" +
                "                templateUrl:'sample.html',\n" +
                "                controller:\"loginctrl\"\n" +
                "            })\n" +
                "            .when('/profile',{\n" +
                "                templateUrl:'profile.html',\n" +
                "            })\n" +
                "            .when('/signup',{\n" +
                "                templateUrl:'signup.html',\n" +
                "            })\n" +
                "            .when('/loginfailed',{\n" +
                "                templateUrl:'sample.html',\n" +
                "                controller:\"loginctrl\"\n" +
                "            })")
            $location.path('/profile')
        }
        else $location.path('/')

    })

}])