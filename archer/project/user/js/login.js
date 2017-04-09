/*
* @Author: Administrator
* @Date:   2017-03-12 14:25:29
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-05 11:58:08
*/

$(document).ready(function() {
	// 登陆获取验证码
	$("#authcode-one").focus(function(){
			//	加载验证码
		$.ajax({
		  url: "../../../../archer/codeImg?type=loginCode",
		  type: "POST",
		  success: function(data){
		    $(".authCode img").attr("src","../../../../archer/codeImg?type=loginCode&"+Math.random());
		  },
		  error: function(){
		    layer.msg('访问失败', hint);
		  }
	  });
	});
	//	注册获取验证码
	$("#authcode-two").focus(function(){
			//	加载验证码
		$.ajax({
		  url: "../../../../archer/codeImg?type=registCode",
		  type: "POST",
		  success: function(data){
		    $(".authCode img").attr("src","../../../../archer/codeImg?type=registCode&"+Math.random());
		  },
		  error: function(){
		    layer.msg('访问失败', hint);
		  }
	  });
	});
	//	注册验证

	//	用户名验证
	function checkName() {
		var reg=/^[\u4e00-\u9fa5_a-zA-Z0-9]{5,15}/;
		if(reg.test($("#nikename").val())){
				return true;
		}else{
			layer.msg("昵称长度为5——15,不能有非法字符",hint);
			return false;
		}
	}
	//	邮箱验证
	function checkEmail() {
		var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(reg.test($("#email-two").val())){
			return true;
		}else{
			layer.msg("邮箱格式不正确",hint);
			return false;
		}
	}
	//	密码长度控制
	$("#password-two").keydown(function() {
		if($("#password-two").val().length>16){
			var value=$("#password-two").val();
			value=value.substring(0,16);
			$("#password-two").val(value);
		}
	});
	//	密码验证
	function checkPwd() {
		var reg=/^[a-zA-Z0-9]/;
		if(reg.test($("#password-two").val())){
			return true;
		}else{
			layer.msg("密码不能有非法字符且不为空",hint);
			return false;
		}
	}
	$("#register").click(function() {
		checkName();
		if(checkName())
		{
			checkEmail();
			if(checkEmail()){
				checkPwd();
				if(checkPwd()){
					// 验证注册验证码
					$.ajax({
					  url: "../../../../archer/regist",
					  type: "GET",
					  data: {
					  	registCode: $("#authcode-two").val(),
					  	username: $("#email-two").val(),
					  	nickname: $("#nikename").val(),
					  	password: $("#password-two").val()
					  },
					  success: function(data){
					  	var data=JSON.parse(data);
					  	//  注册
					    if(data.CodeIsOK=='false'){
					    	layer.msg('验证码不正确', hint);
					    }else if(data.IsRegist=='false'){
					    	layer.msg('用户名已存在', hint);
					    }else{
					    	layer.msg('注册成功', sucess);
					    }
					  },
					  error: function(){
					    layer.msg('访问失败', hint);
					  }
				  });
				}
			}
		}
	});
	//	登陆
	$("#userLogin").click(function(){
		$.ajax({
		  url: "../../../../archer/login",
		  type: "GET",
		  data: {
		  	loginCode: $("#authcode-one").val(),
		  	username: $("#email-one").val(),
		  	password: $("#password-one").val()
		  },
		  success: function(data){
		  	var data=JSON.parse(data);
		  	//  注册
		    if(data.CodeIsOK=='false'){
		    	layer.msg('验证码不正确', hint);
		    }else if(data.IsLogin=='false'){
		    	layer.msg('用户名或密码错误', hint);
		    }else{
		    	window.location.href="myHome.html";
		    }
		  },
		  error: function(){
		    layer.msg('访问失败', hint);
		  }
	  });
	});
});