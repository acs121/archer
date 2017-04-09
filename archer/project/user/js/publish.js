/*
* @Author: Administrator
* @Date:   2017-04-02 16:32:39
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-07 16:29:21
*/

$(document).ready(function(){
	//	显示昵称
  $.ajax({
    url: "../../../../archer/user/nickname",
    type: "POST",
    success: function(data){
      var data=JSON.parse(data);
      $("#nickName").text(data.nickname);
        //  显示回收站和退出
      $("#nickName").click(function(){
        if($(this).next().css('display')=='none'){
          $(this).next().css("display","block");
        }else{
          $(this).next().css("display","none");
        }
      });
    },
    error: function(){
      window.location.href="index.html";
    }
  });
  //	生成url链接
  var URL = document.location.toString();
  var arr = URL.split('=');
  var Data = arr[1];
  $("#link").val("localhost/archer/project/user/writeQst.html?id="+Data);
  //生成二维码
  $('#code').qrcode("localhost/archer/project/user/writeQst.html?id="+Data);
  //  复制链接
  $("#copy").click(function(){
      var str = $("#link").val();
    //将字串放进剪贴板,执行完这个html页面后,你可以打开一个文本文件,按ctr+v看看.
    window.clipboardData.clearData();
    window.clipboardData.setData("Text", str);
  });
});