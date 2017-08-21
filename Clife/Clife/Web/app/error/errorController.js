(function (angular) {
    'use strict';

    angular.module('tyessApp')

        .controller('errorController', function ($scope, $window) {

            console.log('test Error');

            $scope.test = function () {

                alert('asasfasf');
            }

            //$window.location.href = 'error.html';
        });

})(window.angular);