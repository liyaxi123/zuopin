
var login_page={
    init: function(){
        this.login_in()
    },
    //点击登录按钮后的事件
    login_in: function(){
        var _this =this;
        $('.forgetPass').click(function(){
            window.location.href='./index.html'  
        })
        $('.login_come .submits').click(function(){
              var data={
                 'username':$.trim($('#login_user').val()),
                 'password':$.trim($('#login_password').val())
              }
               var info = _this.validataInfo(data);
              
               if(info.status){
                // $('.login_in .err') .css({'visibility':'visible'}).text('恭喜您，登录成功')
                if(window.localStorage){
                    var storage  = window.localStorage;
                    storage.username=data.username;
                    storage.password=data.password;
               }
                $.ajax({
                    data:data,
                    method:    'post',
                    dataType:   'json',
                         url:    'local.login.do',
                    success:    function(res){
                     $('.login_in .err') .css({'visibility':'visible'}).text(res.data.msg) ;
                    
                     window.location.href='./index.html'  
                    },
                    error: function(err,type){
                        $('.login_in .err') .css({'visibility':'visible'}).text(type)   
                    },      
                })
               }else{
                   $('.login_in .err') .css({'visibility':'visible'}).text(info.msg)
               }
        })
    },
    validataInfo:function(data){
        var result={
            msg:'',
            status: false
        }
         if(data.username.length<6){
           result.msg='用户名输入有误'
           return result;
         }
         if(data.password.length<6){
             result.msg='密码输入有误'
             return result;
         }
        result.status=true;
        return result;
    }
}
$(function(){
    Mock.mock('local.login.do',{
        'data|1': [{
            'status|0-0':2,
            'msg|1':'服务端验证通过，登录成功',
            }]
       })
    login_page.init();
});