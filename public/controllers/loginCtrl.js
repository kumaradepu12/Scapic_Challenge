angular.module('LoginCtrl',['appRoutes','AuthServices'])
.controller('loginctrl',function ($routeParams, $location, $window, $scope,Authtoken) {
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