var app=angular.module('scapicCtrl',[])
    .controller("scapicctrl",function ($window,$scope,$http,$location) {

        $scope.googleLogin=function () {
            $window.location=$window.location.protocol + '//' + $window.location.host + '/auth/google';

        }
        $scope.facebookLogin=function(){
            $window.location=$window.location.protocol+'//'+$window.location.host+'/auth/facebook';
        }
        $scope.login=function (user) {
            console.log(user)
            $http.post('/api/login',user).then(function (response) {
                $scope.check=true;
                if(!response.data.success){
                    $scope.class="alert-danger"
                    $scope.msg=response.data.msg
                }
                else{
                    $scope.clas="alert-success"
                    $location.path('/profile')
                }
            },function (err) {
                throw err;

            })

        }
        $scope.signup=function (user) {
            console.log(user)
            $http.post('/api/signup',user).then(function (response) {
                console.log(response.data)
                $scope.check=true
                if(!response.data.success){
                    $scope.class="alert-warning"
                    $scope.status=response.data.message
                }
                else{
                    $scope.class="alert-success"
                    $scope.status=response.data.message
                    console.log("Redirecting to Login Page")
                    $location.path('/')

                }


            },function (err) {
                console.log(err)

            })

        }
    })
