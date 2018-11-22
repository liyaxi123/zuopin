 //模擬接口
 Mock.mock('http://localhost/user/check_valid.do',{
    'data|1': [{
        'status|0-0':2,
        'msg|1':'验证通过可以使用',
        }]
   } 
   );
   Mock.mock('http://localhost/user/register_valid.do',{
       
         'status|0-0':2,
         'msg|1':'恭喜你注册成功'
         }
    )
 //注册界面逻辑实现
 $(function(){       
        $('input[id=r_user]').blur(function(){
            var username = $(this).val();
             if(!$(this).val()){
                 return;
             }else{
                 //异步验证用户名是佛可用
               $.ajax({
                   url:'http://localhost/user/check_valid.do',
                   data:{
                       type: 'username',
                       str:  username
                   },
                  
                   method:'post',
                   dataType: 'json',
                   success: function(res,message){
                      
                       if(res.data.status===0){
                        $('.error').css({'visibility':'visible'}).text(res.data.msg)   
                           return; 

                       }else if(res.status==1){
                        $('.error').css({'visibility':'visible'}).text(res.msg)
                       }
                   },
                   error: function(err,typse,rs){
                       console.log(typse)
                    $('.error').css({'visibility':'visible'}).text(err.textStatus)
                   }
               })
             }
        });
        $('.submits').click(function(){
            _submit();
        })
        function _submit(){
          
            var data = {
                 username: $.trim($('#r_user').val()),
                 password: $.trim($('#r_password').val()),
                 repassword: $.trim($('#r_rpassword').val()),
                 phone : $.trim($('#munber').val()),
                 email :  $.trim($('#r_email').val()),
                 question :  $.trim($('#r_question').val()),
                 answer : $.trim($('#r_answer').val()),
            }
           var info =  validate(data);
           
           if(info.status){
             //向服务器发送信息
             $.ajax({
                 url:'http://localhost/user/register_valid.do',
                 data: data,
                 dataType: 'json',
                 method:'post',
                success: function(res){
                    $('.error').css({'visibility':'visible'}).text(res.msg)
                    window.location.href='./index.html'
                },
                error: function(err,message){
                    $('.error').css({'visibility':'visible'}).text(message)
                }
             })
             }else{
               $('.error').css({'visibility':'visible'}).text(info.msg)
           }
        }
                //判断手机和email的方法
                function phoneEmail(data,type){
                    var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
                    var  emailE =/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if(data!=''){
                    if(type=='email'){
                        
                     if (!emailE.test(data)) {
                        
                         return false
                     } else{
                         return true
                      }
                    }else if(type == 'phone'){
                     if (!myreg.test(data)) {
                         
                          return false
                      } else{
                          return true
                       }
                    } 
                  }
                  return false
                  }
            function validate(m){
             var result={
               msg:'',
               status:false
             }
             if(m.username.length<6){
                result.msg='用户名不能少于六位';
                return result;
             }
             if(m.password.length==''||m.password.length<6){
                result.msg='密码不能少于六位';
                return result;
             }if(m.password!=m.repassword){
                result.msg='两次密码不一致';
                return result; 
             }
             if(!phoneEmail(m.phone,'phone')){
                result.msg='手机号格式不正确';
                return result;
             }if(!phoneEmail(m.email,'email')){
                result.msg='邮箱格式不正确';
                return result;
             
         }if(m.question.length==''){
             result.msg='问题不能为空'
             return result;
         }if(m.answer.length=''){
               result.msg='答案不能为空'
               return result;
         }
            result.status = true;
            result.msg = '注册信息输入正确'
            return result;
        }

    $('.go_login').click(function(){
        window.location.href='./index.html'
        }) 
      });
