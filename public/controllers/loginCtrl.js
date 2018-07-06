angular.module('LoginCtrl',['appRoutes','AuthServices'])
.controller('loginctrl',function ($routeParams, $location, $window, $scope,Authtoken) {
    console.log("angular.module('LoginCtrl',['appRoutes','AuthServices'])\n" +
        ".controller('loginctrl',function ($routeParams, $location, $window, $scope,Authtoken) {\n" +
        "    if($window.location.pathname==='loginfailed'){\n" +
        "        $location.path('/')\n" +
        "    }\n" +
        "    else\n" +
        "    {\n" +
        "\n" +
        "        console.log(\"*******************************\")\n" +
        "        Authtoken.settoken($routeParams.token)\n" +
        "        setTimeout(function () {\n" +
        "            $location.path('/profile')\n" +
        "        },1000)\n" +
        "    }\n" +
        "\n" +
        "})")
    if($window.location.pathname==='loginfailed'){
        $location.path('/')
    }
    else
    {

        console.log("*******************************")
        Authtoken.settoken($routeParams.token)
        setTimeout(function () {
            $location.path('/profile')
        },1000)
    }

})