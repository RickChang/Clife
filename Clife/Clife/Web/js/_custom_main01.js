//隱藏指定區域
function showarea(name, cnt) {
    $(name).removeClass("hide");

    for (var i = 0 ; i < cnt ; i++) {
        $(name).children("div").eq(i).removeClass("hide");
        $(name).children("div").eq(i).addClass("my-show");
    } 
}

//顯示指定區域
function hidearea(name,cnt)
{
    for (var i = 0 ; i < cnt ; i++) {
        $(name).children("div").eq(i).removeClass("my-show");
        $(name).children("div").eq(i).addClass("hide");
    }

    $(name).addClass("hide");
}

function hideall() {
    hidearea("#my-map-result1",14);
    hidearea("#my-map-result2",15);
    hidearea("#my-map-result3", 0);

    $("#btn-result-01").removeClass("active");
    $("#btn-result-02").removeClass("active");
    $("#btn-result-03").removeClass("active");
    $("#btn-result-04").removeClass("active");
    $("#btn-result-05").removeClass("active");
}


//點選111時
$("#btn-result-01").click(function (e) {
    hideall();
    showarea("#my-map-result1", 14);

    $("#btn-result-01").addClass("active");
});

//點選222時
$("#btn-result-02").click(function (e) {
    hideall();
    showarea("#my-map-result2", 15);

    $("#btn-result-02").addClass("active");
});

//點選333時
$("#btn-result-03").click(function (e) {
    hideall();
    showarea("#my-map-result3", 0);

    $("#btn-result-03").addClass("active");
});
//點選444時
$("#btn-result-04").click(function (e) {
    hideall();
    //showarea("#my-map-result3", 14);

    $("#btn-result-04").addClass("active");
});
//點選555時
$("#btn-result-05").click(function (e) {
    hideall();
    //showarea("#my-map-result3", 14);

    $("#btn-result-05").addClass("active");
});

//點選各校時重整iframe
$(".my-btn-refreshif").click(function (e) {
    //alert(this.id);

    var iframe1 = document.getElementById("if01");
    iframe1.src = iframe1.src;
     
    var iframe2 = document.getElementById("if02");
    iframe2.src = iframe2.src;

    //for (var i = 0 ; i < cnt ; i++) {
    //    .children("div").eq(i).removeClass("my-show");
    //    $(name).children("div").eq(i).addClass("hide");
    //}

    for (var i = 0 ; i <= 13 ; i++) {
        var str = "btn_rf" + i;
  
        if (str == this.id) { 
            $("#"+str).addClass("btn-warning");
            $("#" + str).removeClass("my-btn-gray");

            //alert($("#" + str).attr('value'));
            $("#my-area").text($("#" + str).text());
        }
        else {
            $("#" + str).addClass("my-btn-gray");
            $("#" + str).removeClass("btn-warning");
        };
    }
});