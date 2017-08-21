(function (angular) {
    'use strict';

    angular.module('tyessApp')

        .controller('counselController', function ($scope, $window) {

            console.log('test counsel');

            $scope.test = function () {

                alert('輔導A卡');
            }

            //$window.location.href = 'error.html';
        });

})(window.angular);


       function search() {

           document.getElementById('samename_class').className = "row widget-test";
           document.getElementById('personal_class').className = "row widget-test";


           var Semester = $("#Semester option:selected").text();
           var ClassName = $("#ClassName option:selected").text();
           var Name = document.getElementById('StudentName').value;
           //alert(Name.length);
           if (Name.length > 0) {
               document.getElementById('samename_class').className = "row";
           }

           if (ClassName.length > 0) {
               document.getElementById('personal_class').className = "row";
           }

       }

function ClassDetail() {

    document.getElementById('personal_class').className = "row";
    document.getElementById('samename_class').className = "row widget-test";

}

function PersonalDetail() {

    $("#peraonal_detail").appendTo("body").modal('show');

}

function SaveResult() {

    alert('儲存成功!!');
}



//複製資料至下一年度 1-2
function PassBasicData1to2() {

    //複製基本資料
    var BasicName = document.getElementById("BasicName").value;
    var Sex = document.getElementById("Sex").selectedIndex;
    var InschoolDate = document.getElementById("InschoolDate").value;
    var InschoolName = document.getElementById("InschoolName").value;
    var SpecialRecord1 = document.getElementById("SpecialRecord1").value;
    var TeacherName = document.getElementById("TeacherName").value;
    var SpecialRecord2 = document.getElementById("SpecialRecord2").value;
    var SpecialRecord3 = document.getElementById("SpecialRecord3").value;
    var StudentNumber = document.getElementById("StudentNumber").value;
    var GraduationDate = document.getElementById("GraduationDate").value;


    document.getElementById('BasicName2').value = BasicName;
    document.getElementById('Sex2').selectedIndex = Sex;
    document.getElementById('InschoolDate2').value = InschoolDate;
    document.getElementById('InschoolName2').value = InschoolName;
    document.getElementById('SpecialRecord2_1').value = SpecialRecord1;
    document.getElementById('TeacherName2').value = TeacherName;
    document.getElementById('SpecialRecord2_2').value = SpecialRecord2;
    document.getElementById('SpecialRecord2_3').value = SpecialRecord3;
    document.getElementById('StudentNumber2').value = StudentNumber;
    document.getElementById('GraduationDate2').value = GraduationDate;


    //複製詳細資料

    var table = document.getElementById('DetailTabl_1');
    var input = table.getElementsByTagName('input');
    var select = table.getElementsByTagName('select');
    for (var z = 0; z < input.length; z++) {

        if (input[z].id.length > 0) {

            document.getElementById(input[z].id + '_2').value = document.getElementById(input[z].id).value;

        }
    }
    for (var k = 0; k < select.length; k++) {

        if (select[k].id.length > 0) {

            document.getElementById(select[k].id + '_2').selectedIndex = document.getElementById(select[k].id).selectedIndex;

        }
    }

    alert('複製資料成功!!');
}
