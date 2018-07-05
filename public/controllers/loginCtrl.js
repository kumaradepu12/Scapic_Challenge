angular.module('LoginCtrl',['appRoutes'])
.controller('loginctrl',function ($routeParams, $location, $window, $scope) {
    if($window.location.pathname==='loginfailed'){
        $location.path('/')
    }
    else
    {
            console.log("*******************************")
        console.log($routeParams.token)
        $location.path('/profile')
    }

})