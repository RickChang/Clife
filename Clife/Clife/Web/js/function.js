
//左邊補零
function padLeft(str, length) {
	if (str.length >= length) {
		return str;
	}
	else {
		return padLeft("0" + str, length);
	}
}

//判斷整數
function TestRgexp(re, s) {  // 参數說明 re 为正則表達式   s 为要判斷的字符

	return re.test(s)

}









// 匯出excel會call到的function
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}


// 將NaN或空字串轉成float 0.0
function CorrectNaNToZero(input) {
    if (isNaN(input)) {
        return 0.0;
    }
    else if (input == "")
    {
        return 0.0;
    }

    return input
}



//原住民判斷
function LocalGroup(value) {
    if (value == '03') {
        document.getElementById('LocalGroupName').value = '請選擇';
        document.getElementById('LocalGroupName').disabled = true;
    }
    else {
        document.getElementById('LocalGroupName').disabled = false;
    }
}

//身分證驗證
function checkID(e, id) {
    //alert(id);

    tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO"
    A1 = new Array(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3);
    A2 = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5);
    Mx = new Array(9, 8, 7, 6, 5, 4, 3, 2, 1, 1);

    if (id.length != 10) { e.value = ''; };
    i = tab.indexOf(id.charAt(0));
    if (i == -1) { e.value = ''; };
    sum = A1[i] + A2[i] * 9;

    for (i = 1; i < 10; i++) {
        v = parseInt(id.charAt(i));
        if (isNaN(v)) { e.value = ''; };
        sum = sum + v * Mx[i];
    }
    if (sum % 10 != 0) { e.value = ''; };
    return true;
}
//身分證驗證
function checkTwID(id) {
    //建立字母分數陣列(A~Z)
    var city = new Array(
         1, 10, 19, 28, 37, 46, 55, 64, 39, 73, 82, 2, 11,
        20, 48, 29, 38, 47, 56, 65, 74, 83, 21, 3, 12, 30
    )
    id = id.toUpperCase();
    // 使用「正規表達式」檢驗格式
    if (id.search(/^[A-Z](1|2)\d{8}$/i) == -1) {
        //alert('基本格式錯誤');
        return false;
    } else {
        //將字串分割為陣列(IE必需這麼做才不會出錯)
        id = id.split('');
        //計算總分
        var total = city[id[0].charCodeAt(0) - 65];
        for (var i = 1; i <= 8; i++) {
            total += eval(id[i]) * (9 - i);
        }
        //補上檢查碼(最後一碼)
        total += eval(id[9]);
        //檢查比對碼(餘數應為0);
        return ((total % 10 == 0));
    }
}
//email驗證
function validateEmail(e, value) {
    var x = value;
    var atpos = x.indexOf("@");
    var dotpos = x.lastIndexOf(".");
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length) {
        e.value = '';
        //$('#' + e.id).tooltip('toggle');
    }
}

//數字驗證
function validate_num(fmobj, cid, cvalue) {

    if (cvalue.match(/[\u4E00-\u9FA5]/g)) {
        //alert(msg);
        fmobj[cid].value = cvalue.replace(/[\u4E00-\u9FA5]/g, "");
    }
}



// 檢查input是不是數字(包含整數, 浮點數)
function checkStrIsFloat(inputStr)
{
    var rt = false;

    var pattern = /^-?\d+\.?\d*$/;

    if (inputStr.match(pattern) != null)
    {
        rt = true;
    }

    return rt;
}

// 檢查input是不是整數
function checkStrIsInteger(inputStr) {
    var rt = false;

    var pattern = /^-?\d+$/;

    if (inputStr.match(pattern) != null) {
        rt = true;
    }

    return rt;
}