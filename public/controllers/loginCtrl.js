angular.module('LoginCtrl',['appRoutes'])
.controller('loginctrl',function ($routeParams, $location, $window, $scope) {
    console.log("*******************************")
    console.log($routeParams.token)
    // $location.url('/profile')
})