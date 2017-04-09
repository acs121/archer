/*
* @Author: Administrator
* @Date:   2017-03-21 19:57:03
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-07 16:27:37
*/

$(document).ready(function(){
  var idNum=0;  //id变量
  var sort1;    //  拖拽变量
  var Sortable;

	//	显示昵称
  $.ajax({
    url: "../../../../archer/user/nickname",
    type: "POST",
    success: function(data){
      var data=JSON.parse(data);
      $("#nickName").text(data.nickname);
    },
    error: function(){
      window.location.href="index.html";
    }
  });
  //  显示回收站和退出
  $("#nickName").click(function(){
    if($(this).next().css('display')=='none'){
      $(this).next().css("display","block");
    }else{
      $(this).next().css("display","none");
    }
  });
  //  判断是创建还是编辑
  function isEditor(){
    var URL = document.location.toString();
    if(URL.indexOf("=")>0){
      var arr = URL.split('=');
      var Data = arr[1];
      //  获取问卷信息
      $.ajax({
        url: "../../../../archer/user/getQuestionnaire",
        type: "POST",
        data:{
          id:Data
        },
        success: function(data){
          //  初始化问卷题目
          var newArr=data.问卷名;
          newArr=newArr.split("$$$");
          $("#questionTitle").text(newArr[0]);
          $("#questionDescription").text(newArr[1]);
          $(".question").remove();
          //  初始化题目选项
          var newNameId=idNum;
          for(var i=0;i<data.内容.length;i++){
            if(data.内容[i].类型==1){
              $("#content").append("<div class='question'>"+
                "<div class='child'>"+
                  "<input type='hidden' value='1'>"+
                  "<span class='sort'>88</span>"+
                  "<p class='childTitle' contenteditable='true' style='margin-left: 25px;' placeholder='单选题'>"+data.内容[i].题目+"</p>"+
                "</div>"+
                "<ul class='anwserSelect'>"+
                "</ul>"+
                "<div class='iconText'>"+
                  "<i class='small material-icons addSelect'>note_add<span class='warn'>添加选项</span></i>"+
                  "<i class='small material-icons questionDel'>no_sim<span class='warn'>删除问题</span></i>"+
                "</div>"+
              "</div>");
              for(var j=0;j<data.内容[i].选项.length;j++){
                $($(".anwserSelect")[i]).append("<li>"+
                  "<div class='selectMake'>"+
                    "<i class='small material-icons down'>call_received<span class='warn'>向下移动</span></i>"+
                    "<i class='small material-icons up'>call_made<span class='warn'>删除选项</span></i>"+
                    "<i class='small material-icons selectDel'>no_sim<span class='warn'>向上移动</span></i>"+
                  "</div>"+
                  "<input type='radio' name='initRadio"+newNameId+"' id='"+(++idNum)+"'/>"+
                  "<label for='"+idNum+"' style='float: left;'></label><p contenteditable='true' class='selectContent' style='margin-left: 25px;' placeholder='选项'>"+data.内容[i].选项[j]+"</p>"+
                "</li>");
              }
              //  让页面跳转到最新添加题的位置
              $('html,body').animate({ scrollTop: $(document).height() }, 100);
              nodeExchange();
              titleDel();
              addSelect();
              selectDel();
              selectMake();
              newDrog();
              newNameId++;
            }
            if(data.内容[i].类型==2){
              $("#content").append("<div class='question'>"+
                "<div class='child'>"+
                  "<input type='hidden' value='2'>"+
                  "<span class='sort'>88</span>"+
                  "<p class='childTitle' contenteditable='true' style='margin-left: 25px;' placeholder='多选题'>"+data.内容[i].题目+"</p>"+
                "</div>"+
                "<ul class='anwserSelect'>"+
                "</ul>"+
                "<div class='iconText'>"+
                  "<i class='small material-icons addSelect'>note_add<span class='warn'>添加选项</span></i>"+
                  "<i class='small material-icons questionDel'>no_sim<span class='warn'>删除问题</span></i>"+
                "</div>"+
              "</div>");
              for(var j=0;j<data.内容[i].选项.length;j++){
                $($(".anwserSelect")[i]).append("<li>"+
                  "<div class='selectMake'>"+
                    "<i class='small material-icons down'>call_received<span class='warn'>向下移动</span></i>"+
                    "<i class='small material-icons up'>call_made<span class='warn'>删除选项</span></i>"+
                    "<i class='small material-icons selectDel'>no_sim<span class='warn'>向上移动</span></i>"+
                  "</div>"+
                  "<input type='checkbox' name='initCheckbox"+newNameId+"' id='"+(++idNum)+"'/>"+
                  "<label for='"+idNum+"' style='float: left;'></label><p contenteditable='true' class='selectContent' style='margin-left: 25px;' placeholder='选项'>"+data.内容[i].选项[j]+"</p>"+
                "</li>");
              }
              //  让页面跳转到最新添加题的位置
              $('html,body').animate({ scrollTop: $(document).height() }, 100);
              nodeExchange();
              titleDel();
              addSelect();
              selectDel();
              selectMake();
              newDrog();
              newNameId++;
            }
            if(data.内容[i].类型==3){
              $("#content").append("<div class='question'>"+
                "<div class='child'>"+
                  "<input type='hidden' value='3'>"+
                  "<span class='sort'>88</span>"+
                  "<p class='childTitle' contenteditable='true' style='margin-left: 25px;' placeholder='问答题'>"+data.内容[i].题目+"</p>"+
                "</div>"+
                "<div class='fillAnwser' contenteditable='true' style='height: 50px;margin-top: 15px;margin-bottom: 15px;border:solid 2px  rgb(163,158,158);border-radius: 3px;''></div>"+
                "<div class='iconText'>"+
                  "<i class='small material-icons questionDel'>no_sim</i>"+
                "</div>"+
              "</div>");
            }
          }
        },
        error: function(){
          layer.msg('访问失败', hint);
        }
      });
    }
  }
  isEditor();

  //  产生拖动排序
  $("#drag").click(function(){
    E.config({
        baseUrl : './js/'
    });

    E.use( 'sortable', function(){
      Sortable = E.ui.Sortable;
      sort1 = new Sortable( '#content');
    });
    $("#drag").css("display","none");
    $("#resetDrag").css("display","block");
  });
  $("#resetDrag").click(function(){
    sort1.destroy();
    $("#drag").css("display","block");
    $("#resetDrag").css("display","none");
    newDrog();
  });

  function newDrog(){
      for(var i=0;i<$(".sort").length;i++){
        $($(".sort")[i]).text(i+1);
      }
  }
  newDrog();
  //  题目增加
  function addTitle(){
    $("#radioTopic").click(function(){
      var nameId=idNum;
      $("#content").append("<div class='question'>"+
        "<div class='child'>"+
          "<input type='hidden' value='1'>"+
          "<span class='sort'>88</span>"+
          "<p class='childTitle' contenteditable='true' style='margin-left: 25px;' placeholder='单选题'></p>"+
        "</div>"+
        "<ul class='anwserSelect'>"+
          "<li>"+
            "<div class='selectMake'>"+
              "<i class='small material-icons down'>call_received<span class='warn'>向下移动</span></i>"+
              "<i class='small material-icons up'>call_made<span class='warn'>删除选项</span></i>"+
              "<i class='small material-icons selectDel'>no_sim<span class='warn'>向上移动</span></i>"+
            "</div>"+
            "<input type='radio' name='radio"+nameId+"' id='"+(++idNum)+"'/>"+
            "<label for='"+idNum+"' style='float: left;'></label><p contenteditable='true' class='selectContent' style='margin-left: 25px;' placeholder='选项'></p>"+
          "</li>"+
          "<li>"+
            "<div class='selectMake'>"+
              "<i class='small material-icons down'>call_received<span class='warn'>向下移动</span></i>"+
              "<i class='small material-icons up'>call_made<span class='warn'>删除选项</span></i>"+
              "<i class='small material-icons selectDel'>no_sim<span class='warn'>向上移动</span></i>"+
            "</div>"+
            "<input type='radio' name='radio"+nameId+"' id='"+(++idNum)+"' />"+
            "<label for='"+idNum+"' style='float: left;'></label><p contenteditable='true' class='selectContent' style='margin-left: 25px;' placeholder='选项'></p>"+
          "</li>"+
        "</ul>"+
        "<div class='iconText'>"+
          "<i class='small material-icons addSelect'>note_add</i>"+
          "<i class='small material-icons questionDel'>no_sim</i>"+
        "</div>"+
      "</div>");
      //  让页面跳转到最新添加题的位置
      $('html,body').animate({ scrollTop: $(document).height() }, 100);
      nodeExchange();
      titleDel();
      addSelect();
      selectDel();
      selectMake();
      newDrog();
    });
    $("#checkboxTopic").click(function(){
      var nameId=idNum;
      $("#content").append("<div class='question'>"+
        "<div class='child'>"+
          "<input type='hidden' value='2'>"+
          "<span class='sort'>88</span>"+
          "<p class='childTitle' contenteditable='true' style='margin-left: 25px;' placeholder='多选题'></p>"+
        "</div>"+
        "<ul class='anwserSelect'>"+
          "<li>"+
            "<div class='selectMake'>"+
              "<i class='small material-icons down'>call_received<span class='warn'>向下移动</span></i>"+
              "<i class='small material-icons up'>call_made<span class='warn'>删除选项</span></i>"+
              "<i class='small material-icons selectDel'>no_sim<span class='warn'>向上移动</span></i>"+
            "</div>"+
            "<input type='checkbox' name='radio"+nameId+"' id='"+(++idNum)+"'/>"+
            "<label for='"+idNum+"' style='float: left;'></label><p contenteditable='true' class='selectContent' style='margin-left: 25px;' placeholder='选项'></p>"+
          "</li>"+
          "<li>"+
            "<div class='selectMake'>"+
              "<i class='small material-icons down'>call_received<span class='warn'>向下移动</span></i>"+
              "<i class='small material-icons up'>call_made<span class='warn'>删除选项</span></i>"+
              "<i class='small material-icons selectDel'>no_sim<span class='warn'>向上移动</span></i>"+
            "</div>"+
            "<input type='checkbox' name='radio"+nameId+"' id='"+(++idNum)+"' />"+
            "<label for='"+idNum+"' style='float: left;'></label><p contenteditable='true' class='selectContent' style='margin-left: 25px;' placeholder='选项'></p>"+
          "</li>"+
        "</ul>"+
        "<div class='iconText'>"+
          "<i class='small material-icons addSelect'>note_add</i>"+
          "<i class='small material-icons questionDel'>no_sim</i>"+
        "</div>"+
      "</div>");
      //  让页面跳转到最新添加题的位置
      $('html,body').animate({ scrollTop: $(document).height() }, 100);
      nodeExchange();
      titleDel();
      addSelect();
      selectDel();
      selectMake();
      newDrog();
    });
    $("#essayQuestion").click(function(){
      $("#content").append("<div class='question'>"+
        "<div class='child'>"+
          "<input type='hidden' value='3'>"+
          "<span class='sort'>88</span>"+
          "<p class='childTitle' contenteditable='true' style='margin-left: 25px;' placeholder='问答题'></p>"+
        "</div>"+
        "<div class='fillAnwser' contenteditable='true' style='height: 50px;margin-top: 15px;margin-bottom: 15px;border:solid 2px  rgb(163,158,158);border-radius: 3px;''></div>"+
        "<div class='iconText'>"+
          "<i class='small material-icons questionDel'>no_sim</i>"+
        "</div>"+
      "</div>");
      //  让页面跳转到最新添加题的位置
      $('html,body').animate({ scrollTop: $(document).height() }, 100);
      nodeExchange();
      titleDel();
      addSelect();
      selectDel();
      newDrog();
    });
  }
  //  选项操作框
  function selectMake(){
    $(".selectContent").focus(function(){
      $(this).parent().children(":first").css("display","block");
    });
    $(".selectContent").blur(function(){
        $(this).parent().children(":first").css("display","none");
    });
  }

  //  选项删除
  function selectDel(){
    $(".selectDel").mousedown(function(){
      $(this).parent().parent().remove();
    });
  }
  selectDel();
  //  选项增加
  function addSelect(){
    $(".addSelect").unbind("click");
    $(".addSelect").click(function(){
      if($(this).parent().parent().children(":first").children(":first").val()==1){
        var addNameId=$(this).parent().prev().children(":first").children(":last").prev().prev().attr("name");
        $(this).parent().prev().append("<li>"+
        "<div class='selectMake'>"+
          "<i class='small material-icons down'>call_received<span class='warn'>向下移动</span></i>"+
          "<i class='small material-icons up'>call_made<span class='warn'>删除选项</span></i>"+
          "<i class='small material-icons selectDel'>no_sim<span class='warn'>向上移动</span></i>"+
        "</div>"+
        "<input type='radio' name='"+addNameId+"' id='"+(++idNum)+"' />"+
        "<label for='"+idNum+"' style='float: left;'></label><p contenteditable='true' class='selectContent' style='margin-left: 25px;' placeholder='选项'></p>"+
      "</li>");
      }else if($(this).parent().parent().children(":first").children(":first").val()==2){
        var addNameId=$(this).parent().prev().children(":first").children(":last").prev().prev().attr("name");
        $(this).parent().prev().append("<li>"+
        "<div class='selectMake'>"+
          "<i class='small material-icons down'>call_received<span class='warn'>向下移动</span></i>"+
          "<i class='small material-icons up'>call_made<span class='warn'>删除选项</span></i>"+
          "<i class='small material-icons selectDel'>no_sim<span class='warn'>向上移动</span></i>"+
        "</div>"+
        "<input type='checkbox' name='"+addNameId+"' id='"+(++idNum)+"' />"+
        "<label for='"+idNum+"' style='float: left;'></label><p contenteditable='true' class='selectContent' style='margin-left: 25px;' placeholder='选项'></p>"+
      "</li>");
      }
      selectMake();
      selectDel();
      nodeExchange();
    });
  }
  addSelect();
  //  节点交换
  function nodeExchange(){
    $(".down").unbind("mousedown");
    $(".down").mousedown(function(){
      var $one_li=$(this).parent().parent();
      var $two_li=$(this).parent().parent().next();
      $two_li.insertBefore($one_li);
    });
    $(".up").unbind("mousedown");
    $(".up").mousedown(function(){
      var $one_li=$(this).parent().parent();
      var $two_li=$(this).parent().parent().prev();
      $one_li.insertBefore($two_li);
    });
  }
  nodeExchange();
  selectMake();
  //  题目删除
  function titleDel(){
    $(".questionDel").mousedown(function(){
      var object=$(this).parent().parent();
      layer.open({
        type: 1,
        title: '是否删除？',
        area: ['300px', '150px'],
        skin: 'demo-class1',
        content: $(".modalDel")
      });
      $("#question-delete-yes").click(function(){
        $(object).remove();
        $(".layui-layer-close").trigger("click");
      });
      $("#question-delete-no").click(function(){
        $(".layui-layer-close").trigger("click");
      });
    });
  }
  titleDel();
  addTitle();
  //	提交问卷
  $("#submit").click(function(){
  	var questionContent='';  //  题目内容
    var childContent='';    //  选项+题目内容
    var optionContent='';   //  选项内容
    var str=new Array();    //  过渡数组
    var questionTitle=$("#questionTitle").text()+"$$$"+$("#questionDescription").text();
    for(var i=0;i<$(".childTitle").length;i++){
      childContent='"题目"'+':'+'"'+$($(".childTitle")[i]).text()+'"'+","+'"类型"'+":"+$($(".childTitle")[i]).prev().prev().val()+",";
      optionContent='';
      for(var j=0;j<$($(".childTitle")[i]).parent().next().children().length;j++){
        optionContent+='"'+$($($(".childTitle")[i]).parent().next().children()[j]).children(":last").text()+'"'+",";
      }
      optionContent=optionContent.substring(0,optionContent.length-1);
      optionContent='"选项"'+":"+"["+optionContent+"]";
      childContent+=optionContent;
      str[i]="{"+childContent+"}"+",";
    }
    childContent='';
    for(var m=0;m<str.length;m++){
      childContent+=str[m];
    }
    childContent=childContent.substring(0,childContent.length-1);
    questionContent="["+childContent+"]";
    //  判断是否为编辑
    var newURL= document.location.toString();
    var questionId= newURL.split('=');
    questionId= questionId[1];
    if(newURL.indexOf("=")>0){
      $.ajax({
        url: "../../../../archer/user/updateQuestionnaire",
        type: "POST",
        async: false,
        data:{
          title:questionTitle,
          content:questionContent,
          id:questionId
        },
        dataType:"text",
        success: function(data){
          layer.msg('保存成功', sucess);
        },
        error: function(){
          layer.msg('访问失败', hint);
        }
      });
    }else{
        //  传递页面数据
      $.ajax({
        url: "../../../../archer/user/createQuestionnaire",
        type: "POST",
        async: false,
        data:{
          title:questionTitle,
          content:questionContent
        },
        dataType:"text",
        success: function(data){
          layer.msg('保存成功', sucess);
        },
        error: function(){
          layer.msg('访问失败', hint);
        }
      });
    }
  });
  //  离开页面提示
  // $(window).bind('beforeunload',function(){return '您输入的内容尚未保存，确定离开此页面吗？';});

});