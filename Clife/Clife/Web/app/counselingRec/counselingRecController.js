(function (angular) {
    'use strict';

    angular.module('tyessApp')

        .controller('counselingRecController', function ($scope, $http, $filter, getService, postService, delService, putService, errorHandle, selectItemService) {
            //Load
            //console.log(selectItemService.getSelect('semester'));
            var userInfo = selectItemService.getSelect('userInfo'); //讀取使用者資訊

            $scope.viewby = "10";//預設頁碼 10頁
            
            $scope.hiddenStudentList = {
                "display": "none"
            };
            $scope.hiddenCounselingRec = {  //編輯的Table(輔導資料紀錄表)
                "display": "none"
            };
            $scope.hiddenInterestAbility = { //編輯的Table(興趣及特殊才能調查表)
                "display": "none"
            };
            $scope.hiddenCounsInterview = { //編輯的Table(輔導訪談紀錄)
                "display": "none"
            };

            $scope.SemesterYear = selectItemService.getSelect('semester');

            for (var i = 0; i < $scope.SemesterYear.length ; i++) {
                //console.log(response[i].IsEnabled);
                if ($scope.SemesterYear[i].IsEnabled == "是") $scope.modelSemesterYear = $scope.SemesterYear[i].Semester;
            }


            //選擇學年度時，連動年級、班級
            $scope.SemesterYearChange = function (SemesterYear) {
                
                var data = $.param({ Action: "SELECT", Semester: SemesterYear });
                postService.PostData("ClassList", data).success(function (response) {
                    
                    $scope.dataClassList = response;                    
                    $scope.dataClassNoList = response;
                    $scope.modelGrade = "";
                    $scope.modelClassNo = "";
                    //console.log($scope.dataClassList);
                    //console.log($scope.dataClassNoList);
                })
                .error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });
            };
            //console.log($scope.modelSemesterYear);
            $scope.SemesterYearChange($scope.modelSemesterYear); //指定當前學期

            //選擇學年度、年級時，連動班級
            $scope.GradeChange = function (SemesterYear, Grade) {
                var data = $.param({ Action: "SELECT", Semester: SemesterYear, grade: Grade });
                postService.PostData("ClassList", data).success(function (response) {
                    $scope.dataClassNoList = response;
                    $scope.modelClassNo = "";
                    //console.log($scope.dataClassList);
                })
                .error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });
            };

            

            //搜尋班級學生清單
            $scope.SearchStuList = function (SemesterYear, Grade, ClassNo) {
                $scope.watermarkList = "";
                $scope.watermark = "";

                if ((SemesterYear === undefined || SemesterYear === "")) {
                    document.getElementById('Office_list_hint').innerHTML = "#請選擇「學期」，再按查詢!";
                    $scope.hiddenStudentList = {
                        "display": "none"
                    };
                    $scope.hiddenCounselingRec = {
                        "display": "none"
                    };
                    $scope.hiddenInterestAbility = {
                        "display": "none"
                    };
                    $scope.hiddenCounsInterview = { 
                        "display": "none"
                    };
                    return false;
                }
                if ((Grade === undefined || Grade === "")) {
                    document.getElementById('Office_list_hint').innerHTML = "#請選擇「年級」，再按查詢!";
                    $scope.hiddenStudentList = {
                        "display": "none"
                    };
                    $scope.hiddenCounselingRec = {
                        "display": "none"
                    };
                    $scope.hiddenInterestAbility = {
                        "display": "none"
                    };
                    $scope.hiddenCounsInterview = { 
                        "display": "none"
                    };
                    return false;
                }
                if ((ClassNo === undefined || ClassNo === "")) {
                    document.getElementById('Office_list_hint').innerHTML = "#請選擇「班級」，再按查詢!";
                    $scope.hiddenStudentList = {
                        "display": "none"
                    };
                    $scope.hiddenCounselingRec = {
                        "display": "none"
                    };
                    $scope.hiddenInterestAbility = {
                        "display": "none"
                    };
                    $scope.hiddenCounsInterview = {
                        "display": "none"
                    };
                    return false;
                }

                $scope.hiddenStudentList = {
                    "display": "none"
                };
                $scope.hiddenCounselingRec = {
                    "display": "none"
                };
                $scope.hiddenInterestAbility = {
                    "display": "none"
                };
                $scope.hiddenCounsInterview = {
                    "display": "none"
                };

                var data = $.param({
                    Grade: Grade,
                    ClassNo: ClassNo,
                    Semester: SemesterYear
                });

                $scope.StudentList = [];

                postService.PostData("SchBusiness", data).success(function (response) {
                      if (response.length < 1) {
                          document.getElementById('Office_list_hint').innerHTML = "#查無此資料，請確認查詢條件是否正確";
                          $scope.hiddenStudentList = {
                              "display": "none"
                          };
                          $scope.hiddenCounselingRec = {
                              "display": "none"
                          };
                          $scope.hiddenInterestAbility = {
                              "display": "none"
                          };
                          $scope.hiddenCounsInterview = {
                              "display": "none"
                          };
                          $scope.watermarkList = "";
                      }
                      else {
                          $scope.hiddenStudentList = {
                              "visibility": "visible"
                          };
                          document.getElementById('Office_list_hint').innerHTML = "";
                          $scope.StudentList = response;
                          $scope.saveSemester = SemesterYear.substring(0, 3) + "1";
                          $scope.saveGrade = Grade;
                          $scope.saveClassNo = ClassNo;

                          var toDay = new Date();
                          $scope.watermarkList = userInfo[0].UserName + "    " + userInfo[0].UnitName + "   " + padLeft(toDay.getFullYear().toString(), 4) + "/" + padLeft((toDay.getMonth() + 1).toString(), 2) + "/" + padLeft(toDay.getDate().toString(), 2) + " " + padLeft(toDay.getHours().toString(), 2) + ":" + padLeft(toDay.getMinutes().toString(), 2) + ":" + padLeft(toDay.getSeconds().toString(), 2);

                      }
                  })
                  .error(function (data, status, headers, config) {
                      //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                      //$("#Error_confirm").appendTo("body").modal('show');
                      $("#Error_confirm").modal({ backdrop: 'static' });
                      document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                  });

            };

            //搜尋班級學生清單
            $scope.StudentDetail = function (StudIDNo, SeatNum, Id) {
                $scope.clickStu = Id;
                var num = Id + 1;
                var Id = 'StuItem' + num;
                var section = document.getElementsByClassName('list-group-item StuActive');
                //console.log(section);
                for (var i = 0; i < section.length; i++) {
                    document.getElementsByClassName('list-group-item StuActive')[i].className = 'list-group-item StuNormal';
                }

                document.getElementById(Id).className = "list-group-item StuActive";

                document.getElementById('alert_save').innerHTML = "";


                //儲存查詢的學生資訊
                $scope.saveStudIDNo = StudIDNo;
                $scope.saveSeatNum = SeatNum;
                $scope.saveGradeByClick = $scope.saveGrade;
                $scope.saveSemesterByClick = $scope.saveSemester;


                //輔導資料紀錄表
                getCounselingRecWithData(StudIDNo, $scope.saveSemester, $scope.saveGrade, $scope.saveClassNo);
                

                //興趣及特殊才能調查表
                getInterestAbilityWithData($scope.saveSemester, StudIDNo, $scope.saveGrade);

                //輔導訪談紀錄
                //console.log($scope.saveSemester + "-" + StudIDNo + "-" + $scope.saveGrade + "-" + $scope.saveClassNo + "-" + SeatNum);
                getCounsInterviewTableData($scope.saveSemester, StudIDNo, $scope.saveGrade, $scope.saveClassNo, SeatNum);
                

            };

            //輔導資料紀錄表
            function getCounselingRecWithData(StudIDNo, SemesterYear, Grade, ClassNo) {
                var data = $.param({
                    StudIDNo: StudIDNo,
                    Semester: SemesterYear,
                    Grade: Grade,
                    ClassNo: ClassNo
                });
                postService.PostData("CounselingRecSearch", data).success(function (response) {
                    if (response.length < 1) {
                        //document.getElementById('Office_list_hint').innerHTML = "#查無此資料，請確認查詢條件是否正確"
                        getNewCounselingRecTable();

                        //console.log($scope.clickModel);

                        if ($scope.clickModel == "1") {
                            $scope.btnAddHidden = {
                                "visibility": "visible"
                            };
                            $scope.btnUpdateHidden = {
                                "display": "none"
                            };

                            $scope.btnAddInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnAddCounsInterviewHidden = {
                                "display": "none"
                            }
                        }
                    }
                    else {
                        getNewCounselingRecTable();
                        getTableCounselingRecWithData(response);

                        if ($scope.clickModel == "1") {
                            $scope.btnAddHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateHidden = {
                                "visibility": "visible"
                            };
                            $scope.btnAddInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnAddCounsInterviewHidden = {
                                "display": "none"
                            }
                        }

                    }
                    $scope.iniGrade = $scope.saveGrade; //各年級歷史資料 

                    $scope.saveCounselingRecData = response;
                })
                .error(function (data, status, headers, config) {
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });
            }

            //興趣及特殊才能調查表
            function getInterestAbilityWithData(SemesterYear, StudIDNo, Grade) {
                var iadata = $.param({
                    Semester: SemesterYear,
                    StudIDNo: StudIDNo,
                    Grade: Grade
                });

                postService.PostData("InterestAbilitySearch", iadata).success(function (response) {
                    //console.log(response);

                    if (response.length < 1) {
                        $scope.InterestSkill = "";
                        $scope.StudAbility = "";
                        $scope.TeaOpinion = "";
                        $scope.GroupAct = "";

                        if ($scope.clickModel == "2") {
                            $scope.btnAddHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateHidden = {
                                "display": "none"
                            };

                            $scope.btnAddInterestAbilityHidden = {
                                "visibility": "visible"
                            };
                            $scope.btnUpdateInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnAddCounsInterviewHidden = {
                                "display": "none"
                            }
                        }
                    }
                    else {

                        $scope.InterestSkill = response[0].InterestSkill;
                        $scope.StudAbility = response[0].StudAbility;
                        $scope.TeaOpinion = response[0].TeaOpinion;
                        $scope.GroupAct = response[0].GroupAct;

                        if ($scope.clickModel == "2") {
                            $scope.btnAddHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateHidden = {
                                "display": "none"
                            };
                            $scope.btnAddInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateInterestAbilityHidden = {
                                "visibility": "visible"
                            };
                            $scope.btnAddCounsInterviewHidden = {
                                "display": "none"
                            }
                        }
                    }

                    $scope.saveInterestAbilityData = response;
                })
                .error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });
            }

            //輔導訪談紀錄
            function getCounsInterviewTableData(SemesterYear, StudIDNo, Grade, ClassNo, SeatNum) {
                
                //輔導訪談紀錄
                var cidata = $.param({
                    Semester: SemesterYear,
                    StudIDNo: StudIDNo,
                    StudGrade: Grade
                });

                postService.PostData("CounsInterviewSearch", cidata).success(function (response) {
                    //console.log(response);

                    if (response.length < 1) {
                        document.getElementById('Office_list_hint_CounsInterview').innerHTML = "#目前沒有訪談紀錄";
                        $scope.dataCounsInterview = response;
                        $scope.tableCounsInterviewHidden = {
                            "display": "none"
                        };

                        if ($scope.clickModel == "3") {
                            $scope.btnAddHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateHidden = {
                                "display": "none"
                            };

                            $scope.btnAddInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnAddCounsInterviewHidden = {
                                "visibility": "visible"
                            }
                        }
                        $scope.watermark = "";
                    }
                    else {
                        document.getElementById('Office_list_hint_CounsInterview').innerHTML = "";

                        //顯示table 資料+頁碼
                        $scope.tableCounsInterviewHidden = {
                            "visibility": "visibility"
                        };
                        $scope.dataCounsInterview = response;
                        $scope.totalItems = $scope.dataCounsInterview.length;
                        $scope.currentPage = 1;
                        $scope.itemsPerPage = $scope.viewby;
                        $scope.maxSize = 5; //Number of pager buttons to show
                        $scope.setPage = function (pageNo) {
                            $scope.currentPage = '1';
                        };
                        $scope.pageChanged = function () {
                            console.log('Page changed to: ' + $scope.currentPage);
                        };
                        $scope.setItemsPerPage = function (num) {
                            $scope.itemsPerPage = num;
                            $scope.currentPage = 1; //reset to first paghe
                        }

                        //頁籤顯示按鈕
                        if ($scope.clickModel == "3") {
                            $scope.btnAddHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateHidden = {
                                "display": "none"
                            };
                            $scope.btnAddInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnAddCounsInterviewHidden = {
                                "visibility": "visible"
                            }
                            
                            var toDay = new Date();
                            $scope.watermark = userInfo[0].UserName + "    " + userInfo[0].UnitName + "   " + padLeft(toDay.getFullYear().toString(), 4) + "/" + padLeft((toDay.getMonth() + 1).toString(), 2) + "/" + padLeft(toDay.getDate().toString(), 2) + " " + padLeft(toDay.getHours().toString(), 2) + ":" + padLeft(toDay.getMinutes().toString(), 2) + ":" + padLeft(toDay.getSeconds().toString(), 2);
                        }

                    }

                    $scope.saveCounsInterviewData = response;
                })
                .error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });
            }

            

            function getTableCounselingRecWithData(response) {
                

                //學前教育
                var strKindergarten = response[0].Kindergarten.split("┴");
                if (strKindergarten.length === 1) $scope.Kindergarten = response[0].Kindergarten;
                else {
                    $scope.Kindergarten = strKindergarten[0];
                    $scope.KindergartenYears = strKindergarten[1];
                }
                //父母關係               
                var strParentsRelation = response[0].ParentsRelation.split("┴");
                if (strParentsRelation.length === 1) $scope.ParentsRelation = response[0].ParentsRelation;
                else {
                    $scope.hiddenParentsRelationElse = {//父母關係 其他
                        "visibility": "visible"
                    };
                    $scope.ParentsRelation = strParentsRelation[0];
                    $scope.ParentsRelationElse = strParentsRelation[1]; //父母關係-其他
                }

                $scope.FamiAtmosphere = response[0].FamiAtmosphere;//家庭氣氛
                $scope.DadDiscipline = response[0].DadDiscipline;//父管教方式
                $scope.MomDiscipline = response[0].MomDiscipline;//母管教方式

                //居住環境
                var strLivingEnv = response[0].LivingEnv.split("┬");

                //Button的Class       
                $scope.getLivingEnvClass = function (clickcodeId) {
                    var activeClass = "";
                    var lstClass = [];
                    var temp = "";
                    for (var i = 0; i < strLivingEnv.length; i++) {
                        if (clickcodeId == strLivingEnv[i].substring(0, 2)) {
                            activeClass = '{ "btn active": true }';
                            temp = angular.fromJson(activeClass);
                            lstClass.push(temp);
                            return lstClass;
                        }
                    }
                };

                for (var i = 0; i < strLivingEnv.length; i++) {
                    //$scope.LivingEnvClick(strLivingEnv[i]);                    
                    if ($scope.LivingEnv != "") $scope.LivingEnv += "┬";

                    if (strLivingEnv[i].indexOf("┴") !== -1) {
                        $scope.LivingEnv += strLivingEnv[i].substring(0, 2) + "┴";
                        //console.log(strLivingEnv[i]);
                        var strLivingEnvElse = strLivingEnv[i].split("┴");
                        if (strLivingEnvElse.length > 0) {
                            $scope.LivingEnvElse = strLivingEnvElse[1];//居住環境-其他
                            $scope.LivingEnvShow = true;
                            $scope.hiddenLivingEnvElse = {//居住環境-其他
                                "visibility": "visible"
                            };
                        }
                    }
                    else {
                        $scope.LivingEnv += strLivingEnv[i];
                    }
                }
                //console.log($scope.LivingEnv);
                //console.log($scope.LivingEnvElse);
                //本人住宿(居住情形)
                var strLiving = response[0].Living.split("┬");
                //Button的Class       
                $scope.getLivingClass = function (clickcodeId) {
                    var activeClass = "";
                    var lstClass = [];
                    var temp = "";
                    for (var i = 0; i < strLiving.length; i++) {
                        if (clickcodeId == strLiving[i].substring(0, 2)) {
                            activeClass = '{ "btn active": true }';
                            temp = angular.fromJson(activeClass);
                            lstClass.push(temp);
                            return lstClass;
                        }
                    }
                };

                for (var i = 0; i < strLiving.length; i++) {
                    //$scope.LivingClick(strLivingEnv[i]);
                    if ($scope.Living != "") $scope.Living += "┬";

                    if (strLiving[i].indexOf("┴") !== -1) {
                        $scope.Living += strLiving[i].substring(0, 2) + "┴";
                        var strLivingElse = strLiving[i].split("┴");
                        if (strLivingElse.length > 0) {
                            $scope.LivingElse = strLivingElse[1];//居住環境-其他
                            $scope.LivingShow = true;
                            $scope.hiddenLivingElse = {//居住環境 其他
                                "visibility": "visible"
                            };
                        }
                    }
                    else {
                        $scope.Living += strLiving[i];
                    }
                }
                //console.log($scope.Living);
                //console.log($scope.LivingElse);

                $scope.EconomicSitu = response[0].EconomicSitu;//經濟環境

                //喜歡的科目(至少選三項)
                var strFavoriteSubj = response[0].FavoriteSubj.split(",");
                $scope.FavoriteSubj = response[0].FavoriteSubj;

                //Button的Class       
                $scope.getFavoriteSubjClass = function (clickcodeId) {
                    var activeClass = "";
                    var lstClass = [];
                    var temp = "";
                    for (var i = 0; i < strFavoriteSubj.length; i++) {
                        if (clickcodeId == strFavoriteSubj[i]) {
                            activeClass = '{ "btn active": true }';
                            temp = angular.fromJson(activeClass);
                            lstClass.push(temp);
                            return lstClass;
                        }

                    }

                };

                //感到困難的科目(至少選三項)
                var strDifficultSubj = response[0].DifficultSubj.split(",");
                $scope.DifficultSubj = response[0].DifficultSubj;

                //Button的Class
                $scope.getDifficultSubjClass = function (clickcodeId) {
                    var activeClass = "";
                    var lstClass = [];
                    var temp = "";
                    for (var i = 0; i < strDifficultSubj.length; i++) {
                        if (clickcodeId == strDifficultSubj[i]) {
                            activeClass = '{ "btn active": true }';
                            temp = angular.fromJson(activeClass);
                            lstClass.push(temp);
                            return lstClass;
                        }
                    }
                };
                //console.log($scope.DifficultSubj);

                //特殊才能(至多選三項)
                var strTalent = response[0].Talent.split("┬");
                //Button的Class
                $scope.getTalentClass = function (clickcodeId) {
                    var activeClass = "";
                    var lstClass = [];
                    var temp = "";
                    for (var i = 0; i < strTalent.length; i++) {
                        if (clickcodeId == strTalent[i].substring(0,2)) {
                            activeClass = '{ "btn active": true }';
                            temp = angular.fromJson(activeClass);
                            lstClass.push(temp);
                            return lstClass;
                        }
                    }
                };

                for (var i = 0; i < strTalent.length; i++) {
                    
                    if ($scope.Talent != "") $scope.Talent += "┬";

                    if (strTalent[i].indexOf("┴") !== -1) {                        

                        if (strTalent[i].substring(0, 2) == "04") {
                            $scope.Talent += strTalent[i].substring(0, 2) + "╧";
                            var strTalentMartialArts = strTalent[i].split("┴");
                            if (strTalentMartialArts.length > 0) {
                                $scope.TalentMartialArts = strTalentMartialArts[1];//特殊才能(至多選三項)-武術
                                $scope.TalentMartialArtsShow = true;
                                $scope.hiddenTalentMartialArts = {//特殊才能(至多選三項)-武術
                                    "visibility": "visible"
                                };
                            }
                        }

                        if (strTalent[i].substring(0, 2) == "06") {
                            $scope.Talent += strTalent[i].substring(0, 2) + "╩";
                            var strTalentMusical = strTalent[i].split("┴");
                            if (strTalentMusical.length > 0) {
                                $scope.TalentMusical = strTalentMusical[1];//特殊才能(至多選三項)-樂器演奏
                                $scope.TalentMusicalShow = true;
                                $scope.hiddenTalentMusical = {//特殊才能(至多選三項)-樂器演奏
                                    "visibility": "visible"
                                };
                            }
                        }

                        if (strTalent[i].substring(0, 2) == "22") {
                            $scope.Talent += strTalent[i].substring(0, 2) + "┴";
                            var strTalentElse = strTalent[i].split("┴");
                            if (strTalentElse.length > 0) {
                                $scope.TalentElse = strTalentElse[1];//特殊才能(至多選三項)-其他
                                $scope.TalentElseShow = true;
                                $scope.hiddenTalentElse = {//特殊才能(至多選三項)-其他
                                    "visibility": "visible"
                                };
                            }
                        }

                    }
                    else {
                        $scope.Talent += strTalent[i].substring(0, 2);
                    }
                }
                //console.log($scope.Talent);
                //$scope.Talent = "";
                //$scope.TalentElse = "";//特殊才能(至多選三項)-其他
                //$scope.TalentMartialArts = ""; //特殊才能(至多選三項)-武術
                //$scope.TalentMusical = "";//特殊才能(至多選三項)-樂器演奏

                //休閒興趣(至多選三項)
                var strRecreation = response[0].Recreation.split("┬");

                //Button的Class
                $scope.getRecreationClass = function (clickcodeId) {
                    var activeClass = "";
                    var lstClass = [];
                    var temp = "";
                    for (var i = 0; i < strRecreation.length; i++) {
                        if (clickcodeId == strRecreation[i].substring(0, 2)) {
                            activeClass = '{ "btn active": true }';
                            temp = angular.fromJson(activeClass);
                            lstClass.push(temp);
                            return lstClass;
                        }
                    }
                };

                for (var i = 0; i < strRecreation.length; i++) {
                    //$scope.LivingClick(strLivingEnv[i]);
                    if ($scope.Recreation != "") $scope.Recreation += "┬";

                    if (strRecreation[i].indexOf("┴") !== -1) {
                        $scope.Recreation += strRecreation[i].substring(0, 2) + "┴";
                        var strRecreationElse = strRecreation[i].split("┴");
                        if (strRecreationElse.length > 0) {
                            $scope.RecreationElse = strRecreationElse[1];//休閒興趣(至多選三項)-其他
                            $scope.RecreationShow = true;
                            $scope.hiddenRecreationElse = {//休閒興趣(至多選三項)-其他
                                "visibility": "visible"
                            };
                        }
                    }
                    else {
                        $scope.Recreation += strRecreation[i];
                    }
                }
                //console.log($scope.Recreation);
                //console.log($scope.RecreationElse);

                $scope.ClassOfficer = response[0].ClassOfficer;//校內或班內職務
                $scope.LifeStyle = response[0].LifeStyle;//生活習慣
                $scope.PersonalRel = response[0].PersonalRel;//人際關係
                $scope.ExBehavior = response[0].ExBehavior;//外向行為
                $scope.InBehavior = response[0].InBehavior;//內向行為
                $scope.LearnBehavior = response[0].LearnBehavior;//學習行為
                $scope.BadHabit = response[0].BadHabit;//不良習慣
                $scope.Nervous = response[0].Nervous; //焦慮症狀
            }
            function getNewCounselingRecTable() {
                //$scope.saveGrade = 9;
                //各年級歷史資料
                var lstGrade = [];
                var temp = "";
                var jsonGrade = "";
                for (var i = 1; i <= $scope.saveGrade; i++) {
                    if ($scope.saveGrade > 6) {  //7、8、9年級
                        if (i > 6) {
                            jsonGrade = '{ "GradeID": ' + i + ' , "GradeName": "' + i + ' 年級" }';
                            temp = angular.fromJson(jsonGrade);
                            lstGrade.push(temp);
                        }
                    } else { //1、2、3、4、5、6年級
                        jsonGrade = '{ "GradeID": ' + i + ' , "GradeName": "' + i + ' 年級" }';
                        temp = angular.fromJson(jsonGrade);
                        lstGrade.push(temp);
                    }
                }
                //console.log(lstGrade);
                $scope.dataGrade = lstGrade;


                $scope.hiddenCounselingRec = { //編輯的Table(輔導資料紀錄表)
                    "visibility": "visible"
                };
                $scope.hiddenInterestAbility = { //編輯的Table(興趣及特殊才能調查表)
                    "visibility": "visible"
                };
                $scope.hiddenCounsInterview = { //編輯的Table(輔導訪談紀錄)
                    "visibility": "visible"
                };

                $scope.hiddenParentsRelationElse = {//父母關係 其他
                    "display": "none"
                };
                $scope.hiddenLivingEnvElse = {//居住環境 其他
                    "display": "none"
                };
                $scope.hiddenLivingElse = {//本人住宿(居住情形) 其他
                    "display": "none"
                };
                $scope.hiddenTalentMartialArts = {//特殊才能(至多選三項) 武術
                    "display": "none"
                };
                $scope.hiddenTalentMusical = {//特殊才能(至多選三項) 樂器演奏
                    "display": "none"
                };
                $scope.hiddenTalentElse = {//特殊才能(至多選三項) 其他
                    "display": "none"
                };                 
                $scope.hiddenRecreationElse = {//休閒興趣 (至多選三項) 其他
                    "display": "none"
                };

                $scope.Kindergarten = "";//學前教育
                $scope.KindergartenYears = "";//學前教育-年
                $scope.ParentsRelation = "";//父母關係
                $scope.ParentsRelationElse = "";//父母關係-其他
                $scope.FamiAtmosphere = "";//家庭氣氛

                $scope.DadDiscipline = "";//父管教方式
                $scope.MomDiscipline = "";//母管教方式
                $scope.LivingEnv = "";//居住環境
                $scope.LivingEnvElse = "";//居住環境-其他
                $scope.Living = "";//本人住宿(居住情形)
                $scope.LivingElse = "";//本人住宿(居住情形)-其他
                $scope.EconomicSitu = "";//經濟環境
                $scope.FavoriteSubj = "";//喜歡的科目(至少選三項)
                $scope.DifficultSubj = "";//喜歡的科目(至少選三項)
                $scope.Talent = "";//特殊才能(至多選三項)
                $scope.TalentElse = "";//特殊才能(至多選三項)-其他
                $scope.TalentMartialArts = ""; //特殊才能(至多選三項)-武術
                $scope.TalentMusical = "";//特殊才能(至多選三項)-樂器演奏
                $scope.Recreation = "";//休閒興趣(至多選三項)
                $scope.RecreationElse = "";//休閒興趣(至多選三項)-其他
                $scope.ClassOfficer = "";//校內或班內職務
                $scope.LifeStyle = "";//生活習慣
                $scope.PersonalRel = "";//人際關係
                $scope.ExBehavior = "";//外向行為
                $scope.InBehavior = "";//內向行為
                $scope.LearnBehavior = "";//學習行為
                $scope.BadHabit = "";//不良習慣
                $scope.Nervous = ""; //焦慮症狀

                document.getElementById('alert_FavoriteSubj').innerHTML = "";
                document.getElementById('alert_DifficultSubj').innerHTML = "";
                document.getElementById('alert_Talent').innerHTML = "";
                document.getElementById('alert_Recreation').innerHTML = "";

                //搜尋代碼表
                getService.GetData("GeneralCode").success(function (response) {
                    $scope.dataGeneralCode = response;
                    //console.log($scope.dataGeneralCode);
                })
                .error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });


                //居住環境
                //Button的Class       
                $scope.getLivingEnvClass = function (clickcodeId) {
                    return 'btn';
                };
                //本人住宿(居住情形)
                //Button的Class       
                $scope.getLivingClass = function (clickcodeId) {
                    return 'btn';
                };

                //喜歡的科目(至少選三項)
                //Button的Class       
                $scope.getFavoriteSubjClass = function (clickcodeId) {
                    return 'btn';

                };

                //感到困難的科目(至少選三項)
                //Button的Class
                $scope.getDifficultSubjClass = function (clickcodeId) {
                    return 'btn';
                };

                //特殊才能(至多選三項)
                //Button的Class
                $scope.getTalentClass = function (clickcodeId) {
                    return 'btn';
                };

                //休閒興趣(至多選三項)
                //Button的Class
                $scope.getRecreationClass = function (clickcodeId) {
                    return 'btn';
                };
            }

            ////////////////////////////////////test 寫完刪掉
            //var data = $.param({
            //    StudIDNo: "A123456788",
            //    Semester: "1051",
            //    Grade: "6",
            //    ClassNo: "01"
            //});
            //getNewCounselingRecTable();//test 寫完刪掉
            
            $scope.GradeClick = function (GradeID) {
                //各年級歷史資料
                var num = GradeID;
                var Id = 'GradeItem' + num;
                var section = document.getElementsByClassName('list-group2-item GradeActive');
                //console.log(section);
                for (var i = 0; i < section.length; i++) {
                    document.getElementsByClassName('list-group2-item GradeActive')[i].className = 'list-group2-item GradeNormal';
                }

                document.getElementById(Id).className = "list-group2-item GradeActive";
                

                $scope.iniGrade = GradeID; //Button的CSS預設點選
                $scope.saveGradeByClick = GradeID;

                var num = (parseInt($scope.saveGrade) - parseInt(GradeID) + "0"); //ex:1051-20 = 1031 (學年度)
                $scope.saveSemesterByClick = (parseInt($scope.saveSemester) - parseInt(num)).toString();

                //輔導資料紀錄表
                var data = $.param({
                    StudIDNo: $scope.saveStudIDNo,
                    Semester: $scope.saveSemesterByClick,
                    Grade: GradeID,
                    ClassNo: $scope.saveClassNo
                });
                postService.PostData("CounselingRecSearch", data).success(function (response) {
                    if (response.length < 1) {
                        //document.getElementById('Office_list_hint').innerHTML = "#查無此資料，請確認查詢條件是否正確"
                        getNewCounselingRecTable();

                        //console.log($scope.clickModel);

                        if ($scope.clickModel == "1") {
                            $scope.btnAddHidden = {
                                "visibility": "visible"
                            };
                            $scope.btnUpdateHidden = {
                                "display": "none"
                            };

                            $scope.btnAddInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnAddCounsInterviewHidden = {
                                "display": "none"
                            }
                        }
                    }
                    else {
                        getNewCounselingRecTable();
                        getTableCounselingRecWithData(response);

                        if ($scope.clickModel == "1") {
                            $scope.btnAddHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateHidden = {
                                "visibility": "visible"
                            };
                            $scope.btnAddInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnAddCounsInterviewHidden = {
                                "display": "none"
                            }
                        }

                    }
                    //儲存查詢的學生資訊
                    $scope.saveCounselingRecData = response;
                })
                .error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });

                //興趣及特殊才能調查表
                var iadata = $.param({
                    Semester: $scope.saveSemesterByClick,
                    StudIDNo: $scope.saveStudIDNo,
                    grade: GradeID
                });

                postService.PostData("InterestAbilitySearch", iadata).success(function (response) {
                    //console.log(response);

                    if (response.length < 1) {
                        $scope.InterestSkill = "";
                        $scope.StudAbility = "";
                        $scope.TeaOpinion = "";
                        $scope.GroupAct = "";

                        if ($scope.clickModel == "2") {
                            $scope.btnAddHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateHidden = {
                                "display": "none"
                            };

                            $scope.btnAddInterestAbilityHidden = {
                                "visibility": "visible"
                            };
                            $scope.btnUpdateInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnAddCounsInterviewHidden = {
                                "display": "none"
                            }
                        }
                    }
                    else {

                        $scope.InterestSkill = response[0].InterestSkill;
                        $scope.StudAbility = response[0].StudAbility;
                        $scope.TeaOpinion = response[0].TeaOpinion;
                        $scope.GroupAct = response[0].GroupAct;

                        if ($scope.clickModel == "2") {
                            $scope.btnAddHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateHidden = {
                                "display": "none"
                            };
                            $scope.btnAddInterestAbilityHidden = {
                                "display": "none"
                            };
                            $scope.btnUpdateInterestAbilityHidden = {
                                "visibility": "visible"
                            };
                            $scope.btnAddCounsInterviewHidden = {
                                "display": "none"
                            }
                        }
                    }

                    //儲存查詢的學生資訊
                    $scope.saveInterestAbilityData = response;
                })
                .error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });

            };

            //學前教育
            $scope.KindergartenClick = function () {
                $scope.KindergartenYears = "";
            };
            //父母關係
            $scope.ParentsRelationClick = function (codeId, codeName) {
                if (codeName === "其他") {
                    $scope.hiddenParentsRelationElse = {
                        "visibility": "visible"
                    };
                    $scope.ParentsRelation = codeId + "┴" ;
                } else {
                    $scope.hiddenParentsRelationElse = {
                        "display": "none"
                    };
                    $scope.ParentsRelation = codeId;
                    $scope.ParentsRelationElse = "";
                }
                
            };
            //家庭氣氛
            $scope.FamiAtmosphereClick = function (codeId, codeName) {
                $scope.FamiAtmosphere = codeId;
            };
            //父管教方式
            $scope.DadDisciplineClick = function (codeId, codeName) {
                $scope.DadDiscipline = codeId;
            };
            //母管教方式
            $scope.MomDisciplineClick = function (codeId, codeName) {
                $scope.MomDiscipline = codeId;
            };
            //居住環境
            $scope.LivingEnv = "";
            $scope.LivingEnvClick = function (codeId, codeName) {
                if ($scope.LivingEnv.indexOf(codeId) == -1) { //選的內容不是重複的 ex:選01->01
                    if ($scope.LivingEnv != "") $scope.LivingEnv += "┬";
                    $scope.LivingEnv += codeId;
                }
                else {//選的內容有重複的
                    if ($scope.LivingEnv.indexOf("┬") == -1) { //選得時候，內容只有一個 ex:選01-> 清空沒東西
                        $scope.LivingEnv = $scope.LivingEnv.replace(codeId, "");
                        if (codeName === "其他") $scope.LivingEnv = $scope.LivingEnv.replace("┴", "");
                    }
                    else {//選得時候，內容有多個
                        if ($scope.LivingEnv.search(codeId) == 0) {//選得時候，內容在第一個  ex:選01，01,02,03-> 02,03                            
                            if (codeName === "其他") $scope.LivingEnv = $scope.LivingEnv.replace(codeId + "┴┬", "");
                            else $scope.LivingEnv = $scope.LivingEnv.replace(codeId + "┬", "");
                        } else {//選得時候，內容不在第一個 ex:選02，01,02,03-> 01,03                            
                            if (codeName === "其他") $scope.LivingEnv = $scope.LivingEnv.replace("┬" + codeId + "┴", "");
                            else $scope.LivingEnv = $scope.LivingEnv.replace("┬" + codeId, "");
                        }
                    }
                }

                if (codeName === "其他") {
                    if ($scope.LivingEnvShow == true) {
                        $scope.LivingEnvShow = false;
                        $scope.hiddenLivingEnvElse = {
                            "display": "none"
                        };

                        $scope.LivingEnvElse = ""; //清空
                    }
                    else {
                        $scope.LivingEnvShow = true;
                        $scope.hiddenLivingEnvElse = {
                            "visibility": "visible"
                        };
                        $scope.LivingEnv = $scope.LivingEnv + "┴";
                    }
                }
                //console.log($scope.LivingEnv);
            };

            //本人住宿(居住情形)
            $scope.Living = "";
            $scope.LivingClick = function (codeId, codeName) {
                if ($scope.Living.indexOf(codeId) == -1) { //選的內容不是重複的 ex:選01->01
                    if ($scope.Living != "") $scope.Living += "┬";
                    $scope.Living += codeId;
                }
                else {//選的內容有重複的
                    if ($scope.Living.indexOf("┬") == -1) { //選得時候，內容只有一個 ex:選01-> 清空沒東西
                        $scope.Living = $scope.Living.replace(codeId, "");
                        if (codeName === "其他") $scope.Living = $scope.Living.replace("┴", "");
                    }
                    else {//選得時候，內容有多個
                        if ($scope.Living.search(codeId) == 0) {//選得時候，內容在第一個  ex:選01，01,02,03-> 02,03                            
                            if (codeName === "其他") $scope.Living = $scope.Living.replace(codeId + "┴┬", "");
                            else $scope.Living = $scope.Living.replace(codeId + "┬", "");
                        } else {//選得時候，內容不在第一個 ex:選02，01,02,03-> 01,03                            
                            if (codeName === "其他") $scope.Living = $scope.Living.replace("┬" + codeId + "┴", "");
                            else $scope.Living = $scope.Living.replace("┬" + codeId, "");
                        }
                    }
                }

                if (codeName === "其他") {
                    if ($scope.LivingShow == true) {
                        $scope.LivingShow = false;
                        $scope.hiddenLivingElse = {
                            "display": "none"
                        };
                        
                        $scope.LivingElse = "";
                    }
                    else {
                        $scope.LivingShow = true;
                        $scope.hiddenLivingElse = {
                            "visibility": "visible"
                        };
                        $scope.Living = $scope.Living + "┴";
                    }
                }
               // console.log($scope.Living);
            };
            //經濟環境
            $scope.EconomicSituClick = function (codeId, codeName) {
                $scope.EconomicSitu = codeId;
            };
            //喜歡的科目(至少選三項)
            $scope.FavoriteSubj = "";
            $scope.FavoriteSubjClick = function (codeId, codeName, click) {
                if ($scope.FavoriteSubj.indexOf(codeId) == -1) { //選的內容不是重複的 ex:選01->01
                    if ($scope.FavoriteSubj != "") $scope.FavoriteSubj += ",";
                    $scope.FavoriteSubj += codeId;
                }
                else {//選的內容有重複的
                    if ($scope.FavoriteSubj.indexOf(",") == -1) { //選得時候，內容只有一個 ex:選01-> 清空沒東西
                        $scope.FavoriteSubj = $scope.FavoriteSubj.replace(codeId, "");
                    }
                    else {//選得時候，內容有多個
                        if ($scope.FavoriteSubj.search(codeId) == 0) {//選得時候，內容在第一個  ex:選01，01,02,03-> 02,03
                            $scope.FavoriteSubj = $scope.FavoriteSubj.replace(codeId + ",", "");
                        } else {//選得時候，內容不在第一個 ex:選02，01,02,03-> 01,03
                            $scope.FavoriteSubj = $scope.FavoriteSubj.replace("," + codeId, "");
                        }
                    }
                }

                if ($scope.FavoriteSubj.length < 8) {
                    document.getElementById('alert_FavoriteSubj').innerHTML = "#喜歡的科目，至少選三項!";
                }
                else {
                    document.getElementById('alert_FavoriteSubj').innerHTML = ""
                }

                //console.log($scope.FavoriteSubj);
            };
            //感到困難的科目(至少選三項)
            $scope.DifficultSubj = "";
            $scope.DifficultSubjClick = function (codeId, codeName) {
                if ($scope.DifficultSubj.indexOf(codeId) == -1) { //選的內容不是重複的 ex:選01->01
                    if ($scope.DifficultSubj != "") $scope.DifficultSubj += ",";
                    $scope.DifficultSubj += codeId;
                }
                else {//選的內容有重複的
                    if ($scope.DifficultSubj.indexOf(",") == -1) { //選得時候，內容只有一個 ex:選01-> 清空沒東西
                        $scope.DifficultSubj = $scope.DifficultSubj.replace(codeId, "");
                    }
                    else {//選得時候，內容有多個
                        if ($scope.DifficultSubj.search(codeId) == 0) {//選得時候，內容在第一個  ex:選01，01,02,03-> 02,03
                            $scope.DifficultSubj = $scope.DifficultSubj.replace(codeId + ",", "");
                        } else {//選得時候，內容不在第一個 ex:選02，01,02,03-> 01,03
                            $scope.DifficultSubj = $scope.DifficultSubj.replace("," + codeId, "");
                        }
                    }
                }

                if ($scope.DifficultSubj.length < 8) {
                    document.getElementById('alert_DifficultSubj').innerHTML = "#感到困難的科目，至少選三項!";
                }
                else {
                    document.getElementById('alert_DifficultSubj').innerHTML = ""
                }
                //console.log($scope.DifficultSubj);
            };

            //特殊才能(至多選三項)
            $scope.Talent = "";
            $scope.TalentClick = function (codeId, codeName) {
                if ($scope.Talent.indexOf(codeId) == -1) { //選的內容不是重複的 ex:選01->01
                    if ($scope.Talent != "") $scope.Talent += "┬";
                    $scope.Talent += codeId;
                }
                else {//選的內容有重複的
                    if ($scope.Talent.indexOf("┬") == -1) { //選得時候，內容只有一個 ex:選01-> 清空沒東西
                        $scope.Talent = $scope.Talent.replace(codeId, "");
                        if (codeName === "其他") $scope.Talent = $scope.Talent.replace("┴", "");
                        if (codeName === "武術") $scope.Talent = $scope.Talent.replace("╧", "");
                        if (codeName === "樂器演奏") $scope.Talent = $scope.Talent.replace("╩", "");
                    }
                    else {//選得時候，內容有多個
                        if ($scope.Talent.search(codeId) == 0) {//選得時候，內容在第一個  ex:選01，01,02,03-> 02,03
                            if (codeName === "其他") $scope.Talent = $scope.Talent.replace(codeId + "┴┬", "");
                            else if (codeName === "武術") $scope.Talent = $scope.Talent.replace(codeId + "╧┬", "");
                            else if (codeName === "樂器演奏") $scope.Talent = $scope.Talent.replace(codeId + "╩┬", "");
                            else $scope.Talent = $scope.Talent.replace(codeId + "┬", "");
                            
                        } else {//選得時候，內容不在第一個 ex:選02，01,02,03-> 01,03
                            if (codeName === "其他") $scope.Talent = $scope.Talent.replace("┬" + codeId + "┴", "");
                            else if (codeName === "武術") $scope.Talent = $scope.Talent.replace("┬" + codeId + "╧", "");
                            else if (codeName === "樂器演奏") $scope.Talent = $scope.Talent.replace("┬" + codeId + "╩", "");
                            else $scope.Talent = $scope.Talent.replace("┬" + codeId, "");
                        }
                    }
                }
                if (codeName === "其他") {
                    
                    if ($scope.TalentElseShow == true) {
                        $scope.TalentElseShow = false;
                        $scope.hiddenTalentElse = {
                            "display": "none"
                        };
                        $scope.TalentElse = "";//清空
                    }
                    else {
                        $scope.TalentElseShow = true;
                        $scope.hiddenTalentElse = {
                            "visibility": "visible"
                        };

                        $scope.Talent = $scope.Talent + "┴";
                    }
                }

                if (codeName === "武術") {

                    if ($scope.TalentMartialArtsShow == true) {
                        $scope.TalentMartialArtsShow = false;
                        $scope.hiddenTalentMartialArts = {
                            "display": "none"
                        };
                        $scope.TalentMartialArts = ""; //清空
                    }
                    else {
                        $scope.TalentMartialArtsShow = true;
                        $scope.hiddenTalentMartialArts = {
                            "visibility": "visible"
                        };
                        $scope.Talent = $scope.Talent + "╧"; 
                    }
                }

                if (codeName === "樂器演奏") {

                    if ($scope.TalentMusicalShow == true) {
                        $scope.TalentMusicalShow = false;
                        $scope.hiddenTalentMusical = {
                            "display": "none"
                        };
                        $scope.TalentMusical = "";//清空
                    }
                    else {
                        $scope.TalentMusicalShow = true;
                        $scope.hiddenTalentMusical = {
                            "visibility": "visible"
                        };
                        $scope.Talent = $scope.Talent + "╩";
                    }
                }

                if ($scope.Talent.replace("┴", "").replace("╧", "").replace("╩", "").length > 8) {
                    document.getElementById('alert_Talent').innerHTML = "#特殊才能，至多選三項!"
                }
                else {
                    document.getElementById('alert_Talent').innerHTML = ""
                }
                //console.log($scope.Talent);
            };

            //休閒興趣(至多選三項)
            $scope.Recreation = "";
            $scope.RecreationClick = function (codeId, codeName) {
                if ($scope.Recreation.indexOf(codeId) == -1) { //選的內容不是重複的 ex:選01->01
                    if ($scope.Recreation != "") $scope.Recreation += "┬";
                    $scope.Recreation += codeId;
                }
                else {//選的內容有重複的
                    if ($scope.Recreation.indexOf("┬") == -1) { //選得時候，內容只有一個 ex:選01-> 清空沒東西
                        $scope.Recreation = $scope.Recreation.replace(codeId, "");
                        if (codeName === "其他") $scope.Recreation = $scope.Recreation.replace("┴", "");
                    }
                    else {//選得時候，內容有多個
                        if ($scope.Recreation.search(codeId) == 0) {//選得時候，內容在第一個  ex:選01，01,02,03-> 02,03
                            if (codeName === "其他") $scope.Recreation = $scope.Recreation.replace(codeId + "┴┬", "");
                            else $scope.Recreation = $scope.Recreation.replace(codeId + "┬", "");
                        } else {//選得時候，內容不在第一個 ex:選02，01,02,03-> 01,03
                            if (codeName === "其他") $scope.Recreation = $scope.Recreation.replace("┬" + codeId + "┴", "");
                            else $scope.Recreation = $scope.Recreation.replace("┬" + codeId, "");
                        }
                    }
                }

                if (codeName === "其他") {

                    if ($scope.RecreationShow == true) {
                        $scope.RecreationShow = false;
                        $scope.hiddenRecreationElse = {
                            "display": "none"
                        };
                        $scope.RecreationElse = "";
                    }
                    else {
                        $scope.RecreationShow = true;
                        $scope.hiddenRecreationElse = {
                            "visibility": "visible"
                        };
                        $scope.Recreation = $scope.Recreation + "┴";
                    }
                }
                //console.log($scope.Recreation);
                if ($scope.Recreation.replace("┴", "").length > 8) {
                    document.getElementById('alert_Recreation').innerHTML = "#休閒興趣，至多選三項!"
                }
                else {
                    document.getElementById('alert_Recreation').innerHTML = ""
                }
            };

            //生活習慣
            $scope.LifeStyleClick = function (codeId, codeName) {
                $scope.LifeStyle = codeId;
            };
            //人際關係
            $scope.PersonalRelClick = function (codeId, codeName) {
                $scope.PersonalRel = codeId;
            };
            //外向行為
            $scope.ExBehaviorClick = function (codeId, codeName) {
                $scope.ExBehavior = codeId;
            };
            //內向行為
            $scope.InBehaviorClick = function (codeId, codeName) {
                $scope.InBehavior = codeId;
            };
            //學習行為
            $scope.LearnBehaviorClick = function (codeId, codeName) {
                $scope.LearnBehavior = codeId;
            };
            //不良習慣
            $scope.BadHabitClick = function (codeId, codeName) {
                $scope.BadHabit = codeId;
            };
            //焦慮症狀
            $scope.NervousClick = function (codeId, codeName) {
                $scope.Nervous = codeId;
            };
            //新增儲存
            $scope.add = function () {


                //check檢查

                //學前教育
                var strKindergarten = "";
                if ($scope.Kindergarten === "1") strKindergarten = $scope.Kindergarten + "┴" + $scope.KindergartenYears;
                else strKindergarten = $scope.Kindergarten;

                if (strKindergarten.indexOf("┴") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.KindergartenYears === "" || $scope.KindergartenYears === undefined) {
                        document.getElementById('alert_save').innerHTML = "#學前教育，請填寫曾進幼稚園幾年!";
                        return false;
                    }
                    else if (isNaN($scope.KindergartenYears)) {
                        document.getElementById('alert_save').innerHTML += " #學前教育，曾進幼稚園幾年請填寫數字!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                    }

                }

                //父母關係

                var strParentsRelation = "";
                if ($scope.ParentsRelation !== undefined) strParentsRelation = $scope.ParentsRelation;

                if (strParentsRelation.indexOf("┴") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.ParentsRelationElse === "" || $scope.ParentsRelationElse === undefined) {
                        document.getElementById('alert_save').innerHTML = "#父母關係，「其他」值不可為空!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                        $scope.ParentsRelation = $scope.ParentsRelation + $scope.ParentsRelationElse;
                    }
                }

                //居住環境
                var strLivingEnv = "";
                if ($scope.LivingEnv !== undefined) strLivingEnv = $scope.LivingEnv;

                if (strLivingEnv.indexOf("┴") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.LivingEnvElse === "" || $scope.LivingEnvElse === undefined) {
                        document.getElementById('alert_save').innerHTML = "#居住環境，「其他」值不可為空!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                        //$scope.LivingEnv = $scope.LivingEnv.replace("┴", "┴" + $scope.LivingEnvElse);
                    }
                }
                //console.log($scope.LivingEnv.replace("┴", "┴" + $scope.LivingEnvElse));
                //return false;

                //本人住宿(居住情形)
                var strLiving = "";

                if ($scope.Living !== undefined) strLiving = $scope.Living;

                if (strLiving.indexOf("┴") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.LivingElse === "" || $scope.LivingElse === undefined) {
                        document.getElementById('alert_save').innerHTML = "#本人住宿(居住情形)，「其他」值不可為空!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                        //$scope.Living = $scope.Living.replace("┴", "┴" + $scope.LivingElse);
                    }

                }

                //喜歡的科目(至少選三項)
                if ($scope.FavoriteSubj.length < 8) {
                    document.getElementById('alert_save').innerHTML = "#喜歡的科目，至少選三項!";
                    return false;
                }
                else {
                    document.getElementById('alert_save').innerHTML = ""
                }

                //感到困難的科目(至少選三項)
                if ($scope.DifficultSubj.length < 8) {
                    document.getElementById('alert_save').innerHTML = "#感到困難的科目，至少選三項!";
                    return false;
                }
                else {
                    document.getElementById('alert_save').innerHTML = ""
                }

                //特殊才能(至多選三項)
                var strTalent = "";

                if ($scope.Talent !== undefined) strTalent = $scope.Talent;


                if (strTalent.indexOf("╧") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.TalentMartialArts === "" || $scope.TalentMartialArts === undefined) {
                        document.getElementById('alert_save').innerHTML = "#特殊才能(至多選三項)，「武術」值不可為空!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                        //$scope.Talent = $scope.Talent.replace("╧", "╧" + $scope.TalentMartialArts);
                    }
                }

                if (strTalent.indexOf("╩") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.TalentMusical === "" || $scope.TalentMusical === undefined) {
                        document.getElementById('alert_save').innerHTML = "#特殊才能(至多選三項)，「樂器演奏」值不可為空!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                        //$scope.Talent = $scope.Talent.replace("╩", "╩" + $scope.TalentMusical);
                    }
                }

                if (strTalent.indexOf("┴") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.TalentElse === "" || $scope.TalentElse === undefined) {
                        document.getElementById('alert_save').innerHTML = "#特殊才能(至多選三項)，「其他」值不可為空!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                        //$scope.Talent = $scope.Talent.replace("┴", "┴" + $scope.TalentElse);
                    }
                }

                var data = $.param({
                    Semester: $scope.saveSemesterByClick,
                    StudIDNo: $scope.saveStudIDNo,
                    Grade: $scope.saveGradeByClick,
                    ClassNo: $scope.saveClassNo,
                    SeatNum: $scope.saveSeatNum,
                    Kindergarten: strKindergarten,
                    ParentsRelation: $scope.ParentsRelation,
                    FamiAtmosphere: $scope.FamiAtmosphere,
                    DadDiscipline: $scope.DadDiscipline,
                    MomDiscipline: $scope.MomDiscipline,
                    LivingEnv: $scope.LivingEnv.replace("┴", "┴" + $scope.LivingEnvElse),
                    Living: $scope.Living.replace("┴", "┴" + $scope.LivingElse),
                    EconomicSitu: $scope.EconomicSitu,
                    FavoriteSubj: $scope.FavoriteSubj,
                    DifficultSubj: $scope.DifficultSubj,
                    Talent: $scope.Talent.replace("┴", "┴" + $scope.TalentElse).replace("╧", "┴" + $scope.TalentMartialArts).replace("╩", "┴" + $scope.TalentMusical),
                    Recreation: $scope.Recreation.replace("┴", "┴" + $scope.RecreationElse),
                    ClassOfficer: $scope.ClassOfficer,
                    LifeStyle: $scope.LifeStyle,
                    PersonalRel: $scope.PersonalRel,
                    ExBehavior: $scope.ExBehavior,
                    InBehavior: $scope.InBehavior,
                    LearnBehavior: $scope.LearnBehavior,
                    BadHabit: $scope.BadHabit,
                    Nervous: $scope.Nervous
                });

                //新增
                postService.PostData("CounselingRec", data).success(function (response) {
                    //alert("新增成功");
                    //$("#Office_Detail_confirm").appendTo("body").modal('show');
                    $("#Office_Detail_confirm").modal({ backdrop: 'static' });

                    document.getElementById('Office_Detail_confirm_hint').innerHTML = "新增資料成功!";


                    $scope.btnAddHidden = { //將新增儲存按鈕隱藏
                        "display": "none"
                    };
                    $scope.btnUpdateHidden = { //將更新儲存按鈕顯示
                        "visibility": "visible"
                    };

                })
                .error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });
            };

            //更新儲存
            $scope.update = function () {

                
                //check檢查

                //學前教育
                var strKindergarten = "";
                if ($scope.Kindergarten === "1") strKindergarten = $scope.Kindergarten + "┴" + $scope.KindergartenYears;
                else strKindergarten = $scope.Kindergarten;

                if (strKindergarten.indexOf("┴") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.KindergartenYears === "" || $scope.KindergartenYears === undefined) {
                        document.getElementById('alert_save').innerHTML = "#學前教育，請填寫曾進幼稚園幾年!";
                        return false;
                    }
                    else if (isNaN($scope.KindergartenYears)) {
                        document.getElementById('alert_save').innerHTML += " #學前教育，曾進幼稚園幾年請填寫數字!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                    }

                }

                //父母關係

                var strParentsRelation = "";
                if ($scope.ParentsRelation !== undefined) strParentsRelation = $scope.ParentsRelation;                

                if (strParentsRelation.indexOf("┴") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.ParentsRelationElse === "" || $scope.ParentsRelationElse === undefined) {
                        document.getElementById('alert_save').innerHTML = "#父母關係，「其他」值不可為空!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                        $scope.ParentsRelation = $scope.ParentsRelation + $scope.ParentsRelationElse;
                    }
                }

                //居住環境
                var strLivingEnv = "";
                if ($scope.LivingEnv !== undefined) strLivingEnv = $scope.LivingEnv;

                if (strLivingEnv.indexOf("┴") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.LivingEnvElse === "" || $scope.LivingEnvElse === undefined) {
                        document.getElementById('alert_save').innerHTML = "#居住環境，「其他」值不可為空!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                        //$scope.LivingEnv = $scope.LivingEnv.replace("┴", "┴" + $scope.LivingEnvElse);
                    }
                }
                //console.log($scope.LivingEnv.replace("┴", "┴" + $scope.LivingEnvElse));
                //return false;

                //本人住宿(居住情形)
                var strLiving = "";

                if ($scope.Living !== undefined) strLiving = $scope.Living;

                if (strLiving.indexOf("┴") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.LivingElse === "" || $scope.LivingElse === undefined) {
                        document.getElementById('alert_save').innerHTML = "#本人住宿(居住情形)，「其他」值不可為空!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                        //$scope.Living = $scope.Living.replace("┴", "┴" + $scope.LivingElse);
                    }

                }

                //喜歡的科目(至少選三項)
                if ($scope.FavoriteSubj.length < 8) {
                    document.getElementById('alert_save').innerHTML = "#喜歡的科目，至少選三項!";
                    return false;
                }
                else {
                    document.getElementById('alert_save').innerHTML = ""
                }

                //感到困難的科目(至少選三項)
                if ($scope.DifficultSubj.length < 8) {
                    document.getElementById('alert_save').innerHTML = "#感到困難的科目，至少選三項!";
                    return false;
                }
                else {
                    document.getElementById('alert_save').innerHTML = ""
                }

                //特殊才能(至多選三項)
                var strTalent = "";

                if ($scope.Talent !== undefined) strTalent = $scope.Talent;

                
                if (strTalent.indexOf("╧") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.TalentMartialArts === "" || $scope.TalentMartialArts === undefined) {
                        document.getElementById('alert_save').innerHTML = "#特殊才能(至多選三項)，「武術」值不可為空!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                        //$scope.Talent = $scope.Talent.replace("╧", "╧" + $scope.TalentMartialArts);
                    }
                }

                if (strTalent.indexOf("╩") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.TalentMusical === "" || $scope.TalentMusical === undefined) {
                        document.getElementById('alert_save').innerHTML = "#特殊才能(至多選三項)，「樂器演奏」值不可為空!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                        //$scope.Talent = $scope.Talent.replace("╩", "╩" + $scope.TalentMusical);
                    }
                }

                if (strTalent.indexOf("┴") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";

                    if ($scope.TalentElse === "" || $scope.TalentElse === undefined) {
                        document.getElementById('alert_save').innerHTML = "#特殊才能(至多選三項)，「其他」值不可為空!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                        //$scope.Talent = $scope.Talent.replace("┴", "┴" + $scope.TalentElse);
                    }
                }
                //休閒興趣(至多選三項)
                var strRecreation = "";
                if ($scope.Recreation !== undefined) strRecreation = $scope.Recreation;

                if (strRecreation.indexOf("┴") !== -1) {
                    document.getElementById('alert_save').innerHTML = "";
                    if ($scope.RecreationElse === "" || $scope.RecreationElse === undefined) {
                        document.getElementById('alert_save').innerHTML = "#休閒興趣(至多選三項)，「其他」值不可為空!";
                        return false;
                    }
                    else {
                        document.getElementById('alert_save').innerHTML = "";
                    }
                }

                //console.log(strKindergarten);
                var updateID = $scope.saveSemester + "，" + $scope.saveStudIDNo; //SchoolID + Semester + StudIDNo
                var data = $.param({
                    Semester: $scope.saveSemesterByClick,
                    StudIDNo: $scope.saveStudIDNo,
                    Grade: $scope.saveGradeByClick,
                    ClassNo: $scope.saveClassNo,
                    SeatNum: $scope.saveSeatNum,
                    Kindergarten: strKindergarten,
                    ParentsRelation: $scope.ParentsRelation,
                    FamiAtmosphere: $scope.FamiAtmosphere,
                    DadDiscipline: $scope.DadDiscipline,
                    MomDiscipline: $scope.MomDiscipline,
                    LivingEnv: $scope.LivingEnv.replace("┴", "┴" + $scope.LivingEnvElse),
                    Living: $scope.Living.replace("┴", "┴" + $scope.LivingElse),
                    EconomicSitu: $scope.EconomicSitu,
                    FavoriteSubj: $scope.FavoriteSubj,
                    DifficultSubj: $scope.DifficultSubj,
                    Talent: $scope.Talent.replace("┴", "┴" + $scope.TalentElse).replace("╧", "┴" + $scope.TalentMartialArts).replace("╩", "┴" + $scope.TalentMusical),
                    Recreation: $scope.Recreation.replace("┴", "┴" + $scope.RecreationElse),
                    ClassOfficer: $scope.ClassOfficer,
                    LifeStyle: $scope.LifeStyle,
                    PersonalRel: $scope.PersonalRel,
                    ExBehavior: $scope.ExBehavior,
                    InBehavior: $scope.InBehavior,
                    LearnBehavior: $scope.LearnBehavior,
                    BadHabit: $scope.BadHabit,
                    Nervous: $scope.Nervous
                });

                putService.PutData("CounselingRec/" + updateID, data).success(function (response) {
                    //alert("更新成功!!!");
                    //$("#Office_Detail_Update_confirm").appendTo("body").modal('show');
                    $("#Office_Detail_Update_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Office_Detail_Update_hint').innerHTML = "編輯資料成功!";
                    document.getElementById('alert_save').innerHTML = "";

                }).error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });


            };

            //////////////////////////////////////////////興趣及特殊才能調查表////////////////////////////////////////////

            $scope.addInterestAbility = function () {
                var data = $.param({
                    Semester: $scope.saveSemesterByClick,
                    StudIDNo: $scope.saveStudIDNo,
                    Grade: $scope.saveGradeByClick,
                    InterestSkill: $scope.InterestSkill,
                    StudAbility: $scope.StudAbility,
                    GroupAct: $scope.GroupAct,
                    TeaOpinion: $scope.TeaOpinion
                });

                //新增
                postService.PostData("InterestAbility", data).success(function (response) {
                    //alert("新增成功");
                    //$("#Office_Detail_confirm").appendTo("body").modal('show');
                    $("#Office_Detail_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Office_Detail_confirm_hint').innerHTML = "新增資料成功!";
                    $scope.btnAddInterestAbilityHidden = { //將新增儲存按鈕隱藏
                        "display": "none"
                    };
                    $scope.btnUpdateInterestAbilityHidden = { //將更新儲存按鈕顯示
                        "visibility": "visible"
                    };

                })
                .error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });

            };


            $scope.updateInterestAbility = function () {
                var updateID = $scope.saveStudIDNo + "，" + $scope.saveGrade; //SchoolID + StudIDNo +Grade
                var data = $.param({
                    Semester: $scope.saveSemesterByClick,
                    StudIDNo: $scope.saveStudIDNo,
                    Grade: $scope.saveGradeByClick,
                    InterestSkill: $scope.InterestSkill,
                    StudAbility: $scope.StudAbility,
                    GroupAct: $scope.GroupAct,
                    TeaOpinion: $scope.TeaOpinion
                });

                putService.PutData("InterestAbility/" + updateID, data).success(function (response) {
                    //alert("更新成功!!!");
                    //$("#Office_Detail_Update_confirm").appendTo("body").modal('show');
                    $("#Office_Detail_Update_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Office_Detail_Update_hint').innerHTML = "編輯資料成功!";
                    document.getElementById('alert_save').innerHTML = "";

                }).error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });
            };



            //////////////////////////////////////////////輔導訪談紀錄////////////////////////////////////////////

            $scope.EditDetail = function (action, StudIDNo, Semester) {
                //console.log(StudIDNo);
                //訪談日期-選的日期不可以超過今天
                var Today = new Date();
                $scope.InterviewMaxDate = Today.getFullYear() + "/" + (Today.getMonth() + 1) + "/" + Today.getDate();

                //訪談方式
                getService.GetData("CodeCounseling").success(function (response) {
                    $scope.dataCodeCounseling = response;
                    //console.log($scope.SemesterYear);                
                })
                .error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });

                if (action == "add") { //新增
                    $scope.AddHidden = {
                        "visibility":"visibility"
                    };
                    $scope.UpdateHidden = {
                        "display": "none"
                    };
                    $scope.AcceptHidden = {
                        "display": "none"
                    };

                    $scope.InterviewDate = new Date("");
                    $scope.Interviewer = "";
                    $scope.InterviewType = "";
                    $scope.CounsThing = "";
                    $scope.CounsContent = "";
                    $scope.HandoverCouns = false;
                    $scope.HandoverDes = "";
                    var toDay = new Date();
                    $scope.watermarkDiv = userInfo[0].UserName + "    " + userInfo[0].UnitName + "   " + padLeft(toDay.getFullYear().toString(), 4) + "/" + padLeft((toDay.getMonth() + 1).toString(), 2) + "/" + padLeft(toDay.getDate().toString(), 2) + " " + padLeft(toDay.getHours().toString(), 2) + ":" + padLeft(toDay.getMinutes().toString(), 2) + ":" + padLeft(toDay.getSeconds().toString(), 2);

                }
                else {//修改
                    $scope.AddHidden = {
                        "display": "none"
                    };
                    $scope.UpdateHidden = {
                        "visibility": "visibility"
                    };
                    var cidata = $.param({
                        Semester:Semester,
                        StudIDNo: StudIDNo,
                        CounsInterID: action
                    });

                    postService.PostData("CounsInterviewSearch", cidata).success(function (response) {
                        //console.log(response);
                        if (response.length < 1) {
                            document.getElementById('Office_Detail_hint').innerHTML += " #查無資料<br>";
                        }
                        else {
                            document.getElementById('Office_Detail_hint').innerHTML += "";
                            $scope.UpdateCounsInterID = response[0].CounsInterID;
                            $scope.UpdateSemester = response[0].Semester;
                            $scope.InterviewDate = response[0].InterviewDate;
                            $scope.Interviewer = response[0].Interviewer;
                            $scope.InterviewType = response[0].InterviewType;
                            $scope.CounsThing = response[0].CounsThing;
                            $scope.CounsContent = response[0].CounsContent;
                            $scope.HandoverCouns = response[0].HandoverCouns == "1" ? true : false;
                            $scope.HandoverDes = response[0].HandoverDes;

                            if (response[0].HandoverCouns != "0") {
                                $scope.AcceptHidden = {
                                    "visibility" : "visibility"
                                };
                                $scope.IsAccept = response[0].IsAcceptName;
                                $scope.AcceptReason = response[0].AcceptReason == "" ? "無" : response[0].AcceptReason;
                                if (response[0].IsAccept == "0") $scope.HandoverCounsDisabled = false;
                                else $scope.HandoverCounsDisabled = true;

                            } else {
                                $scope.AcceptHidden = {
                                    "display": "none"
                                };
                                $scope.HandoverCounsDisabled = false;
                                $scope.IsAccept = "";
                                $scope.AcceptReason = "";
                            }
                        }

                    })
                    .error(function (data, status, headers, config) {
                        //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                        //$("#Error_confirm").appendTo("body").modal('show');
                        $("#Error_confirm").modal({ backdrop: 'static' });
                        document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                    });

                }

            };

            //訪談方式Click
            $scope.CodeCounselingClick = function (CodeID) {
                $scope.InterviewType = CodeID;
            };

            //新增
            $scope.CounsInterviewInsert = function () {

                //console.log($filter('date')($scope.InterviewDate, 'yyyy-MM-dd'));
                document.getElementById('Office_Detail_hint').innerHTML = "";
                if ($scope.InterviewDate === undefined) {
                    document.getElementById('Office_Detail_hint').innerHTML = "#「訪談日期」格式錯誤!";
                    return false;
                }

                if ($scope.InterviewDate === null || $scope.InterviewDate == "" || $scope.InterviewDate == "Invalid Date") {
                    document.getElementById('Office_Detail_hint').innerHTML = "#請填寫「訪談日期」!";
                    return false;
                }
                
                var data = $.param({
                    Semester: $scope.modelSemesterYear,
                    StudIDNo: $scope.saveStudIDNo,
                    InterviewDate: $scope.InterviewDate == "Invalid Date" ? "" : $filter('date')($scope.InterviewDate, 'yyyy-MM-dd'),
                    InterviewType: $scope.InterviewType,
                    StudGrade: $scope.saveGrade,
                    Interviewer: $scope.Interviewer,
                    CounsThing: $scope.CounsThing,
                    CounsContent: $scope.CounsContent,
                    HandoverCouns: $scope.HandoverCouns == true ? "1" : "0",
                    HandoverDes: $scope.HandoverDes,
                    IsAccept: $scope.HandoverCouns == true ? "0" : null  //轉介：待處理，不轉介：null
                });
                
                //新增
                postService.PostData("CounsInterview", data).success(function (response) {
                    //alert("新增成功");
                    //$("#Office_Detail_confirm").appendTo("body").modal('show');
                    $("#Office_Detail_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Office_Detail_confirm_hint').innerHTML = "新增資料成功!";
                    $("#modCounsInterview").modal('hide');

                    getCounsInterviewTableData($scope.saveSemester, $scope.saveStudIDNo, $scope.saveGrade);
                })
                .error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });

            };

            //修改
            $scope.CounsInterviewUpdate = function (CounsInterID, Semester) {
                var strIsAccept = $scope.IsAccept.replace("待處理", "0").replace("已受理", "1").replace("不受理", "2").replace(null, "0");
                if ($scope.HandoverCouns == true && strIsAccept == "") strIsAccept = "0";

                document.getElementById('Office_Detail_hint').innerHTML = "";

                if ($scope.InterviewDate === null || $scope.InterviewDate == "" || $scope.InterviewDate == "Invalid Date") {
                    document.getElementById('Office_Detail_hint').innerHTML = "#請填寫「訪談日期」!";
                    return false;
                }

                if ($scope.InterviewDate === undefined) {
                    document.getElementById('Office_Detail_hint').innerHTML = "#「訪談日期」格式錯誤!";
                    return false;
                }

                //console.log(strIsAccept);
                var data = $.param({
                    CounsInterID: CounsInterID,
                    Semester: Semester,
                    StudIDNo: $scope.saveStudIDNo,
                    InterviewDate: $scope.InterviewDate == "Invalid Date" ? "" : $filter('date')($scope.InterviewDate, 'yyyy-MM-dd'),
                    InterviewType: $scope.InterviewType,
                    StudGrade: $scope.saveGrade,
                    Interviewer: $scope.Interviewer,
                    CounsThing: $scope.CounsThing,
                    CounsContent: $scope.CounsContent,
                    HandoverCouns: $scope.HandoverCouns == true ? "1" : "0",
                    HandoverDes: $scope.HandoverDes,
                    IsAccept: $scope.HandoverCouns == true ? strIsAccept : null   //轉介：待處理，不轉介：null
                });

                putService.PutData("CounsInterview/" + CounsInterID, data).success(function (response) {
                    //alert("更新成功!!!");
                    $("#modCounsInterview").modal('hide');
                    //$("#Office_Detail_Update_confirm").appendTo("body").modal('show');
                    $("#Office_Detail_Update_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Office_Detail_Update_hint').innerHTML = "編輯資料成功!";
                    getCounsInterviewTableData($scope.saveSemester, $scope.saveStudIDNo, $scope.saveGrade, $scope.saveClassNo, $scope.saveSeatNum);

                }).error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });

            };

            //刪除
            $scope.DelDetail = function (CounsInterID,Semester) {
                //console.log(CounsInterID);
                //$("#Office_Detail_Delete").appendTo("body").modal('show');
                $("#Office_Detail_Delete").modal({ backdrop: 'static' });
                document.getElementById('counsInterview_delete_CounsInterID').innerText = CounsInterID;
                document.getElementById('counsInterview_delete_Semester').innerText = Semester;
            };
            //刪除確認
            $scope.DeleteOffice_Confirm = function () {

                var CounsInterID = document.getElementById('counsInterview_delete_CounsInterID').innerText;
                var Semester = document.getElementById('counsInterview_delete_Semester').innerText;
                var data = $.param({
                    Semester: Semester
                });
                delService.DeleteData("CounsInterview/" + CounsInterID, data).success(function () {
                    //alert("刪除成功");
                    //$("#Office_Detail_Update_confirm").appendTo("body").modal('show');
                    $("#Office_Detail_Update_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Office_Detail_Update_hint').innerHTML = "刪除資料成功!";
                    $("#Office_Detail_Delete").modal('hide');

                    getCounsInterviewTableData($scope.saveSemester, $scope.saveStudIDNo, $scope.saveGrade, $scope.saveClassNo, $scope.saveSeatNum);
                }).error(function (data, status, headers, config) {
                    //alert("failure message: " + JSON.stringify({ data: data }) + JSON.stringify({ status: status }));
                    //$("#Error_confirm").appendTo("body").modal('show');
                    $("#Error_confirm").modal({ backdrop: 'static' });
                    document.getElementById('Error_hint').innerHTML = errorHandle.GetErrorMsg(status);
                });
            };

            $scope.liClick = function (clickValue) {
                //click 頁籤
                $scope.clickModel = clickValue;

                //判斷在哪一個頁籤時，要顯示儲存或新增的按鈕
                if ($scope.saveCounselingRecData != undefined) {

                    if (clickValue == "1" && $scope.saveCounselingRecData.length == 0) {
                        //頁籤1，無資料
                        $scope.btnAddHidden = {
                            "visibility": "visible"
                        };
                        $scope.btnUpdateHidden = {
                            "display": "none"
                        };

                        $scope.btnAddInterestAbilityHidden = {
                            "display": "none"
                        };
                        $scope.btnUpdateInterestAbilityHidden = {
                            "display": "none"
                        };
                        $scope.btnAddCounsInterviewHidden = {
                            "display": "none"
                        }
                        $scope.watermark = "";
                    }
                    else if (clickValue == "1" && $scope.saveCounselingRecData.length > 0) {
                        //有資料
                        $scope.btnAddHidden = {
                            "display": "none"
                        };
                        $scope.btnUpdateHidden = {
                            "visibility": "visible"
                        };

                        $scope.btnAddInterestAbilityHidden = {
                            "display": "none"
                        };
                        $scope.btnUpdateInterestAbilityHidden = {
                            "display": "none"
                        };
                        $scope.btnAddCounsInterviewHidden = {
                            "display": "none"
                        }
                        $scope.watermark = "";
                    }
                }

                if ($scope.saveInterestAbilityData != undefined) {
                    if (clickValue == "2" && $scope.saveInterestAbilityData.length == 0) {
                        //頁籤2，無資料
                        $scope.btnAddHidden = {
                            "display": "none"
                        };
                        $scope.btnUpdateHidden = {
                            "display": "none"
                        };

                        $scope.btnAddInterestAbilityHidden = {
                            "visibility": "visible"
                        };
                        $scope.btnUpdateInterestAbilityHidden = {
                            "display": "none"
                        };
                        $scope.btnAddCounsInterviewHidden = {
                            "display": "none"
                        }
                        $scope.watermark = "";
                    }
                    else if (clickValue == "2" && $scope.saveInterestAbilityData.length > 0) { //有資料
                        $scope.btnAddHidden = {
                            "display": "none"
                        };
                        $scope.btnUpdateHidden = {
                            "display": "none"
                        };

                        $scope.btnAddInterestAbilityHidden = {
                            "display": "none"
                        };
                        $scope.btnUpdateInterestAbilityHidden = {
                            "visibility": "visible"
                        };
                        $scope.btnAddCounsInterviewHidden = {
                            "display": "none"
                        }
                        $scope.watermark = "";
                    }
                    else if (clickValue == "3") {
                        $scope.btnAddHidden = {
                            "display": "none"
                        };
                        $scope.btnUpdateHidden = {
                            "display": "none"
                        };
                        $scope.btnAddInterestAbilityHidden = {
                            "display": "none"
                        };
                        $scope.btnUpdateInterestAbilityHidden = {
                            "display": "none"
                        };
                        $scope.btnAddCounsInterviewHidden = {
                            "visibility": "visible"
                        }
                        if ($scope.dataCounsInterview.length > 0) {
                            var toDay = new Date();
                            $scope.watermark = userInfo[0].UserName + "    " + userInfo[0].UnitName + "   " + padLeft(toDay.getFullYear().toString(), 4) + "/" + padLeft((toDay.getMonth() + 1).toString(), 2) + "/" + padLeft(toDay.getDate().toString(), 2) + " " + padLeft(toDay.getHours().toString(), 2) + ":" + padLeft(toDay.getMinutes().toString(), 2) + ":" + padLeft(toDay.getSeconds().toString(), 2);
                        }
                    }
                }
                //console.log($scope.clickModel);                
            };
            $scope.liClick('1'); //一開始載入的時候頁籤1

        });

    


})(window.angular);