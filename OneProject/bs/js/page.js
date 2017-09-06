/**************************/
//JQuery分页栏  
/**************************/
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
var PageIndex= 1;       //设置当前页码
var RecordCount= $.cookie("count");  //设置数据总数
var	TotalPage= Math.ceil(parseInt($.cookie("count"))/10);      //设置总页数
var tott=$.cookie("token");
var ip="192.168.9.202:3001";
// 首页
	$("#HomePage").click(function(){
		if($.cookie("Page")==1){
			cjy_alert("当前已经是首页！")
			return false;
		}else {
			$.ajax({
				type:'POST',
				url:'http://'+ip+'/api/user/search',
				data:{
					token: tott,
					skip: 0,
					limit: 10,
					name:$('ul li input[name=name]').val(),
					usertype:$('ul li select[name=usertype]').val(),
				},
				dataType:'json',//数据类型,预期服务器返回的数据类型。
				success: function(r) {
					if (r.success==true){
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
								html += "<tr class='trtd'><td><input type='checkbox' class='ckb' name='ckb' value='"+user._id+"'></td><td id='ckb'>"+user._id+"</td><td>"+user.name+"</td><td>"+typee+"</td><td>" + user.phone + "</td><td>" + user.email + "</td><td>" + user.creator + "</td><td>" + dateTimecreatedAt + "</td><td>" + dateTimeupdatedAt + "</td><td><button type='button' name='gaimi' class='open-AddBookDialog btn btn-primary' data-toggle='modal' data-id='"+user._id+"' data-target='#myModal5'>改密</button></td></tr>";
							};
						}
						$(".trtd").not($(".trtd").first()).empty();
						$(".trtd").hide().filter(":contains('"+($('#ttt').append(html))+"')").show();//filter和contains共同来实现了这个功能。
						$("#chadaohang").show();
						col();//隔行换色
					}
					$.cookie('Page', PageIndex);
					$("#Page").html($.cookie("Page"));

				},
				error: function (msg) {
					if (msg.message='No token provided'){
						cjy_alert("请先登录！")
						location = '../../index.html';
					}else {
						cjy_alert('请求失败,可能网络出现错误！ ');
					}
				},
			});
		}

});
//上一页
	$("#PrevPage").click(function(){
	if($.cookie("Page")==1){
		cjy_alert("当前已经是首页！")
		return false;
	}else if ($.cookie("Page")>1){
		var xia=parseInt($.cookie("Page"))-1;
		$.ajax({
			type:'POST',
			url:'http://'+ip+'/api/user/search',
			data:{
				token: tott,
				skip: xia*10-10,
				limit: 10,
				name:$('ul li input[name=name]').val(),
				usertype:$('ul li select[name=usertype]').val(),
			},
			dataType:'json',//数据类型,预期服务器返回的数据类型。
			success: function(r) {
				if (r.success==true) {
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
							html += "<tr class='trtd'><td><input type='checkbox' class='ckb' name='ckb' value='"+user._id+"'></td><td id='ckb'>"+user._id+"</td><td>"+user.name+"</td><td>"+typee+"</td><td>" + user.phone + "</td><td>" + user.email + "</td><td>" + user.creator + "</td><td>" + dateTimecreatedAt + "</td><td>" + dateTimeupdatedAt + "</td><td><button type='button' name='gaimi' class='open-AddBookDialog btn btn-primary' data-toggle='modal' data-id='"+user._id+"' data-target='#myModal5'>改密</button></td></tr>";
						};

					}
					$(".trtd").not($(".trtd").first()).empty();
					$(".trtd").hide().filter(":contains('"+($('#ttt').append(html))+"')").show();//filter和contains共同来实现了这个功能。
					$("#chadaohang").show();
					col();//隔行换色

				}
				$.cookie('Page', xia);
				$("#Page").html($.cookie("Page"));
			},
			error: function (msg) {
				if (msg.message='No token provided'){
					cjy_alert("请先登录！")
					location = '../../index.html';
				}else {
					cjy_alert('请求失败,可能网络出现错误！ ');
				}
			},
		});
	}


});
//下一页
	$("#NextPage").click(function(){
	var xia=parseInt($.cookie("Page"))+1;
		$.ajax({
			type:'POST',
			url:'http://'+ip+'/api/user/search',
			data:{
				token: tott,
				skip: xia*10-10,
				limit: 10,
				name:$('ul li input[name=name]').val(),
				usertype:$('ul li select[name=usertype]').val(),
			},
			dataType:'json',//数据类型,预期服务器返回的数据类型。
			success: function(r) {
				if (r.success==true) {
					if (r.users.length==0){
						cjy_alert("没有更多了！")
						return false;
					}
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
							html += "<tr class='trtd'><td><input type='checkbox' class='ckb' name='ckb' value='"+user._id+"'></td><td id='ckb'>"+user._id+"</td><td>"+user.name+"</td><td>"+typee+"</td><td>" + user.phone + "</td><td>" + user.email + "</td><td>" + user.creator + "</td><td>" + dateTimecreatedAt + "</td><td>" + dateTimeupdatedAt + "</td><td><button type='button' name='gaimi' class='open-AddBookDialog btn btn-primary' data-toggle='modal' data-id='"+user._id+"' data-target='#myModal5'>改密</button></td></tr>";
						};

					}
					$(".trtd").not($(".trtd").first()).empty();
					$(".trtd").hide().filter(":contains('"+($('#ttt').append(html))+"')").show();//filter和contains共同来实现了这个功能。
					$("#chadaohang").show();
					col();//隔行换色
				}
				$.cookie('Page', xia);
				$("#Page").html($.cookie("Page"));
			},
			error: function (msg) {
				if (msg.message='No token provided'){
					cjy_alert("请先登录！")
					location = '../../index.html';
				}else {
					cjy_alert('请求失败,可能网络出现错误！ ');
				}
			},
		});
});
//尾页
	$("#EndPage").click(function(){
		if($.cookie("Page")==Math.ceil(parseInt($.cookie("count"))/10)){
			cjy_alert("当前已经是尾页了！")
			return false;
		}
		$.ajax({
			type:'POST',
			url:'http://'+ip+'/api/user/search',
			data:{
				token: tott,
				skip: Math.ceil(parseInt($.cookie("count"))/10)*10-10,
				limit: 10,
				name:$('ul li input[name=name]').val(),
				usertype:$('ul li select[name=usertype]').val(),
			},
			dataType:'json',//数据类型,预期服务器返回的数据类型。
			success: function(r) {
				if (r.success==true) {
					if (r.users.length==0){
						cjy_alert("没有更多了！")
						return false;
					}
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
							html += "<tr class='trtd'><td><input type='checkbox' class='ckb' name='ckb' value='"+user._id+"'></td><td id='ckb'>"+user._id+"</td><td>"+user.name+"</td><td>"+typee+"</td><td>" + user.phone + "</td><td>" + user.email + "</td><td>" + user.creator + "</td><td>" + dateTimecreatedAt + "</td><td>" + dateTimeupdatedAt + "</td><td><button type='button' name='gaimi' class='open-AddBookDialog btn btn-primary' data-toggle='modal' data-id='"+user._id+"' data-target='#myModal5'>改密</button></td></tr>";
						};

					}
					$(".trtd").not($(".trtd").first()).empty();
					$(".trtd").hide().filter(":contains('"+($('#ttt').append(html))+"')").show();//filter和contains共同来实现了这个功能。
					$("#chadaohang").show();
					col();//隔行换色
				}
				$.cookie('Page', Math.ceil(parseInt($.cookie("count"))/10));
				$("#Page").html($.cookie("Page"));
			},
			error: function (msg) {
				if (msg.message='No token provided'){
					cjy_alert("请先登录！")
					location = '../../index.html';
				}else {
					cjy_alert('请求失败,可能网络出现错误！ ');
				}
			},
		});

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