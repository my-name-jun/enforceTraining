$(document).ready(function () {

    var qList = {
        question1: ["18-24", "25-34", "35-44", "45以上"],
        question2: ["银行理财产品", "基金", "股票", "万能型/分红型保险"],
        question3: ["5%", "10%", "15%", "20%"],
        question4: ["重疾险", "寿险", "年金险（分红型后非分红型）", "医疗险", "意外险"],
        question5: ["可以，但也看保险公司的实力情况", "不确定，万能险结算利率不稳定", "不懂什么是万能型保险"],
    }


    var model = {
        q1: -1,
        q2: -1,
        q3: -1,
        q4: [],
        q5: -1,
        name: "",
        mobile: ""
    };

    var addEventQuestion = function (id) {
        var classArray = $('#' + id + ' .ans');
        for (var i = 0; i < classArray.length; i++) {
            (function (i) {
                $('#' + id + ' .ans').eq(i).click(function () {
                    var imgDom = $(this).children('.ans_img');
                    if (model[id] == i) {
                    } else {
                        if (model[id] != -1) {
                            var preImgDom = $('#' + id + ' .ans').eq(model[id]).children('.ans_img');
                            preImgDom.attr("src", "./images/radio_unactive.png");
                            imgDom.attr("src", "./images/radio_active.png");
                            model[id] = i;
                        } else {
                            imgDom.attr("src", "./images/radio_active.png");
                            model[id] = i;
                        }
                    }
                });
            })(i);
        }
    };

    var addEventSelect = function (id) {
        var classArray = $('#' + id + ' .ans');
        for (var i = 0; i < classArray.length; i++) {
            (function (i) {
                $('#' + id + ' .ans').eq(i).click(function () {
                    var index = $.inArray(i, model[id]);
                    var imgDom = $(this).children('.ans_img');
                    if (index == -1) {//不存在
                        imgDom.attr("src", "./images/box_active.png");
                        model[id].push(i);
                    } else {//存在
                        imgDom.attr("src", "./images/radio_unactive.png");
                        model[id].splice(index, 1);
                    }


                });
            })(i);
        }
    };

    addEventQuestion('q1');
    addEventQuestion('q2');
    addEventQuestion('q3');
    addEventQuestion('q5');
    addEventSelect('q4');

    $('#form_btn').click(function () {
        //问题校验
        if (model.q1 == -1 || model.q2 == -1 || model.q3 == -1 || model.q5 == -1 || model.q4.length == 0) {
            showToastTips("请补充完整问卷调查");
            return
        }


        //赋值
        model.name = $('#name').val();
        model.mobile = $('#mobile').val();

        //提交校验
        if (name_check(model.name) == 1 || name_check(model.name) == 2) {
            showToastTips("请输入正确的姓名");
            return
        }
        if (moblie_check(model.mobile) == 1 || moblie_check(model.mobile) == 2) {
            showToastTips("请输入正确的手机号码");
            return
        }

        var dataToPost = {
            name: model.name,
            phone: model.mobile,
            ext1: qList.question1[model.q1],
            ext2: qList.question2[model.q2],
            ext3: qList.question3[model.q3],
            ext4:"",
            ext5: qList.question5[model.q5],
        };
        for (var x in model.q4) {
            dataToPost.ext4 += qList.question4[model.q4[x]] + ",";
        }
        submit(dataToPost);
        // location.href = "success.html";
    });

    function submit(dataToPost) {
        $.ajax({
            //提交数据的类型 POST GET
            type: "GET",
            //提交的网址
            url: "/service/book/save",
            //提交的数据
            data: dataToPost,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            //在请求之前调用的函数
            beforeSend: function () { $(".loading").show(); },
            //成功返回之后调用的函数             
            success: function (data) {
                if(data.statusCode == 1){
                    location.href = "success.html";
                }
            },
            //调用执行后调用的函数
            complete: function (XMLHttpRequest, textStatus) {
                $(".loading").hide();
            },
            //调用出错执行的函数
            error: function () {
                //请求出错处理
                showToastTips("提交失败");
            }
        });
    }




    //名称验证
    function name_check(name) {
        if (name == "" || name == undefined || name == null) {
            return 1
        } else {
            //验证逻辑
            var patt1 = new RegExp("^[\u4e00-\u9fa5]{2,}$");//验证只能中文输入
            if (!patt1.test(name)) {
                return 2;
            } else {
                return 0;
            }
        }
    }

    //手机校验
    function moblie_check(moblie) {
        if (moblie == "" || moblie == undefined || moblie == null) {
            return 1
        } else {
            //验证逻辑
            var patt1 = new RegExp("^[1][3,4,5,7,8][0-9]{9}$");//验证长度，第一位数必须是1
            if (!patt1.test(moblie)) {
                return 2;
            } else {
                return 0;
            }
        }
    }

    /*******Tosat提示********/
    var err_mLeft = (document.body.offsetWidth - 200) / 2;
    $('#tips').css('left', err_mLeft);
    function showToastTips(content) {
        $('#tips').css('display', 'block');
        $('#tips_content').text(content);
        setTimeout(function () {
            $('#tips').css('display', 'none');
        }, 1500)
    }


    function getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return decodeURI(r[2]); return null; 
        } 


    var urlName = getQueryString("name");
    var urlMobile = getQueryString("mobile");
    if (urlName != null) {
        $('#name').val(urlName)
    }
    if (urlMobile != null) {
        $('#mobile').val(urlMobile)
    }

});