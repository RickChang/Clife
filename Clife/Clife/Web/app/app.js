(function (angular) {
    'use strict'; 
    var tyessModule = angular.module('tyessApp', ['ngRoute', 'apiCaller', 'ui.bootstrap', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngAnimate', 'ngSanitize', 'mgcrea.ngStrap', 'angular.filter', 'appErrorHandle', 'selectModule', 'ngFileUpload', 'ngImgCrop', 'GSMInfoService', 'blockUI', 'angular-carousel', 'authModule'])
        .controller('indexController', function ($scope, $http, getService, postService, selectItemService, $timeout, blockUI, authService) {
            
            $scope.divFunSchool = { "display": "visible" };
            $scope.divFunTeacher = { "display": "visible" };
            $scope.divFunStudent = { "display": "visible" };
            $scope.divFunGAffairs = { "display": "visible" };
            $scope.divFunCounseling = { "display": "visible" };

            $scope.funcSchoolLst = [];
            $scope.funcTeacherLst = [];
            $scope.funcStudentLst = [];
            $scope.funcGAffairsLst = [];
            $scope.funcCounselingLst = [];

            $scope.CloseMod = function () {
                $('#mod_02_01').modal('hide');
                $('#mod_02_02').modal('hide');
                $('#mod_02_03').modal('hide');
                $('#mod_02_04').modal('hide');
                $('#mod_02_05').modal('hide');
                $('#mod_03').modal('hide');
            };
            
            
            // 點常用功能觸發
            $scope.GetUserFavoriteFunc = function () {
                
                
            };

            $scope.GetUserFavoriteFunc();

            $scope.ShowLoginInfo = function () {
                
                $('#Info_Confirm').modal({ backdrop: 'static' });                
            };

            var LoadUserInfo = function () {
                //var userInfo = selectItemService.getSelect('userInfo');

                //$scope.userName = "陳小明";
                $scope.userUnit = "保代部";
                $scope.userIP = "20170812";
                
            };
            
            $scope.topLeftCalculation  = function (index) {
                var style = {};

                var leftBase = 160;

                var topBase = 10;

                var leftSpacing = 200;

                var topSpacing = 200;

                var left = (index % 5 * leftSpacing) + leftBase;

                var top = (Math.floor(index / 5) * topSpacing) + topBase;

                style = { left: + left + 'px', top: + top + 'px' };
                
                return style;
            };

            $scope.adminCss = {
                "visibility": "visible"
            };

            $scope.userCss = {
                "display": "none"
            };

            $scope.role = 1;

            $scope.userName = '劉經理';

            $scope.switch = function () {
                if ($scope.role == 1) {
                    $scope.role = 2;

                    $scope.adminCss = {
                        "display": "none"
                    };

                    $scope.userCss = {
                        "visibility": "visible"
                    };

                    $scope.userName = '陳小明';
                } else {
                    $scope.role = 1;

                    $scope.adminCss = {
                        "visibility": "visible"
                    };

                    $scope.userCss = {
                        "display": "none"
                    };

                    $scope.userName = '劉經理';
                }
            };

        })

        .controller('calenderMController', function ($scope) {

            $scope.monthCss = "btn-primary";
            $scope.weekCss = "btn-default";
            $scope.dayCss = "btn-default";

            $scope.imgFile = "zzzCM01.PNG";

            $scope.switchTime = function (index) {

                if (index == 1) {
                    $scope.monthCss = "btn-primary";
                    $scope.weekCss = "btn-default";
                    $scope.dayCss = "btn-default";

                    $scope.imgFile = "zzzCM01.PNG";
                }

                if (index == 2) {
                    $scope.monthCss = "btn-default";
                    $scope.weekCss = "btn-primary";
                    $scope.dayCss = "btn-default";

                    $scope.imgFile = "zzzCM02.PNG";
                }

                if (index == 3) {
                    $scope.monthCss = "btn-default";
                    $scope.weekCss = "btn-default";
                    $scope.dayCss = "btn-primary";

                    $scope.imgFile = "zzzCM03.PNG";
                }
            };

            $scope.listA = [
                { id: '1', name: '總公司' }, { id: '2', name: '北二行' },
                { id: '3', name: '國泰世華' }, { id: '4', name: '中信' },
                { id: '5', name: '台企' }, { id: '6', name: '其他' }
            ];

            $scope.listB = [
                { id: '1', name: '保代部' }, { id: '2', name: '保代服' },
                { id: '1', name: '總行' }, { id: '2', name: '宜蘭' },
                { id: '3', name: '花蓮' }, { id: '4', name: '羅東' },
                { id: '5', name: '台東' }, { id: '6', name: '其他' }
            ];

            $scope.listC = [
                { id: '1', name: '全行' }, { id: '2', name: '分行主管' },
                { id: '3', name: '業務主管' }, { id: '4', name: '理專' },
                { id: '5', name: '行員' }, { id: '6', name: 'AO' },
                { id: '7', name: '輔訓' }, { id: '8', name: 'IC' }, { id: '9', name: '其他' }
            ];

            $scope.dates = [
                { id: '1', date: '10605' },
                { id: '2', date: '10606' },
                { id: '3', date: '10607' },
                { id: '4', date: '10608' }
            ];

            $scope.weeks = [
                { id: '1', week: '第一週' },
                { id: '2', week: '第二週' },
                { id: '3', week: '第三週' },
                { id: '4', week: '第四週' }
            ];

            $scope.sltWeekCss = {
                "display": "none"
            };

            $scope.listD = [
                { id: '1', name: '全體理專' }, { id: '2', name: '陳O強' },
                { id: '3', name: '李O月' }, { id: '4', name: '林O如' },
                { id: '5', name: '黃O婷' }
            ];

            $scope.addEvent = function () {
                $("#event_Detail").modal({ backdrop: 'static' });
            };

            $scope.dateChange = function () {
                if ($scope.sltMonth != undefined) {
                    $scope.sltWeekCss = {
                        "visibility": "visible"
                    };
                } else {
                    $scope.sltWeekCss = {
                        "display": "none"
                    };
                }
            };
        })

        .controller('calenderController', function ($scope) {

            $scope.monthCss = "btn-primary";
            $scope.weekCss = "btn-default";
            $scope.dayCss = "btn-default";

            $scope.imgFile = "zzz01.PNG";

            $scope.switchTime = function (index) {

                if (index == 1)
                {
                    $scope.monthCss = "btn-primary";
                    $scope.weekCss = "btn-default";
                    $scope.dayCss = "btn-default";

                    $scope.imgFile = "zzz01.PNG";
                }

                if (index == 2)
                {
                    $scope.monthCss = "btn-default";
                    $scope.weekCss = "btn-primary";
                    $scope.dayCss = "btn-default";

                    $scope.imgFile = "zzz02.PNG";
                }

                if (index == 3)
                {
                    $scope.monthCss = "btn-default";
                    $scope.weekCss = "btn-default";
                    $scope.dayCss = "btn-primary";

                    $scope.imgFile = "zzz03.PNG";
                }
            };

            $scope.listA = [
                { id: '1', name: '總公司' }, { id: '2', name: '北二行' },
                { id: '3', name: '國泰世華' }, { id: '4', name: '中信' },
                { id: '5', name: '台企' }, { id: '6', name: '其他' }
            ];

            $scope.listB = [
                { id: '1', name: '保代部' }, { id: '2', name: '保代服' },
                { id: '1', name: '總行' }, { id: '2', name: '宜蘭' },
                { id: '3', name: '花蓮' }, { id: '4', name: '羅東' },
                { id: '5', name: '台東' }, { id: '6', name: '其他' }
            ];

            $scope.listC = [
                { id: '1', name: '全行' }, { id: '2', name: '分行主管' },
                { id: '3', name: '業務主管' }, { id: '4', name: '理專' },
                { id: '5', name: '行員' }, { id: '6', name: 'AO' },
                { id: '7', name: '輔訓' }, { id: '8', name: 'IC' }, { id: '9', name: '其他' }
            ];

            $scope.dates = [
                { id: '1', date: '10605' },
                { id: '2', date: '10606' },
                { id: '3', date: '10607' },
                { id: '4', date: '10608' }
            ];

            $scope.weeks = [
                { id: '1', week: '第一週' },
                { id: '2', week: '第二週' },
                { id: '3', week: '第三週' },
                { id: '4', week: '第四週' }
            ];

            $scope.sltWeekCss = {
                "display": "none"
            };

            $scope.listD = [
                { id: '1', name: '全體理專' }, { id: '2', name: '陳O強' },
                { id: '3', name: '李O月' }, { id: '4', name: '林O如' },
                { id: '5', name: '黃O婷' }
            ];

            $scope.addEvent = function () {
                $("#event_Detail").modal({ backdrop: 'static' });
            };

            $scope.dateChange = function () {
                if ($scope.sltMonth != undefined){
                    $scope.sltWeekCss = {
                        "visibility": "visible"
                    };
                }else {
                    $scope.sltWeekCss = {
                        "display": "none"
                    };
                }
            };

        })

        .controller('activeController', function ($scope) {
            
            $scope.dataMenu1 = [
                { name: '第一週', a1: '34.0', meeting: '8.0', c1: '4.0', other: '2.0', total: '48.0' },
                { name: '第二週', a1: '', meeting: '', c1: '', other: '', total: '' },
                { name: '第三週', a1: '', meeting: '', c1: '', other: '', total: '' },
                { name: '第四週', a1: '', meeting: '', c1: '', other: '', total: '' },
                { name: '第五週', a1: '', meeting: '', c1: '', other: '', total: '' }
            ];

            $scope.dataMenu2 = [
                { name: '總公司', a1: '0.0', meeting: '8.0', c1: '0.0', other: '0.0', total: '8.0' },
                { name: '保代服', a1: '0.0', meeting: '0.0', c1: '2.0', other: '0.0', total: '2.0' },
                { name: '國泰世華宜蘭', a1: '12.0', meeting: '0.0', c1: '0.0', other: '0.0', total: '12.0' },
                { name: '國泰世華花蓮', a1: '10.0', meeting: '0.0', c1: '0.0', other: '2.0', total: '10.0' },
                { name: '國泰世華台東', a1: '12.0', meeting: '0.0', c1: '2.0', other: '0.0', total: '14.0' }
            ];

            $scope.dataMenu3 = [
                { name: '全行', a1: '12.0', meeting: '0.0', c1: '0.0', other: '2.0', total: '14.0' },
                { name: '業務主管', a1: '2.0', meeting: '0.0', c1: '0.0', other: '0.0', total: '2.0' },
                { name: '理專', a1: '14.0', meeting: '0.0', c1: '2.0', other: '0.0', total: '16.0' },
                { name: '行員', a1: '4.0', meeting: '0.0', c1: '0.0', other: '0.0', total: '4.0' },
                { name: 'AO', a1: '2.0', meeting: '0.0', c1: '2.0', other: '0.0', total: '4.0' },
                { name: '其他', a1: '0.0', meeting: '8.0', c1: '0.0', other: '0.0', total: '8.0' }
            ];

            $scope.aList = [
                { name: '國泰世華宜蘭', GTD: '4.0', ITD: '4.0', FOD: '2.0', PRP: '2.0', total: '12.0' },
                { name: '國泰世華花蓮', GTD: '4.0', ITD: '4.0', FOD: '0.0', PRP: '2.0', total: '10.0' },
                { name: '國泰世華台東', GTD: '4.0', ITD: '4.0', FOD: '2.0', PRP: '2.0', total: '12.0' }

            ];

            $scope.cList = [
                { name: '總公司', c1: '2.0', c2: '0.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' },
                { name: '保代服', c1: '0.0', c2: '2.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' },
                { name: '國泰世華宜蘭', c1: '0.0', c2: '2.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' },
                { name: '國泰世華花蓮', c1: '0.0', c2: '2.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' },
                { name: '國泰世華台東', c1: '0.0', c2: '2.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' }
            ];

            $scope.dList = [
                { name: '國泰世華花蓮', c1: '2.0', c2: '0.0', total: '2.0' },
                { name: '國泰世華台東', c1: '0.0', c2: '0.0', total: '0.0' }
            ];

            $scope.showA = function () {
                $("#a_Detail").modal({ backdrop: 'static' });
            };

            $scope.showMeeting = function () {
                $("#b_Detail").modal({ backdrop: 'static' });
            };

            $scope.showC = function () {
                $("#c_Detail").modal({ backdrop: 'static' });
            };

            $scope.showOther = function () {
                $("#d_Detail").modal({ backdrop: 'static' });
            };
        })

        .controller('active2Controller', function ($scope) {

            $scope.dataMenu1 = [
                { name: '第一週', a1: '34.0', meeting: '8.0', c1: '4.0', other: '2.0', total: '48.0' },
                { name: '第二週', a1: '', meeting: '', c1: '', other: '', total: '' },
                { name: '第三週', a1: '', meeting: '', c1: '', other: '', total: '' },
                { name: '第四週', a1: '', meeting: '', c1: '', other: '', total: '' },
                { name: '第五週', a1: '', meeting: '', c1: '', other: '', total: '' }
            ];

            $scope.dataMenu2 = [
                { name: '總公司', a1: '0.0', meeting: '8.0', c1: '0.0', other: '0.0', total: '8.0' },
                { name: '保代服', a1: '0.0', meeting: '0.0', c1: '2.0', other: '0.0', total: '2.0' },
                { name: '國泰世華宜蘭', a1: '12.0', meeting: '0.0', c1: '0.0', other: '0.0', total: '12.0' },
                { name: '國泰世華花蓮', a1: '10.0', meeting: '0.0', c1: '0.0', other: '2.0', total: '10.0' },
                { name: '國泰世華台東', a1: '12.0', meeting: '0.0', c1: '2.0', other: '0.0', total: '14.0' }
            ];

            $scope.dataMenu3 = [
                { name: '全行', a1: '12.0', meeting: '0.0', c1: '0.0', other: '2.0', total: '14.0' },
                { name: '業務主管', a1: '2.0', meeting: '0.0', c1: '0.0', other: '0.0', total: '2.0' },
                { name: '理專', a1: '14.0', meeting: '0.0', c1: '2.0', other: '0.0', total: '16.0' },
                { name: '行員', a1: '4.0', meeting: '0.0', c1: '0.0', other: '0.0', total: '4.0' },
                { name: 'AO', a1: '2.0', meeting: '0.0', c1: '2.0', other: '0.0', total: '4.0' },
                { name: '其他', a1: '0.0', meeting: '8.0', c1: '0.0', other: '0.0', total: '8.0' }
            ];

            $scope.aList = [
                { name: '國泰世華宜蘭', GTD: '4.0', ITD: '4.0', FOD: '2.0', PRP: '2.0', total: '12.0' },
                { name: '國泰世華花蓮', GTD: '4.0', ITD: '4.0', FOD: '0.0', PRP: '2.0', total: '10.0' },
                { name: '國泰世華台東', GTD: '4.0', ITD: '4.0', FOD: '2.0', PRP: '2.0', total: '12.0' }

            ];

            $scope.cList = [
                { name: '總公司', c1: '2.0', c2: '0.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' },
                { name: '保代服', c1: '0.0', c2: '2.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' },
                { name: '國泰世華宜蘭', c1: '0.0', c2: '2.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' },
                { name: '國泰世華花蓮', c1: '0.0', c2: '2.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' },
                { name: '國泰世華台東', c1: '0.0', c2: '2.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' }
            ];

            $scope.dList = [
                { name: '國泰世華花蓮', c1: '2.0', c2: '0.0', total: '2.0' },
                { name: '國泰世華台東', c1: '0.0', c2: '0.0', total: '0.0' }
            ];

            $scope.showA = function () {
                $("#a_Detail").modal({ backdrop: 'static' });
            };

            $scope.showMeeting = function () {
                $("#b_Detail").modal({ backdrop: 'static' });
            };

            $scope.showC = function () {
                $("#c_Detail").modal({ backdrop: 'static' });
            };

            $scope.showOther = function () {
                $("#d_Detail").modal({ backdrop: 'static' });
            };
        })

        .controller('messageController', function ($scope) {

            $scope.typeSelected = true;

            $scope.sltTypes = [
                { id: '1', name: '公告訊息' },
                { id: '2', name: '個人訊息' }
            ];

            $scope.depts = [
                { id: '1', name: '保代推展一科' },
                { id: '2', name: '保代推展二科' }
            ];

            $scope.lstAO = [
                { id: '1', name: '督導1', dept: '1' },
                { id: '2', name: '督導2', dept: '1' },
                { id: '3', name: '督導3', dept: '2' },
                { id: '4', name: '督導4', dept: '2' },
                { id: '5', name: 'IC 1', dept: '2' },
                { id: '6', name: 'IC 2', dept: '2' },
                { id: '7', name: 'IC 3', dept: '2' },
                { id: '8', name: 'IC 4', dept: '2' }
            ];

            $scope.typeChange = function () {
                if ($scope.sltType != undefined) {
                    $scope.typeSelected = false;
                } else {
                    $scope.typeSelected = true;
                }
            };

        })

        .controller('loggerController', function ($scope) {

            $scope.tablevisibility = 1;

            $scope.menu1LiHidden = {
                "display": "none"
            };

            $scope.choosedMenu1 = {
                "display": "none"
            };

            $scope.menu2LiHidden = {
                "display": "none"
            };

            $scope.choosedMenu2 = {
                "display": "none"
            };

            $scope.menu1List = [
                { id: '1', localName: '國泰世華台東', title: 'SFA', time: '104/05/03 14:00', event: '轉介訓練' },
                { id: '2', localName: '國泰世華台東', title: '理專', time: '104/05/03 14:30', event: '理專行員專班' },
                { id: '3', localName: '國泰世華台東', title: '行員', time: '104/05/03 15:00', event: 'AO陪訪' },
                { id: '4', localName: '國泰世華台東', title: '理專', time: '104/05/03 15:30', event: '績效追蹤' },
                { id: '5', localName: '國泰世華花蓮', title: '全行', time: '104/05/10 14:00', event: '分會夕會' },
                { id: '6', localName: '國泰世華花蓮', title: '理專', time: '104/05/10 14:30', event: '獎勵推動' },
                { id: '7', localName: '國泰世華花蓮', title: '理專', time: '104/05/10 15:00', event: '區部活力班' },
                { id: '8', localName: '國泰世華宜蘭', title: '其他', time: '104/05/10 15:30', event: '需求分析' },
                { id: '9', localName: '國泰世華宜蘭', title: '全行', time: '104/05/21 14:00', event: '區部摩天輪' },
                { id: '10', localName: '國泰世華宜蘭', title: '行員', time: '104/05/10 14:30', event: '新進理專輔導' },
                { id: '11', localName: '國泰世華宜蘭', title: '理專', time: '104/05/10 15:00', event: '保單校正協助' }
            ];

            $scope.menu2List = [
                { id: '1', localName: '國泰世華花蓮', title: 'SFA', time: '104/05/03 14:00', event: '轉介訓練' },
                { id: '2', localName: '國泰世華花蓮', title: '理專', time: '104/05/10 14:30', event: '獎勵推動' },
                { id: '3', localName: '國泰世華花蓮', title: '理專', time: '104/05/10 15:00', event: '區部活力班' },
                { id: '4', localName: '國泰世華宜蘭', title: '其他', time: '104/05/10 15:30', event: '需求分析' },
                { id: '5', localName: '國泰世華宜蘭', title: '全行', time: '104/05/21 14:00', event: '區部摩天輪' },
                { id: '6', localName: '國泰世華宜蘭', title: '行員', time: '104/05/10 14:30', event: '新進理專輔導' },
                { id: '7', localName: '國泰世華宜蘭', title: '理專', time: '104/05/10 15:00', event: '保單校正協助' }
            ];

            $scope.GTDList = [
                { id: '2', name: '分會夕會', class: 'label-success' }
            ];

            $scope.GTD = [
                { id: '1', name: '分會早會', class: 'label-success' },
                { id: '2', name: '分會夕會', class: 'label-success' },
                { id: '3', name: '銷售演練', class: 'label-success' },
                { id: '4', name: '轉介訓練', class: 'label-success' },
                { id: '5', name: '外勤會議', class: 'label-success' },
                { id: '6', name: '理專行員專班', class: 'label-success' },
                { id: '7', name: '區部活力班', class: 'label-success' },
                { id: '8', name: '區部摩天輪', class: 'label-success' }
            ];

            $scope.ITDList = [
                { id: '2', name: '案源討論', class: 'label-success' }
            ];

            $scope.ITD = [
                { id: '1', name: '商品教育推動', class: 'label-success' },
                { id: '2', name: '案源討論', class: 'label-success' },
                { id: '3', name: '需求分析', class: 'label-success' },
                { id: '4', name: '銷售問題回饋', class: 'label-success' },
                { id: '5', name: '成功經驗分享', class: 'label-success' },
                { id: '6', name: '新進理專輔導', class: 'label-success' },
                { id: '7', name: '銷售演練', class: 'label-info' },
                { id: '8', name: '保單校正協助', class: 'label-info' }
            ];

            $scope.FODList = [
                { id: '2', name: 'AO陪訪', class: 'label-success' }
            ];

            $scope.FOD = [
                { id: '1', name: '理專陪訪', class: 'label-info' },
                { id: '2', name: 'AO陪訪', class: 'label-info' }
            ];

            $scope.PRPList = [
                { id: '2', name: '獎勵推動', class: 'label-success' }
            ];

            $scope.PRP = [
                { id: '1', name: '績效追蹤', class: 'label-info' },
                { id: '2', name: '獎勵推動', class: 'label-success' }
            ];

            $scope.search = function () {

                if ($scope.tablevisibility == 1) {
                    $scope.menu1LiHidden = {
                        "visibility": "visible"
                    };
                    $scope.menu2LiHidden = {
                        "display": "none"
                    };
                    //console.log($scope.menu1LiHidden, $scope.menu2LiHidden);
                } else {
                    $scope.menu1LiHidden = {
                        "display": "none"
                    };
                    $scope.menu2LiHidden = {
                        "visibility": "visible"
                    };
                }

                $scope.choosedMenu1 = {
                    "display": "none"
                };
                $scope.choosedMenu2 = {
                    "display": "none"
                };
            };

            $scope.menu1Click = function (id) {

                if ($scope.tablevisibility == 1) {
                    $scope.choosedMenu1 = {
                        "visibility": "visible"
                    };

                    $scope.GTDList = [];
                    $scope.ITDList = [];
                    $scope.FODList = [];
                    $scope.PRPList = [];
                    
                    angular.forEach($scope.GTD, function (value, key) {
                        if (value.id == id)
                        {
                            $scope.GTDList.push(value);
                        }
                    });

                    angular.forEach($scope.ITD, function (value, key) {
                        if (value.id == id) {
                            $scope.ITDList.push(value);
                        }
                    });

                    angular.forEach($scope.FOD, function (value, key) {
                        if (value.id == id) {
                            $scope.FODList.push(value);
                        }
                    });

                    angular.forEach($scope.PRP, function (value, key) {
                        if (value.id == id) {
                            $scope.PRPList.push(value);
                        }
                    });

                } else {
                    $scope.choosedMenu2 = {
                        "visibility": "visible"
                    };

                    $scope.GTDList = [];
                    $scope.ITDList = [];
                    $scope.FODList = [];
                    $scope.PRPList = [];

                    angular.forEach($scope.GTD, function (value, key) {
                        if (value.id == id) {
                            $scope.GTDList.push(value);
                        }
                    });

                    angular.forEach($scope.ITD, function (value, key) {
                        if (value.id == id) {
                            $scope.ITDList.push(value);
                        }
                    });

                    angular.forEach($scope.FOD, function (value, key) {
                        if (value.id == id) {
                            $scope.FODList.push(value);
                        }
                    });

                    angular.forEach($scope.PRP, function (value, key) {
                        if (value.id == id) {
                            $scope.PRPList.push(value);
                        }
                    });
                }
                
                //console.log(id);
            };

            $scope.setTable = function (index) {
                $scope.tablevisibility = index;

                //if ($scope.tablevisibility == 1) {
                //    $scope.menu2LiHidden = {
                //        "display": "none"
                //    };
                //    console.log($scope.menu1LiHidden, $scope.menu2LiHidden);
                //} else {
                //    $scope.menu1LiHidden = {
                //        "display": "none"
                //    };
                //}
            };
        })

        .controller('loginController', function ($scope, $http, $window, $timeout, blockUI, authService) {
            
            $scope.doLogin = function () {
                blockUI.start();

                $timeout(function () {
                    blockUI.stop();
                }, 10000);
                
                var data = 'grant_type=password&username=' + $scope.userAccount + "&password=" + $scope.userPW;

                //$http.post('http://localhost:64165/api/UserFunction', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'TyeToken': 'QTEyMzQ1Njc4OSwyNjIsMjAxNy0wNi0yOSAxNTo1ODoyNw=='}})
                //    .success(function (response) {
                //        console.log(response);
                        
                //        $window.location.href = './default.aspx?Token=' + response;    
                //    })
                //    .error(function (err, status) {
                //        console.log(err, status);
                //    });

                //authService.login($scope.userAccount, $scope.userPW)
                //    .success(function (response) {
                //        //console.log(response);
                //        $window.location.href = './default.aspx?Token=' + response;
                //    })
                //    .error(function (err, status) {
                //        console.log(err, status);
                //    });
            };

            $scope.doTest = function () {
                $scope.userAccount = 'A123456789';

                $scope.userPW = 'syscom#1';
            };

            $scope.testServer = function () {

            };
        })

        .controller('homeController', function ($scope, getService, errorHandle) {
            
            //$scope.msgslide = [{ 'Content': 'test marquee', 'color': 'blue' }, { 'Content': 'tttt abacfssjiogtsd', 'color': 'red' }];
            $scope.msgslide = [];
            
            $scope.FrontColor = function (color) {
                return { color: color };
            };
            
        })

        .controller('supportController', function ($scope) {

            $scope.dataList = [
                { id: '1', time: '106/07/12 15:30 ~ 16:00', localName: '彰銀台東', event: '教育商品推動', title: '理專/王OO', status: '未回' },
                { id: '2', time: '106/07/12 12:30 ~ 13:00', localName: '國泰世華台東', event: '教育商品推動', title: 'SFA/陳OO', status: '已回' },
                { id: '3', time: '106/07/23 13:00 ~ 13:30', localName: '國泰世華台東', event: '獎勵推動', title: '行員/張OO', status: '未回' },
                { id: '4', time: '106/08/02 10:30 ~ 11:00', localName: '國泰世華台東', event: '客服單處理', title: '理專/黃OO', status: '已回' },
                { id: '5', time: '106/08/02 11:00 ~ 11:30', localName: '國泰世華台東', event: '績效追蹤檢視', title: 'SFA/陳OO', status: '已回' }
            ];

            $scope.back = function (index) {
                $("#event_Detail").modal({ backdrop: 'static' });
            };
        })

        .controller('interviewController', function ($scope) {
            $scope.dataMenu1 = [
                { name: '第一週', a1: '34.0', meeting: '8.0', c1: '4.0', other: '2.0', total: '48.0' },
                { name: '第二週', a1: '', meeting: '', c1: '', other: '', total: '' },
                { name: '第三週', a1: '', meeting: '', c1: '', other: '', total: '' },
                { name: '第四週', a1: '', meeting: '', c1: '', other: '', total: '' },
                { name: '第五週', a1: '', meeting: '', c1: '', other: '', total: '' }
            ];

            $scope.dataMenu2 = [
                { name: '總公司', a1: '0.0', meeting: '8.0', c1: '0.0', other: '0.0', total: '8.0' },
                { name: '保代服', a1: '0.0', meeting: '0.0', c1: '2.0', other: '0.0', total: '2.0' },
                { name: '國泰世華宜蘭', a1: '12.0', meeting: '0.0', c1: '0.0', other: '0.0', total: '12.0' },
                { name: '國泰世華花蓮', a1: '10.0', meeting: '0.0', c1: '0.0', other: '2.0', total: '10.0' },
                { name: '國泰世華台東', a1: '12.0', meeting: '0.0', c1: '2.0', other: '0.0', total: '14.0' }
            ];

            $scope.dataMenu3 = [
                { name: '全行', a1: '12.0', meeting: '0.0', c1: '0.0', other: '2.0', total: '14.0' },
                { name: '業務主管', a1: '2.0', meeting: '0.0', c1: '0.0', other: '0.0', total: '2.0' },
                { name: '理專', a1: '14.0', meeting: '0.0', c1: '2.0', other: '0.0', total: '16.0' },
                { name: '行員', a1: '4.0', meeting: '0.0', c1: '0.0', other: '0.0', total: '4.0' },
                { name: 'AO', a1: '2.0', meeting: '0.0', c1: '2.0', other: '0.0', total: '4.0' },
                { name: '其他', a1: '0.0', meeting: '8.0', c1: '0.0', other: '0.0', total: '8.0' }
            ];

            $scope.aList = [
                { name: '國泰世華宜蘭', GTD: '4.0', ITD: '4.0', FOD: '2.0', PRP: '2.0', total: '12.0' },
                { name: '國泰世華花蓮', GTD: '4.0', ITD: '4.0', FOD: '0.0', PRP: '2.0', total: '10.0' },
                { name: '國泰世華台東', GTD: '4.0', ITD: '4.0', FOD: '2.0', PRP: '2.0', total: '12.0' }

            ];

            $scope.cList = [
                { name: '總公司', c1: '2.0', c2: '0.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' },
                { name: '保代服', c1: '0.0', c2: '2.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' },
                { name: '國泰世華宜蘭', c1: '0.0', c2: '2.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' },
                { name: '國泰世華花蓮', c1: '0.0', c2: '2.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' },
                { name: '國泰世華台東', c1: '0.0', c2: '2.0', c3: '0.0', c4: '0.0', c5: '0.0', total: '2.0' }
            ];

            $scope.dList = [
                { name: '國泰世華花蓮', c1: '2.0', c2: '0.0', total: '2.0' },
                { name: '國泰世華台東', c1: '0.0', c2: '0.0', total: '0.0' }
            ];

            $scope.showA = function () {
                $("#a_Detail").modal({ backdrop: 'static' });
            };

            $scope.showMeeting = function () {
                $("#b_Detail").modal({ backdrop: 'static' });
            };

            $scope.showC = function () {
                $("#c_Detail").modal({ backdrop: 'static' });
            };

            $scope.showOther = function () {
                $("#d_Detail").modal({ backdrop: 'static' });
            };

            $scope.menu2List = [
                { id: '1', localName: '國泰世華花蓮', title: 'SFA', time: '104/05/03 14:00', event: '轉介訓練' },
                { id: '2', localName: '國泰世華花蓮', title: '理專', time: '104/05/10 14:30', event: '獎勵推動' },
                { id: '3', localName: '國泰世華花蓮', title: '理專', time: '104/05/10 15:00', event: '區部活力班' },
                { id: '4', localName: '國泰世華宜蘭', title: '其他', time: '104/05/10 15:30', event: '需求分析' },
                { id: '5', localName: '國泰世華宜蘭', title: '全行', time: '104/05/21 14:00', event: '區部摩天輪' },
                { id: '6', localName: '國泰世華宜蘭', title: '行員', time: '104/05/10 14:30', event: '新進理專輔導' },
                { id: '7', localName: '國泰世華宜蘭', title: '理專', time: '104/05/10 15:00', event: '保單校正協助' }
            ];

            $scope.showMenu = function (index) {
                if (index == 1) {
                    $("#menuA_Detail").modal({ backdrop: 'static' });
                    //menuA_Detail
                }
                if (index == 2) {
                    $("#menuB_Detail").modal({ backdrop: 'static' });
                    //menuA_Detail
                }
                if (index == 3) {
                    $("#menuC_Detail").modal({ backdrop: 'static' });
                    //menuA_Detail
                }
                if (index == 4) {
                    $("#menuD_Detail").modal({ backdrop: 'static' });
                    //menuA_Detail
                }
                if (index == 5) {
                    $("#menuE_Detail").modal({ backdrop: 'static' });
                    //menuA_Detail
                }
            };
            
            $scope.dates = [
                { id: '1', date: '10605' },
                { id: '2', date: '10606' },
                { id: '3', date: '10607' },
                { id: '4', date: '10608' }
            ];

            $scope.weeks = [
                { id: '1', week: '第一週' },
                { id: '2', week: '第二週' },
                { id: '3', week: '第三週' },
                { id: '4', week: '第四週' }
            ];

            $scope.sltWeekCss = {
                "display": "none"
            };


            $scope.dateChange = function () {
                if ($scope.sltMonth != undefined){
                    $scope.sltWeekCss = {
                        "visibility": "visible"
                    };
                }else {
                    $scope.sltWeekCss = {
                        "display": "none"
                    };
                }
            };
        })

        .config(function ($routeProvider, $datepickerProvider) {
            angular.extend($datepickerProvider.defaults, {
                startWeek: 0 //星期起始
            })
            $routeProvider                
                .when('/', {
                    templateUrl: "app/home.html",
                    controller: 'homeController',
                    title: '首頁',
                    subtitle: '系統首頁'
                })

                .when('/memberHelp', {
                    templateUrl: "app/teacher/teachersInfo.html",
                    controller: 'teachersController',
                    title: '屬員輔導',
                    subtitle: '屬員輔導'
                })

                .when('/message', {
                    templateUrl: "app/teacher/msg.html",
                    controller: 'messageController',
                    title: '訊息管理',
                    subtitle: '訊息管理'
                })

                .when('/teacherInfoDtl/:teacherID', {
                    templateUrl: "app/teacher/teacherInfoDtl.html",
                    controller: 'teacherDtlController',
                    title: '教師資料',
                    subtitle: '基本資料維護'
                })

                .when('/support', {
                    templateUrl: "app/teacher/support.html",
                    controller: 'supportController',
                    title: '',
                    subtitle: ''
                })

                .when('/interview', {
                    templateUrl: "app/teacher/interview.html",
                    controller: 'interviewController',
                    title: '',
                    subtitle: ''
                })

                .when('/index', {
                    templateUrl: "app/home.html",
                    controller: 'indexController',
                    title: '首頁',
                    subtitle: '系統首頁'
                })

                .when('/error', {
                    templateUrl: "app/error/123456.html",
                    controller: 'errorController',
                    title: '456',
                    subtitle: '123'
                })
                
                .when('/calender', {
                    templateUrl: "app/calender/calender.html",
                    controller: 'calenderController',
                     title: '',
                     subtitle: ''
                })
                
                .when('/calenderM', {
                    templateUrl: "app/calender/calenderM.html",
                    controller: 'calenderMController',
                    title: '',
                    subtitle: ''
                })
                
                .when('/active', {
                    templateUrl: "app/active/active.html",
                    controller: 'activeController',
                    title: '活動量',
                    subtitle: '活動量'
                })

                .when('/active2', {
                    templateUrl: "app/active/active2.html",
                    controller: 'active2Controller',
                    title: '活動量',
                    subtitle: '活動量'
                })
                
                .when('/logger', {
                    templateUrl: "app/logger/logger.html",
                    controller: 'loggerController',
                    title: '紀錄簿',
                    subtitle: '紀錄簿'
                })

                .otherwise({
                    templateUrl: "app/error/error.html",
                    controller: 'errorController'
                })

        })

})(window.angular);