var app=angular.module('scapicCtrl',['AuthServices'])
    .controller("scapicctrl",function ($window,$scope,$http,$location,Auth,Authtoken) {
        $scope.$on('$routeChangeStart', function(event,next,current) {
            if(Auth.isLoggedin()){
                Auth.getuser().then(function (data) {
                    console.log(data)
                    if(data.success!==false) {
                        console.log("GETUSER")
                        $scope.user = {
                            email: data._id,
                            Name: data.Name,
                        }
                        $scope.user.pic=(data.pic)?data.pic:'images/person.png'
                    }
                    else{
                        Authtoken.settoken()
                        console.log("Not Valid User")
                        $location.path('/')
                    }

                })
            }
            else console.log(Auth.isLoggedin())


        })

        $scope.googleLogin=function () {
            $window.location=$window.location.protocol + '//' + $window.location.host + '/auth/google';

        }
        $scope.facebookLogin=function(){
            $window.location=$window.location.protocol+'//'+$window.location.host+'/auth/facebook';
        }
        $scope.login=function (user) {
            console.log(user)
            $http.post('/api/login',user).then(function (response) {
                if(response.status===200)
                {
                    $scope.clas="alert-success"
                    Authtoken.settoken(response.data.token)
                    $location.path('/profile')
                }
                else {
                    $scope.class="alert-danger"
                    $scope.msg=response.data.msg
                }
            },function (err) {
                throw err;

            })

        }
        $scope.signup=function (user) {
            console.log(user)
            $http.post('/api/signup',user).then(function (response) {
                if(response.status===200){
                    $scope.class="alert-success"
                    $scope.status=response.data.message
                    console.log("Redirecting to Login Page")
                    $location.path('/')
                }
                else {
                    $scope.class="alert-warning"
                    $scope.status=response.data.message
                }

            },function (err) {
                console.log(err)

            })

        }
    })
