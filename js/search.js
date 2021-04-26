(function ($) {
    'use strict';
    var $search = $('#search'),
        $input = $('#search_ipt'),
        $btn = $('#btn_search'),
        $tips = $('#search_tips');

    //验证输入内容是否为空    
    $btn.on('click', function () {
        if ($.trim($input.val()) === "") {
            return false;
        }
    });

    //输入事件触发请求数据
    $input.on('input', function () {
        var url = "https://suggest.taobao.com/sug?code=utf-8&_ksTS=1484204931352_18291&callback=jsonp18292&k=1&area=c2c&bucketid=6&q=" + encodeURIComponent($.trim($input.val()));
        $.ajax({
            url: url,
            dataType: 'jsonp'
        })
            .done(//成功获取数据
                function (data) {
                    //console.log(data);//打印ajax获取的数据
                    //console.log(data.result);
                    var html = '';
                    var dataNum = data['result'].length;
                    var maxNum = 10;
                    //没有获取到数据不显示提示信息
                    if(dataNum === 0){
                        $tips.hide().html('');
                        return;
                    }
                    //只显示前10条提示信息
                    for(var i=0;i<dataNum;i++){
                        if(i>=maxNum){
                            break;
                        }
                        html += '<li>'+ data['result'][i][0] +'</li>';
                    }
                    $tips.html(html).show();
                }
            )
            .fail(//获取数据失败
                function () {
                    $tips.hide().html('');
                }
            )
            .always(
                function () {
                    console.log("无论如何都会打印!");
                }
            );
    })
})(jQuery);