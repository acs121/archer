/*
* @Author: Administrator
* @Date:   2017-04-01 20:14:48
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-07 16:12:00
*/

$(document).ready(function(){
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
    if($(".collection").css('display')=='none'){
      $(".collection").css("display","block");
    }else{
      $(".collection").css("display","none");
    }
  });
  //  初始化回收站
  $.ajax({
    url: "../../../../archer/user/getQuestionnaireList",
    type: "POST",
    data: {
      isDelete:true
    },
    success: function(data){
      var data=JSON.parse(data);
      for(var i=0;i<data.length;i++){
      var arr=data[i].questionnaire_name.split("$$$");
        $("tbody").append("<tr>"+
            "<td>"+displayPart(arr[0],8)+"</td>"+
            "<td style='cursor:pointer;'><a class='recycleDel'>删除</a><input type='hidden' value='"+data[i].questionnaire_id+"'></td>"+
            "<td style='cursor:pointer;'><a class='recover'>恢复</a><input type='hidden' value='"+data[i].questionnaire_id+"'></td>"+
          "</tr>");
      }

      for(var i=0;i<$("tbody").children().length;i++){
        $($("tbody tr")[i]).children(":first").nextAll().css({"position":"relative","bottom":"30px"});
      }
      if($("tbody").children().length>0){
        $("tfoot tr td").append("<a class='waves-effect waves-light btn' id='clear'>清空回收站</a>");
      }
    },
    error: function(){
      layer.msg('删除失败', hint);
    }
  });
  //  显示回收站内容
  $("#recycle").click(function(){
    layer.open({
      type: 1,
      title: '回收站',
      area: ['600px', '450px'],
      skin: 'demo-class1',
      content: $(".recycle")
    });
    //  彻底删除回收站
    $(".recycleDel").parent().click(function(){
      var object=$(this).children();
      var questionnaire_id=$(object).next().val();
      layer.open({
        type: 1,
        title: '是否彻底删除问卷',
        area: ['300px', '150px'],
        skin: 'demo-class1',
        content: $(".recycleDelete")
      });
      $("#recycle-delete-yes").click(function(){
        $.ajax({
            url: "../../../../archer/user/deleteQuestionnaire",
            type: "POST",
            data:{
              id:questionnaire_id,
              isRecycle:false
            },
            success: function(data){
              setTimeout(function(){
                location.reload();
              },1000);
              layer.msg('删除成功', sucess);
            },
            error: function(){
              layer.msg('删除失败', hint);
            }
          });
      });
      $("#recycle-delete-no").click(function(){
        $(".layui-layer-close").trigger("click");
      });
    });
    //  恢复回收站问卷
    $(".recover").parent().click(function(){
      var object=$(this).children();
      var questionnaire_id=$(object).next().val();
      layer.open({
        type: 1,
        title: '是否恢复问卷',
        area: ['300px', '150px'],
        skin: 'demo-class1',
        content: $(".recoverModal")
      });
      $("#recover-yes").click(function(){
        $.ajax({
          url: "../../../../archer/user/changeStatus",
          type: "POST",
          data:{
            id:questionnaire_id
          },
          success: function(data){
            setTimeout(function(){
                location.reload();
              },1000);
            layer.msg('恢复成功', sucess);
          },
          error: function(){
            layer.msg('访问失败', hint);
          }
        });
      });
      $("#recover-no").click(function(){
        $(".layui-layer-close").trigger("click");
      });
    });
  });
  //超出长度显示省略号
  function displayPart(obj,length) {
    if(obj.length>length){
      obj=obj.substring(0,length)+"……";
    }
    return obj;
  }
  $.ajax({
    url: "../../../../archer/user/getQuestionnaireList",
    type: "POST",
    success: function(data){
    	var data=JSON.parse(data);
      for(var i=0;i<data.length;i++){
        //  获取问卷列表
        var arr=data[i].questionnaire_name.split("$$$");
        $(".row").append("<div class='col s4'>"+
          "<div class='card darken-1'>"+
            "<div class='card-content white-text'>"+
              "<span class='card-title'>"+displayPart(arr[0],7)+"</span>"+
              "<p>"+displayPart(arr[1],30)+"</p>"+
              "<input type='hidden' value="+data[i].questionnaire_id+">"+
              "<div class='contentMake'>"+
                "<i class='material-icons editorQst'>note_add<span class='warn'>编辑问卷</span></i>"+
                "<i class='material-icons questionDel'>no_sim<span class='warn'>删除问卷</span></i>"+
                "<i class='material-icons dataAnalysis'>insert_chart<span class='warn'>数据分析</span></i>"+
                "<i class='material-icons publishQst'>present_to_all<span class='warn'>发布问卷</span></i>"+
                "<i class='material-icons stopPublish'>play_arrow<span class='warn'>停止发布</span></i>"+
                "<i class='material-icons look'>my_location<span class='warn'>查看问卷</span></i>"+
                "<i class='material-icons link'>library_books<span class='warn'>查看链接</span></i>"+
              "</div>"+
            "</div>"+
          "</div>"+
        "</div>");
      }
      //  判断按钮显示
      for(var i=0;i<data.length;i++){
        if(data[i].status==0){
          $($(".contentMake")[i]).children("i.dataAnalysis").css("display","none");
          $($(".contentMake")[i]).children("i.stopPublish").css("display","none");
          $($(".contentMake")[i]).children("i.link").css("display","none");
        }
        if(data[i].status==1){
          $($(".contentMake")[i]).children("i.editorQst").css("display","none");
          $($(".contentMake")[i]).children("i.questionDel").css("display","none");
          $($(".contentMake")[i]).children("i.publishQst").css("display","none");
        }
        if(data[i].status==2){
          $($(".contentMake")[i]).children("i.stopPublish").css("display","none");
          $($(".contentMake")[i]).children("i.publishQst").css("display","none");
          $($(".contentMake")[i]).children("i.link").css("display","none");
        }
      }
      //  删除问卷
      $(".questionDel").click(function(){
        layer.open({
          type: 1,
          title: '是否删除',
          area: ['300px', '150px'],
          skin: 'demo-class1',
          content: $(".modalDel")
        });
        var questionnaire_id=$(this).parent().prev().val();
        $("#question-delete-yes").click(function(){
          $.ajax({
            url: "../../../../archer/user/deleteQuestionnaire",
            type: "POST",
            data:{
              id:questionnaire_id,
              isRecycle:true
            },
            success: function(data){
              setTimeout(function(){
                location.reload();
              },1000);
              layer.msg('删除成功', sucess);
            },
            error: function(){
              layer.msg('删除失败', hint);
            }
          });
           $(".layui-layer-close").trigger("click");
        });
        $("#question-delete-no").click(function(){
          $(".layui-layer-close").trigger("click");
        });
      });
      //  编辑问卷
      $(".editorQst").click(function(){
        var questionnaire_id=$(this).parent().prev().val();
        window.location.href="question.html?id="+questionnaire_id;
      });
      //  发布问卷
      $(".publishQst").click(function(){
        var questionnaire_id=$(this).parent().prev().val();
        $.ajax({
          url: "../../../../archer/user/changeStatus",
          type: "POST",
          data:{
            id:questionnaire_id
          },
          success: function(data){
            window.location.href="publish.html?id="+questionnaire_id;
          },
          error: function(){
            layer.msg('发布失败', hint);
          }
        });
      });
      //` 停止发布
      $(".stopPublish").click(function(){
        var questionnaire_id=$(this).parent().prev().val();
        $.ajax({
          url: "../../../../archer/user/changeStatus",
          type: "POST",
          data:{
            id:questionnaire_id
          },
          success: function(data){
            setTimeout(function(){
                location.reload();
              },1000);
            layer.msg('停止成功', sucess);
          },
          error: function(){
            layer.msg('访问失败', hint);
          }
        });
      });
      //  查看问卷
      $(".look").click(function(){
        var questionnaire_id=$(this).parent().prev().val();
        window.location.href="writeQst.html?id="+questionnaire_id+"&look";
      });
      //  查看链接
      $(".link").click(function(){
        var questionnaire_id=$(this).parent().prev().val();
        window.location.href="publish.html?id="+questionnaire_id;
      });
    },
    error: function(){
      layer.msg('访问失败', hint);
    }
  });
  //	新建问卷跳转
  $(".addButton").click(function(){
    window.location.href="question.html";
  });
});