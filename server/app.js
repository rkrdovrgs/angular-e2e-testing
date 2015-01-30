var app = angular.module('app', []);

app.controller('TestCtrl', function ($scope, $http) {
    $scope.firstName = '';

    $scope.users = [];

    $http.get('/api/users.json').success(function (data) {
        angular.copy(data, $scope.users)
    });

});