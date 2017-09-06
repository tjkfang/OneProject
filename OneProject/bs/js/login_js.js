/**
 * Created by visionsmile on 2017/8/26.
 */
    var ip="192.168.9.202:3001";
//消息框的js
var cjy_alert = function (str) {
    var html = '<div class="cjy-mask" id="cjy-mask"></div>' +
        '<div class="cjy-alert" id="cjy-alert">' +
        '<div class="cjy-alertHed" id="cjy-alertHed">提示：</div><hr>' +
        '<p class="cjy-alertCon">' + str + '</p>' +
        '<div class="cjy-alertBtndiv"><button class="btn cjy-alertBtn" id="cjy-alertBtn">确定</button></div>' +
        '</div>';
    $('#cjy-maskBox').html(html);
    $('#cjy-alertBtn').on('click', function () {
        $('#cjy-maskBox').html('');
        clearInterval(timer);
    })
    var timer = setInterval(function () {
        $('#cjy-maskBox').html('');
        clearInterval(timer);
    }, 5000);
}
    //登录验证
$(function (){
    $('input[name=name]').blur(function(){
        val=this.value;
        if(val.length < 2 || val.length>10){
            $ (this).next().show();
            return false;
        }else{
            $ (this).next().hide();
        }
    });
    $('input[name=password]').blur(function(){
        val=this.value;
        if(val.length < 4 || val.length>10 || !val.match(/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,9}$/)){
            $(this).next().show();
            return false;
        }else if (!val.match(/^[a-zA-Z]\w{3,15}$/)){
            $(this).next().show();
            return false;
        }else{
            $(this).next().hide();
        }
    });
})
    //回车键登录
    $(document).keydown(function(event){
        if(event.keyCode==13){
            $("#btn_post").click();
        }
    });
    $(function(){
        $("#btn_post").click(function(){
            if($('#name').val().length < 2 || $('#name').val().length>10 || !$('#name').val().match(/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,9}$/)){
                $ ('#name').next().show();
            }else if ($('#password').val().length < 4 || $('#password').val().length>10 || !val.match(/^[a-zA-Z]\w{3,15}$/)) {
                $ ('#password').next().show();
            } else {
                $.ajax({
                    type:'POST',
                    url:'http://'+ip+'/api/login',
                    data:$("#form1").serialize(),
                    dataType:'json',//数据类型,预期服务器返回的数据类型。
                    success: function(r) {
                        if (r.success == false){
                            if(r.message=="password is wrong"){
                                //当判断密码不正确时执行
                                cjy_alert("登录密码错误！");
                            }if (r.message=='password incorrect'){
                                cjy_alert("登录密码错误！");
                            }else {
                                //当判断用户名不正确时执行
                                cjy_alert('登录用户名不存在');
                            }
                        }else {//当用户名密码正确时执行
                            location = 'home.html';
                            //使用cookie
                            $.cookie('username', $("#name").val());
                            $.cookie('token', r.token);
                        }
                    },
                    error: function (msg) {//XMLHttpRequest,textStatus,errorThrown
                        cjy_alert('请求失败,可能网络出现错误！ ');
                    },
                    //限制加载时间
                    timeout:3000,
                })
            }
        });
        //请求加载提示的显式和隐藏
        $(document).ajaxStart(function(){
            $('#btn_post2').show();$('#btn_post').hide();
        }).ajaxStop(function(){
            $('#btn_post2').hide();$('#btn_post').show();
        });
});