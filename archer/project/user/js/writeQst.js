/*
* @Author: Administrator
* @Date:   2017-04-03 09:56:14
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-07 10:36:47
*/
$(document).ready(function(){
	//	获取问卷
	var URL = document.location.toString();
  var arr = URL.split('=');
  var Data = arr[1].split('&');
   $.ajax({
    url: "../../../../archer/user/getQuestionnaire",
    type: "POST",
    data:{
    	id:Data[0]
    },
    success: function(data){
    	//  初始化问卷题目
    	var nameID=0;
    	var idCount=0;
      var newArr=data.问卷名;
      newArr=newArr.split("$$$");
      $("#questionTitle").text(newArr[0]);
      $("#discribe").text(newArr[1]);
      //	初始化题目
      for(var i=0;i<data.内容.length;i++){
      	if(data.内容[i].类型==1){
      		$("#content").append("<div class='question'>"+
        		"<label class='titleNum'>1.</label><p class='childTitle'>"+data.内容[i].题目+"</p>"+
        		"<label class='string'></label>"+
        		"<ul class='select'>"+
        		"</ul>"+
        	"</div>");
        	for(var j=0;j<data.内容[i].选项.length;j++){
        		$($(".select")[i]).append("<li>"+
      				"<input type='radio' name='"+nameID+"' id='"+(++idCount)+"'/>"+
          		"<label for='"+idCount+"'>"+data.内容[i].选项[j]+"</label>"+
      			"</li>");
        	}
      	}
      	if(data.内容[i].类型==2){
      		$("#content").append("<div class='question'>"+
        		"<label class='titleNum'>1.</label><p class='childTitle'>"+data.内容[i].题目+"</p>"+
        		"<label class='string'></label>"+
        		"<ul class='select'>"+
        		"</ul>"+
        	"</div>");
        	for(var j=0;j<data.内容[i].选项.length;j++){
        		$($(".select")[i]).append("<li>"+
      				"<input type='checkbox' name='"+nameID+"' id='"+(++idCount)+"'/>"+
          		"<label for='"+idCount+"'>"+data.内容[i].选项[j]+"</label>"+
      			"</li>");
        	}
      	}
      	if(data.内容[i].类型==3){
      		$("#content").append("<div class='question'>"+
      			"<label class='string'></label>"+
        		"<label class='titleNum'>1.</label><p class='childTitle'>"+data.内容[i].题目+"</p>"+
        		"<div class='fill' contenteditable='true'></div>"+
        	"</div>");
      	}
      	nameID++;
      }
      //	题号排序
      for(var i=0;i<$(".titleNum").length;i++){
        $($(".titleNum")[i]).text(i+1+".");
      }
      //	给隐藏文本框赋值
    	$("input[type='radio']").click(function(){
    		var object=$(this);
    		var name=$(this).attr("name");
    		for(var i=0;i<$("input[name='"+name+"']").length;i++){
    			if($($("input[name='"+name+"']")[i]).is(':checked')){
    				$(object).parent().parent().prev().text(i+1);
    			}
    		}
    	});
    	$("input[type='checkbox']").click(function(){
    		var object=$(this);
    		$(object).parent().parent().prev().text('');
    		var name=$(this).attr("name");
    		for(var i=0;i<$("input[name='"+name+"']").length;i++){
    			if($($("input[name='"+name+"']")[i]).is(':checked')){
    				var str=$(object).parent().parent().prev().text();
    				str=str+(i+1);
    				$(object).parent().parent().prev().text(str);
    			}
    		}
    	});
    	$(".fill").blur(function(){
    		var str=$(this).text();
    		$(this).parent().children(":first").text(str);
    	});
    	$("#refer").click(function(){
    		//	检查问卷是否填写完整
    		var divNum=0;
    		for(var i=0;i<$(".string").length;i++){
  				if($($(".string")[i]).text()==''){
  					divNum=i+1;
  				}
    		}
    		if(divNum!=0){
    			layer.open({
	          type: 1,
	          title: '您还没填完，是否提交？',
	          area: ['300px', '150px'],
	          skin: 'demo-class1',
	          content: $(".modalSubmit")
	        });
	        $("#question-submit-yes").click(function(){
	        	var content=[];
		    		for(var i=0;i<$(".string").length;i++){
		    			content[i]=$($(".string")[i]).text();
		    		}
		    		content=JSON.stringify(content);
		    		//	提交问卷
		    		$.ajax({
					    url: "../../../../archer/commitAnwser",
					    type: "POST",
					    data:{
					    	id:Data,
					    	answer_list:content
					    },
					    success: function(data){
					      layer.msg('提交成功', sucess);
					    },
					    error: function(){
					      layer.msg('访问失败', hint);
					    }
					  });
	        });
	        $("#question-submit-no").click(function(){
	        	$(".layui-layer-close").trigger("click");
	        	var a = $($(".question")[divNum-1]).offset().top;
	        	$("html,body").animate({scrollTop:a}, 100);
	        });
    		}else{
    			var content=[];
	    		for(var i=0;i<$(".string").length;i++){
	    			content[i]=$($(".string")[i]).text();
	    		}
	    		content=JSON.stringify(content);
	    		//	提交问卷
	    		$.ajax({
				    url: "../../../../archer/commitAnwser",
				    type: "POST",
				    data:{
				    	id:Data,
				    	answer_list:content
				    },
				    success: function(data){
				      layer.msg('提交成功', sucess);
				    },
				    error: function(){
				      layer.msg('访问失败', hint);
				    }
				  });
	    	}
    	});
      //  判断是查看还是填写
      console.log(Data[1]);
      if(Data[1]!=undefined){
        $("#refer").attr("disabled","disabled");
      }
    },
    error: function(){
      layer.msg('访问失败', hint);
    }
  });
});
