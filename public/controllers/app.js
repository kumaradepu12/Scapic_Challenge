var app=angular.module('scapic',['appRoutes','scapicCtrl','LoginCtrl','AuthServices'])

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptors')

    })