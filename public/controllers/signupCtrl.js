angular.module('SignupCtrl',['appRoutes'])
    .controller('signupCtrl',function ($scope,$http,$location) {
        $scope.user={
            firstName:"Kumar",
            lastName:"Adepu",
            email:"kmr@gmail.com",
            password:"123"
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
                    setTimeout(function () {
                        console.log("Redirecting to Login Page")
                        $location.path('/')

                    },100)
                }


            },function (err) {
                console.log(err)

            })

        }

    })