(function (angular) {
    'use strict';

    angular.module('appCfg', [])
        .value('appCfg', {
            serverUrl: 'http://localhost:64165/',
            authValue: 'authorizationData',
            selectNames: [{ name: 'userInfo', api: 'TyeUserInfo' }, { name: 'semester', api: 'SchoolSemesterSearch' }, { name: 'seme', api: 'SchoolSemester' }, { name: 'county', api: 'CodeCounty' }, { name: 'Office', api: 'SchOffice' }, { name: 'OfficeTitle', api: 'SchOfficeTitle' }] //{ name: 'userInfo', api: 'TyeUserInfo' }, { name: 'village', api: '' }, { name: 'schools', api: '' }
        });

    angular.module('appErroMessage', [])
        .value('appErroMessage', {
            msg: 'Error',
            msg0: '系統錯誤',
            msg401: '尚未登入，請重新登入',
            msg402: '已達每日呼叫上限',
            msg403: '無使用權限，請洽系統管理員',
            msg404: '找不到服務',
            msg500: '500,內部錯誤'
        });

    angular.module('apiCaller', ['appCfg'])
        .factory('getService', ['$http', 'appCfg', function ($http, cfg) {
            return {
                GetData: function (apiName) {
                    return $http({
                        method: 'GET',
                        url: cfg.serverUrl + "api/" + apiName
                    })
                }
            }
        }])

        .factory('postService', ['$http', 'appCfg', function ($http, cfg) {
            return {
                PostData: function (apiName, obj) {
                    //console.log(authService.getAuthData());
                    return $http({
                        method: 'POST',
                        url: cfg.serverUrl + "api/" + apiName,
                        headers: {
                            //'Authorization': 'bearer ' + authService.getAuthData().token,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: obj
                    })
                }
            }
        }])

        .factory('putService', ['$http', 'appCfg', function ($http, cfg) {
            return {
                PutData: function (apiName, obj) {
                    return $http({
                        method: 'PUT',
                        url: cfg.serverUrl + "api/" + apiName,
                        headers: {
                            //Authorization': 'bearer ' + authService.getAuthData().token,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: obj
                    })
                }
            }
        }])

        .factory('delService', ['$http', 'appCfg', function ($http, cfg) {
            return {
                DeleteData: function (apiName, obj) {
                    return $http({
                        method: 'DELETE',
                        url: cfg.serverUrl + "api/" + apiName,
                        headers: {
                            //Authorization': 'bearer ' + authService.getAuthData().token,
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        data: obj
                    })
                }
            }
        }]);

        //.config(function ($httpProvider) {
        //    $httpProvider.defaults.withCredentials = true;
        //});

    angular.module('appErrorHandle', ['appErroMessage'])
        .factory('errorHandle', ['appErroMessage', function (errorMsg) {
            return {
                GetErrorMsg: function (status) {
                    return (errorMsg['msg' + status]) ? errorMsg['msg' + status] : "undefined:" + status;
                }
            }
        }]);

    angular.module('selectModule', ['LocalStorageModule', 'appCfg'])
        .factory('selectItemService', ['$http', '$q', 'localStorageService', 'appCfg', function ($http, $q, localStorageService, cfg) {

            var selectServiceFactory = {};

            var _setSelectItem = function () {

                var deferred = $q.defer();

                angular.forEach(cfg.selectNames, function (value, key) {
                    $http.get(cfg.serverUrl + "api/" + value.api)
                        .success(function (response) {
                            if (value.name != undefined) {
                                localStorageService.set(value.name, response);
                                //console.log(value.name);
                                deferred.resolve(response);
                            }
                        })
                        .error(function (data, status, headers, config) {
                            //console.log("select item error: " + err + " " + status);
                            deferred.reject(status);
                        });

                });

                return deferred.promise;
            };

            var _getSelectItem = function (name) {
                return localStorageService.get(name);
            };

            selectServiceFactory.setSelect = _setSelectItem;
            selectServiceFactory.getSelect = _getSelectItem;

            return selectServiceFactory;
        }]);

    angular.module('GSMInfoService', [])
        .factory('GSMInfoService', function ($rootScope) {
            var service = {};

            service.Table_newStudent = function (value) {
                service.ServiceBoard = value;
                //console.log(value);
                $rootScope.$broadcast("Table_newStudent_update");
            }
            

            return service;
        });

    angular.module('authModule', ['LocalStorageModule', 'appCfg'])
        .factory('authService', ['$http', '$q', 'localStorageService', 'appCfg', function ($http, $q, localStorageService, cfg) {
            var authServiceFactory = {};

            var _getFunction = function () {
                var userData = localStorageService.get(cfg.authValue);

                var deferred = $q.defer();

                $http.get(cfg.serverUrl + 'api/UserFunction/' + userData.userID)
                    .success(function (response) {
                        //localStorageService.set('functionList', reponse);
                        deferred.resolve(response);
                    })
                    .error(function (data, status, headers, config) {
                        //console.log("error get function");
                        deferred.reject(status);
                    });

                return deferred.promise;

            };

            var _getFavorFunction = function () {
                var userData = localStorageService.get(cfg.authValue);

                var parameter = $.param({
                    SchoolID: 'C0001',
                    UserID: 'A123456789',
                    Action: "SELECT_ALL"
                });
                
                return $http({
                    method: 'POST',
                    url: cfg.serverUrl + "api/UserFavoriteFunc",
                    headers: {
                        //'Authorization': 'bearer ' + authService.getAuthData().token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: parameter
                });
            };

            var _modifyFavorFunction = function (functionCode) {
                var userData = localStorageService.get(cfg.authValue);

                var parameter = $.param({
                    SchoolID: 'C0001',
                    UserID: 'A123456789',
                    FavoriteFuncID: functionCode,
                    Action: "MODIFY"
                });

                var deferred = $q.defer();

                $http({
                    method: 'POST',
                    url: cfg.serverUrl + "api/UserFavoriteFunc",
                    headers: {
                        //'Authorization': 'bearer ' + authService.getAuthData().token,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: parameter
                })
                    .success(function (response) {
                        deferred.resolve(response);
                    })
                    .error(function (data, status, headers, config) {
                        deferred.reject(status);
                    });

                return deferred.promise;
            };

            var _login = function (userID, pw) {
                //console.log('test');

                var data = 'grant_type=password&username=' + userID + "&password=" + pw;

                return $http({
                    method: 'POST',
                    url: cfg.serverUrl + "api/UserFunction",
                    headers: {
                        //'Authorization': 'bearer ' + authService.getAuthData().token,
                        //'TyeToken': 'QTEyMzQ1Njc4OSwxNzU0LDIwMTctMDctMTggMTc6MDY6MzM=',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: data
                });
            };

            authServiceFactory.login = _login;
            authServiceFactory.getFunc = _getFunction;
            authServiceFactory.getFavorite = _getFavorFunction;
            authServiceFactory.changeFavorite = _modifyFavorFunction;

            return authServiceFactory;
        }]);

})(window.angular);