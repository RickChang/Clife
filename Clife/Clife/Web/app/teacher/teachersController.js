(function (angular) {
    'use strict';

    angular.module('tyessApp')

        .controller('teachersController', function ($scope, $http, getService, postService, errorHandle, selectItemService) {

            $scope.members = [
                { menID: '1', memName: '督導1' }, { menID: '2', memName: '督導2' },
                { menID: '3', memName: '督導3' }, { menID: '4', memName: '督導4' }
            ];
            
            $scope.dataTeachers = [
                { teacherID: '1', teacherName: 'IC 1', memName: '督導1', unBack: '3', du: '402.2', df: '161.2/49', pRate: '40.1%', c: '33.0', meeting: '6.2', d: '2.9', other: '1.0', total: '48.3' },
                { teacherID: '2', teacherName: 'IC 2', memName: '督導2', unBack: '2', du: '431.8', df: '146.2/27', pRate: '33.8%', c: '41.1', meeting: '4.2', d: '4.0', other: '2.0', total: '55.1' },
                { teacherID: '2', teacherName: 'IC 3', memName: '督導1', unBack: '4', du: '809.3', df: '323.9/59', pRate: '56.1%', c: '25.6', meeting: '6.8', d: '2.3', other: '1.0', total: '62.1' },
                { teacherID: '2', teacherName: 'IC 4', memName: '督導3', unBack: '5', du: '606.7', df: '207.1/42', pRate: '62.3%', c: '63.2', meeting: '8.0', d: '3.0', other: '1.0', total: '55.0' },
                { teacherID: '2', teacherName: 'IC 5', memName: '督導3', unBack: '1', du: '577.3', df: '392.3/42', pRate: '66.1%', c: '44.1', meeting: '3.4', d: '1.9', other: '1.0', total: '34.1' },
                { teacherID: '2', teacherName: 'IC 6', memName: '督導1', unBack: '2', du: '589.4', df: '152.6/32', pRate: '93.3%', c: '33.9', meeting: '5.5', d: '5.0', other: '1.0', total: '57.3' },
                { teacherID: '2', teacherName: 'IC 7', memName: '督導2', unBack: '4', du: '371.5', df: '277.8/32', pRate: '12.5%', c: '45.0', meeting: '1.8', d: '5.9', other: '3.0', total: '52.9' },
                { teacherID: '2', teacherName: 'IC 8', memName: '督導3', unBack: '3', du: '488.3', df: '462.5/67', pRate: '44.5%', c: '65.0', meeting: '6.2', d: '1.4', other: '2.0', total: '43.9' },
                { teacherID: '2', teacherName: 'IC 9', memName: '督導2', unBack: '4', du: '631.4', df: '221.4/62', pRate: '64.7%', c: '35.7', meeting: '8.1', d: '2.4', other: '1.0', total: '50.8' },
                { teacherID: '2', teacherName: 'IC 10', memName: '督導4', unBack: '5', du: '495.0', df: '310.8/28', pRate: '52.4%', c: '56.2', meeting: '4.0', d: '4.1', other: '1.0', total: '46.2' },
                { teacherID: '2', teacherName: 'IC 11', memName: '督導3', unBack: '2', du: '690.2', df: '289.3/26', pRate: '77.4%', c: '75.3', meeting: '9.0', d: '2.0', other: '1.0', total: '33.5' },
                { teacherID: '2', teacherName: 'IC 12', memName: '督導4', unBack: '2', du: '721.2', df: '287.1/34', pRate: '77.4%', c: '75.3', meeting: '9.0', d: '2.0', other: '1.0', total: '33.5' },
                { teacherID: '2', teacherName: 'IC 13', memName: '督導4', unBack: '2', du: '411.6', df: '332.9/38', pRate: '77.4%', c: '75.3', meeting: '9.0', d: '2.0', other: '1.0', total: '33.5' }

            ];

            $scope.dataFilter = $scope.dataTeachers;

            $scope.search = function () {
                
                getService.GetData("Teacher")
                    .success(function (response) {
                        $scope.dataTeachers = response;

                        console.log($scope.dataTeachers);
                    })
                    .error(function (data, status, headers, config) {
                        //console.log(status);
                        //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                        alert(errorHandle.GetErrorMsg(status));
                    });
                
            };

            $scope.filter = function () {
                $scope.dataFilter = [];
                //console.log($scope.sltMem);
                if ($scope.sltMem != null) {
                    angular.forEach($scope.dataTeachers, function (value, key) {
                        if (value.memName == $scope.sltMem.memName) {
                            $scope.dataFilter.push(value);
                        }
                    });
                }
                else
                    $scope.dataFilter = $scope.dataTeachers;
                //console.log($scope.filter);
            };

            //console.log($scope.dataTeachers);

        });

})(window.angular);