$(document).ready(function(){


    var img_content_width = $("#banner_container a").outerWidth();
    var img_num = $("#banner_container a").length;
    var banner_content_width = img_content_width * img_num +20;
    if(img_num<2){
    }else{
        $('#banner_container').css("width",banner_content_width + "px");
    }

    function getActivityInfo() {
        $.ajax({
            //提交数据的类型 POST GET
            type: "GET",
            //提交的网址
            url: "/service/gdApp/getActivityInfo",
            //提交的数据
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //在请求之前调用的函数
            beforeSend: function () {  },
            //成功返回之后调用的函数             
            success: function (data) {
                if(data.statusCode == 1){
                    $('#lastNum').text(data.data.lastNumber);
                }
            },
            //调用执行后调用的函数
            complete: function (XMLHttpRequest, textStatus) {
            },
            //调用出错执行的函数
            error: function () {
                //请求出错处理
            }
        });
    }
    getActivityInfo();
});