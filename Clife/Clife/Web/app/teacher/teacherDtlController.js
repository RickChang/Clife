(function (angular) {
    'use strict';

    angular.module('tyessApp')

        .controller('teacherDtlController', function ($scope, $http, $routeParams, getService, postService, putService) {

            var params = $routeParams;
            console.log(params);

            $scope.item = null;

            if (params.teacherID != "0")
            {
                //$http({
                //    method: 'GET',
                //    url: "http://localhost:64165/api/Teacher/" + params.teacherID
                //}).success(function (response) {
                //    $scope.item = response;
                //});
                getService.GetData("Teacher/" + params.teacherID)
                    .success(function (response) {
                        $scope.item = response;
                        //console.log(response);
                    })
                    .error(function (data, status, headers, config) {
                        alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    });
            }

            //console.log($scope.item);

            $scope.save = function () {
                var data = $.param({
                    teacherID: params.teacherID, teacherName: $scope.item.teacherName, pid: $scope.item.pid
                });

                if (params.teacherID === "0") {
                    postService.PostData("Teacher", data)
                        .success(function () {
                            alert("insert success");
                        })
                        .error(function (data, status, headers, config) {
                            alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                        });
                }
                else {
                    putService.PutData("Teacher/" + params.teacherID, data)
                        .success(function () {
                            alert("Update success");
                        })
                        .error(function (data, status, headers, config) {
                            alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                        });
                }

            };
            
        })

})(window.angular);