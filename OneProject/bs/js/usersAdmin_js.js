/**
 * Created by visionsmile on 2017/8/25.
 */
var ip="192.168.9.202:3001";
$(function(){
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
    //     对话框的验证-->
    //验证用户名
    $('input[name=name]').blur(function(){
        val = this.value;
        if (val.length<2 || !val.match(/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,9}$/)){
            $(this).next().show();
        }else {
            $(this).next().hide();
        }
    });
    //验证密码
    $('input[name=password]').blur(function(){
        val = this.value;
        if (val.length<4 ||!val.match(/^[a-zA-Z]\w{3,9}$/)){
            $(this).next().show();
        }else {
            $(this).next().hide();
        }
    });
    //验证确认密码
    $('input[name=quepassword]').blur(function(){
        val1 = $('input[name=password]').val();
        val2 = this.value;
        if (val1 != val2){
            $(this).next().show();
        }else {
            $(this).next().hide();
        }
    });
    //验证邮箱
    $('input[name=email]').blur(function(){
        val=this.value;
        if(!val.match(/^\w+@\w+\.\w+$/i)){
            $(this).next().show();
        }else {
            $(this).next().hide();
        }
    });
    //验证手机号
    $('input[name=phone]').blur(function(){
        val=this.value;
        if(!val.match(/^1[34578]\d{9}$/)){
            $(this).next().show();
        }else {
            $(this).next().hide();
        }
    });
//改密码验证
    $('input[name=gpassword]').blur(function(){
        val = this.value;
        if (val.length<4){
            $(this).next().show();
        }else {
            $(this).next().hide();
        }
    });
    $('input[id=gquepassword]').blur(function(){
        val1 = $('input[id=gpassword]').val();
        val2 = this.value;
        if (val1 != val2){
            $(this).next().show();
        }else {
            $(this).next().hide();
        }
    });
    //    隔行变色
    function col() {
        var trs = document.getElementsByTagName('tr');
        var tds=document.getElementsByClassName('td');
        for (var i = 0; i < trs.length; i++) {
            if (i % 2 == 1) {
                trs[i].style.background = "#D9EDF7";
            } else {
                trs[i].style.background = "#FFFFFF";
            }
        }
    }
//cookie的事件
    $("#member").html($.cookie("username"));

//点击注销事件返回登录页面
    $('#logout').click(function(){
        var tott=$.cookie("token");
        $.ajax({
            type:'POST',
            url:'http://'+ip+'/api/user/logout',
            data:{
                token: tott,
            },
            dataType:'json',//数据类型,预期服务器返回的数据类型。
            success: function(r) {
                if (r.success==true) {
                    cjy_alert('注销成功');
                    $.removeCookie("username");
                    $.removeCookie("token");
                    $.removeCookie("_id");
                    $.removeCookie("count");
                    $.removeCookie("Page");
                    window.close();
                    window.location.href="index.html";
                }

            },
            error: function (msg) {
                if (msg.message='No token provided'){
                    cjy_alert("请先登录！")
                }else {
                    cjy_alert('请求失败,可能网络出现错误！ ');
                }
            },
        });
    });
//3.获取用户数量当进入页面时获取用户数量，给出提示。
    $(document).ready(function(){
        var tott=$.cookie("token");
        $.ajax({
            type:'POST',
            url:'http://'+ip+'/api/user/count',
            data:{
                token: tott,
            },
            dataType:'json',//数据类型,预期服务器返回的数据类型。
            success: function(r) {
                $.cookie('count', r.count);
                $("#gongye").html(Math.ceil($.cookie("count")/10));
            },
            error: function (msg) {
                if (msg.message='No token provided'){
                    cjy_alert("请先登录！")
                    location = 'index.html';
                }else {
                    cjy_alert('请求失败,可能网络出现错误！ ');
                }
            },
        });
    });
//只有skip和limit两个字段，则查询所有的用户。
    $(document).ready(function(){
        var tott=$.cookie("token");
        $.ajax({
            type:'POST',
            url:'http://'+ip+'/api/user/search',
            data:{
                token: tott,
                skip: 0,
                limit: 10,
            },
            dataType:'json',//数据类型,预期服务器返回的数据类型。
            success: function(r) {
                if (r.success==true){
                    var html = '';
                    var PageIndex= 1;       //设置当前页码
//alert(r.users[0])
                    for (var i = 0; i < r.users.length; i++) {
                        var user = r.users[i];
                        //console.log(user);
                        //console.log(r.users[i]);
//                        创建时间格式的转换
                        var time = new Date(user.createdAt);
                        var year = time.getFullYear(); //年
                        var month = time.getMonth() + 1; //月
                        var day = time.getDate(); //日
                        var hh = time.getHours(); //时
                        var mm = time.getMinutes(); //分
                        var dateTimecreatedAt= year + "-"+month+"-"+day+" "+hh+":"+mm;
//                        修改时间格式的转换
                        var time = new Date(user.updatedAt);
                        var year = time.getFullYear(); //年
                        var month = time.getMonth() + 1; //月
                        var day = time.getDate(); //日
                        var hh = time.getHours(); //时
                        var mm = time.getMinutes(); //分
                        var dateTimeupdatedAt= year + "-"+month+"-"+day+" "+hh+":"+mm;
                        var type=user.usertype;

                        if (type==1){
                            var typee="管理员"
                            html += "<tr class='trtd'><td><input type='checkbox' class='ckb' name='ckb' value='"+user._id+"'></td><td id='ckb'>"+user._id+"</td><td>"+user.name+"</td><td>"+typee+"</td><td>" + user.phone + "</td><td>" + user.email + "</td><td>" + user.creator + "</td><td>" + dateTimecreatedAt + "</td><td>" + dateTimeupdatedAt + "</td><td><button type='button' class='open-AddBookDialog btn btn-primary' data-toggle='modal' data-id='"+user._id+"' data-target='#myModal5'>改密</button></td></tr>";
                        }else if (type==null){
                            var typee="管理员"
                            html += "<tr class='trtd'><td><input type='checkbox' class='ckb' name='ckb' value='"+user._id+"'></td><td id='ckb'>"+user._id+"</td><td>"+user.name+"</td><td>"+typee+"</td><td>" + user.phone + "</td><td>" + user.email + "</td><td>" + user.creator + "</td><td>" + dateTimecreatedAt + "</td><td>" + dateTimeupdatedAt + "</td><td><button type='button' class='open-AddBookDialog btn btn-primary' data-toggle='modal' data-id='"+user._id+"' data-target='#myModal5'>改密</button></td></tr>";
                        }else if (type==2){
                            var typee="操作员"
                            html += "<tr class='trtd'><td><input type='checkbox' class='ckb' name='ckb' value='"+user._id+"'></td><td id='ckb'>"+user._id+"</td><td>"+user.name+"</td><td>"+typee+"</td><td>" + user.phone + "</td><td>" + user.email + "</td><td>" + user.creator + "</td><td>" + dateTimecreatedAt + "</td><td>" + dateTimeupdatedAt + "</td><td><button type='button' class='open-AddBookDialog btn btn-primary' data-toggle='modal' data-id='"+user._id+"' data-target='#myModal5'>改密</button></td></tr>";
                        }else if (type==3){
                            var typee="用户"
                            html += "<tr class='trtd'><td><input type='checkbox' class='ckb' name='ckb' value='"+user._id+"'></td><td id='ckb'>"+user._id+"</td><td>"+user.name+"</td><td>"+typee+"</td><td>" + user.phone + "</td><td>" + user.email + "</td><td>" + user.creator + "</td><td>" + dateTimecreatedAt + "</td><td>" + dateTimeupdatedAt + "</td><td><button type='button' name='gaimi' class='open-AddBookDialog btn btn-primary' data-toggle='modal' data-id='"+user._id+"' data-target='#myModal5'>改密</button></td></tr>";
                        };
                    }
                    $('#ttt').append(html);
                    col();//隔行换色
                }
                $.cookie("Page",1);
                $("#Page").html($.cookie("Page"));
            },
            error: function (msg) {
                if (msg.message='No token provided'){
                    cjy_alert("请先登录！")
                    location = 'index.html';
                }else {
                    cjy_alert('请求失败,可能网络出现错误！ ');
                }
            },
        });
    });
    /////////////////////////////////////////////////////////////////////////////
    //用户管理页面的增删改查，
    //4.查询用户信息  http://192.168.9.202:3001/api/user/search
    $("#chaxun").click(function(){
        $(document).ready(function(){
            var tott=$.cookie("token");
            $.ajax({
                type:'POST',
                url:'http://'+ip+'/api/user/count',
                data:{
                    token: tott,
                    name:$('ul li input[name=name]').val(),
                    usertype:$('ul li select[name=usertype]').val(),
                },
                dataType:'json',//数据类型,预期服务器返回的数据类型。
                success: function(r) {
                    $.cookie('count', r.count);
                    $("#gongye").html(Math.ceil($.cookie("count")/10));
                },
                error: function (msg) {
                    if (msg.message='No token provided'){
                        cjy_alert("请先登录！")
                    }else {
                        cjy_alert('请求失败,可能网络出现错误！ ');
                    }
                },
            });
        });
        $.ajax({
            type:'POST',
            url:'http://'+ip+'/api/user/search',
            data:{
                token: $.cookie("token"),
                skip: 0,
                limit: 10,
                name:$('ul li input[name=name]').val(),
                usertype:$('ul li select[name=usertype]').val(),
            },
            dataType:'json',//数据类型,预期服务器返回的数据类型。
            success: function(r) {
                if (r.success == false){
                    if(r.message=="name not exist"){
                        //当判断密码不正确时执行
                        cjy_alert("查询用户不存在 ！");
                    }else {
                        //当判断用户名不正确时执行
                        cjy_alert("使用者不存在！");
                    }
                }else {
                    if (r.users.length!=null){
                        var html = '';
                        for (var i = 0; i < r.users.length; i++) {
                            var user = r.users[i];
                            //                        创建时间格式的转换
                            var time = new Date(user.createdAt);
                            var year = time.getFullYear(); //年
                            var month = time.getMonth() + 1; //月
                            var day = time.getDate(); //日
                            var hh = time.getHours(); //时
                            var mm = time.getMinutes(); //分
                            var dateTimecreatedAt= year + "-"+month+"-"+day+" "+hh+":"+mm;
//                        修改时间格式的转换
                            var time = new Date(user.updatedAt);
                            var year = time.getFullYear(); //年
                            var month = time.getMonth() + 1; //月
                            var day = time.getDate(); //日
                            var hh = time.getHours(); //时
                            var mm = time.getMinutes(); //分
                            var dateTimeupdatedAt= year + "-"+month+"-"+day+" "+hh+":"+mm;
                            var type=user.usertype;
                            if (type==1){
                                var typee="管理员"
                                html += "<tr class='trtd'><td><input type='checkbox' class='ckb' name='ckb' value='"+user._id+"'></td><td id='ckb'>"+user._id+"</td><td>"+user.name+"</td><td>"+typee+"</td><td>" + user.phone + "</td><td>" + user.email + "</td><td>" + user.creator + "</td><td>" + dateTimecreatedAt + "</td><td>" + dateTimeupdatedAt + "</td><td><button type='button' class='open-AddBookDialog btn btn-primary' data-toggle='modal' data-id='"+user._id+"' data-target='#myModal5'>改密</button></td></tr>";
                            }else if (type==2){
                                var typee="操作员"
                                html += "<tr class='trtd'><td><input type='checkbox' class='ckb' name='ckb' value='"+user._id+"'></td><td id='ckb'>"+user._id+"</td><td>"+user.name+"</td><td>"+typee+"</td><td>" + user.phone + "</td><td>" + user.email + "</td><td>" + user.creator + "</td><td>" + dateTimecreatedAt + "</td><td>" + dateTimeupdatedAt + "</td><td><button type='button' class='open-AddBookDialog btn btn-primary' data-toggle='modal' data-id='"+user._id+"' data-target='#myModal5'>改密</button></td></tr>";
                            }else if (type==3){
                                var typee="用户"
                                html += "<tr class='trtd'><td><input type='checkbox' class='ckb' name='ckb' value='"+user._id+"'></td><td id='ckb'>"+user._id+"</td><td>"+user.name+"</td><td>"+typee+"</td><td>" + user.phone + "</td><td>" + user.email + "</td><td>" + user.creator + "</td><td>" + dateTimecreatedAt + "</td><td>" + dateTimeupdatedAt + "</td><td><button type='button' class='open-AddBookDialog btn btn-primary' data-toggle='modal' data-id='"+user._id+"' data-target='#myModal5'>改密</button></td></tr>";
                            }
                        }
                        $(".trtd").not($(".trtd").first()).empty();
                        $(".trtd").hide().filter(":contains('"+($('#ttt').append(html))+"')").show();//filter和contains共同来实现了这个功能。
                        $("#chadaohang").show();

                    }else {
                        cjy_alert("查询不存在！")
                    }col();//隔行换色
                }
                $.cookie("Page",1);
                $("#Page").html($.cookie("Page"));
            },
            error: function (msg) {//XMLHttpRequest,textStatus,errorThrown
                cjy_alert('请求失败,可能网络出现错误！ ');
            },
        })

    });
    //5.添加用户
    $("#tjsj_post").click(function(){
        if($('#name').val().length < 1 || $('#name').val().length > 10 || !$('#name').val().match(/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,9}$/)){
            $ ('#name').next().show();
        }else if ($('#password').val().length < 4 || $('#password').val().length>10 || !$('#password').val().match(/^[a-zA-Z]\w{3,9}$/)) {
            $ ('#password').next().show();
        }else if($('#quepassword').val() != $('#password').val()){
            $ ('#quepassword').next().show();
        } else if(!$('#email').val().match(/^\w+@\w+\.\w+$/i)){
            $('#email').next().show();
        } else if (!$('#phone').val().match(/^1[34578]\d{9}$/)){
            $('#phone').next().show();
        } else {
            $.ajax({
                type:'POST',
                url:'http://'+ip+'/api/user/add',
                data:{
                    token: $.cookie("token"),
                    name:$('#tianform input[name=name]').val(),
                    password:$('#tianform input[name=password]').val(),
                    email:$('#tianform input[name=email]').val(),
                    phone:$('#tianform input[name=phone]').val(),
                    usertype:$("#usertype").val(),
                    creator:$.cookie("username"),
                },
                dataType:'json',//数据类型,预期服务器返回的数据类型。
                success: function(r) {
                    if(r.success==false){
                        cjy_alert("用户添加有误(用户名，手机号，邮箱不可以其他账号重复)！请重新输入信息！")
                    }else {
                        cjy_alert("用户添加成功！")
                        $(':input','#tianform').val('');
                        location.reload();
                    }
                },
                error: function (msg) {//XMLHttpRequest,textStatus,errorThrown
                    cjy_alert('请求失败,可能网络出现错误！ ');
                },
            })
        }

    });
    //6.修改用户信息（修改密码也使用该接口）
    $("#xiugai").click(function(){
        if ($("input[name='ckb']:checked").length != 1){
            cjy_alert("请选中一个进行修改!")
            return false;
        }
    });
    $("#xgsj_post").click(function(){
        if ($("input[name='ckb']:checked").length != 1){
            cjy_alert("每次只能选中一个进行修改!")
        }else if($('#gname').val().length <= 1 || $('#gname').val().length >= 11 || !$('#gname').val().match(/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){1,9}$/)){
            $ ('#gname').next().show();
        }else if(!$('#gEmail1').val().match(/^\w+@\w+\.\w+$/i)){
            $('#gEmail1').next().show();
        } else if (!$('#gphone').val().match(/^1[34578]\d{9}$/)){
            $('#gphone').next().show();
        }else {
            var ids=$(':checkbox:checked').map(function(){return this.value}).get().join();
            $.ajax({
                type:'POST',
                url:'http://'+ip+'/api/user/update',
                data:{
                    token: $.cookie("token"),
                    _id:ids,
                    name:$('#gaiform input[name=name]').val(),
                    email:$('#gaiform input[name=email]').val(),
                    phone:$('#gaiform input[name=phone]').val(),
                    usertype:$("#gusertype").val(),
                },
                dataType:'json',//数据类型,预期服务器返回的数据类型。
                success: function(r) {
                    if(r.success==false){
                        if (r.message=="_id not exist"){
                            cjy_alert("账号不存在！")
                        }else {
                            cjy_alert("用户修改有误(用户名，手机号，邮箱不可以其他账号重复)！请重新操作！")
                        }
                    }else {
                        cjy_alert("用户修改成功！")
                        $(':input','#gaiform').val('');
                        location.reload();
                    }
                },
                error: function (msg) {//XMLHttpRequest,textStatus,errorThrown
                    cjy_alert('请求失败,可能网络出现错误！ ');
                },
            })
        }
    });
    //点击修改密码时，获取账号id存入cookie中
    $(document).on("click", ".open-AddBookDialog", function () {
        var myBookId = $(this).attr('data-id');
        $.cookie('_id', myBookId);
    });
    //    修改密码
    $("#gmsj_post").click(function(attr){
        if ($('#gpassword').val() == "" || $('#gpassword').val().length <= 3 || $('#gpassword').val().length>=11 || !$('#gpassword').val().match(/^[a-zA-Z]\w{3,9}$/)) {
            $ ('#gpassword').next().show();
        }else if($('#gquepassword').val() != $('#gpassword').val()){
            $ ('#gquepassword').next().show();
        } else {
            var tot=$.cookie("_id");
            $.ajax({
                type:'POST',
                url:'http://'+ip+'/api/user/update',
                data:{
                    token: $.cookie("token"),
                    _id:tot,
                    password:$('#gaimima input[name=password]').val(),
                },
                dataType:'json',//数据类型,预期服务器返回的数据类型。
                success: function(r) {
                    if(r.success==false){
                        cjy_alert("用户密码重置有误(必须选中要重置的用户)！请重新操作！")
                        $.removeCookie("_id");
                    }else {
                        cjy_alert("用户密码重置成功！")
                        $.removeCookie("_id");
                        location.reload();
                    }
                },
                error: function (msg) {//XMLHttpRequest,textStatus,errorThrown
                    cjy_alert('请求失败,可能网络出现错误！ ');
                    $.removeCookie("_id");
                },
            })
        }
    });
    //7.删除用户(根据_id删除)
    $(" #shanchu").click(function(){
        if ($("input[name='ckb']:checked").length < 1){
            cjy_alert("请选中一个或多个进行删除!")
            return false;
        }
    });
    $("#scsj_post").click(function(){
        $.ajax({
            type:'POST',
            url:'http://'+ip+'/api/user/delete',
            data:{
                token: $.cookie("token"),
                ids:$(':checkbox:checked').map(function(){return this.value}).get().join(),
            },
            dataType:'json',//数据类型,预期服务器返回的数据类型。
            success: function(r) {
                if(r.success==false){
                    cjy_alert("用户删除有误(必须选中要删除的用户才可以进行删除，一次只能删除一个)！请重新操作！")
                }else  {
                    cjy_alert("用户删除成功！")
                    location.reload();
                }
            },
            error: function (msg) {//XMLHttpRequest,textStatus,errorThrown
                cjy_alert('请求失败,可能网络出现错误！ ');
            },
        })
    });
});
