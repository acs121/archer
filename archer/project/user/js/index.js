
  $("document").ready(function(){
    $("h1").slideDown();

    //  页面滚动
    $('.Slide').bind('mousewheel', function(event, delta) {
        if(delta>0){
          dir='up'
        }else{
          dir='down'
        }
        if (dir == 'up') {
          if($(this).attr("id")=='Slide2'){
            $("#Slide1").trigger("click");
          }else if($(this).attr("id")=='Slide3'){
            $("#Slide2").trigger("click");
          }else if($(this).attr("id")=='Slide4'){
            $("#Slide3").trigger("click");
          }else if($(this).attr("id")=='Slide5'){
            $("#Slide4").trigger("click");
          }
        } else if(dir=='down'){
          if($(this).attr("id")=='Slide1'){
            $("#Slide2").trigger("click");
          }else if($(this).attr("id")=='Slide2'){
            $("#Slide3").trigger("click");
          }
          else if($(this).attr("id")=='Slide3'){
            $("#Slide4").trigger("click");
          }
          else if($(this).attr("id")=='Slide4'){
            $("#Slide5").trigger("click");
          }
        }
    });
    //登陆注册的样式
    var $loginMsg = $('.loginMsg'),
    $login = $('.login'),
    $signupMsg = $('.signupMsg'),
    $signup = $('.signup'),
    $frontbox = $('.frontbox');
    $('#switch1').on('click', function() {
      $loginMsg.toggleClass("visibility");
      $frontbox.addClass("moving");
      $signupMsg.toggleClass("visibility");

      $signup.toggleClass('hide');
      $login.toggleClass('hide');
    });
    $('#switch2').on('click', function() {
      $loginMsg.toggleClass("visibility");
      $frontbox.removeClass("moving");
      $signupMsg.toggleClass("visibility");

      $signup.toggleClass('hide');
      $login.toggleClass('hide');
    });
    // setTimeout(function(){
    //   $('#switch1').click()
    // },1000);
    // setTimeout(function(){
    //   $('#switch2').click()
    // },3000);
    //  登录注册弹出层
    $("#login").click(function(){
      layer.open({
      type: 1,
      title: '',
      area: ['55%', '70%'],
      skin: 'demo-class1',
      content: $("#loginPopup")
      });
    });
  });