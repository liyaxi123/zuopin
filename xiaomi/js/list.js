var List = {
    init: function(){    
      this.onLoad();
      this.shijian();
    },
    shijian:function(){
        var _this=this
        $('.menu-search-button').click(function(){
            $('.menu-search-button').click(function(){
                var value = $('.menu-serach-content').val();
                if(value==''){
                    
                    return
                }else{ 
                    //1:创建模板
                    var html= '{{#list}}<li class="quick-item first">'+
                    '<span class="active-news">{{active}}</span>'+
                       '<a href="./detail.html">'+
                       '<img src="{{src}}">'+
                      '</a>'+
                      '<div class=" quick-detail">'+
                      '<p class="name">{{name}}</p>'+
                          '<p class="special">{{special}}</p>'+
                          '<p> <span class="new_price">{{price}}</span>元 </p>'+
                          '</div>'+
                   '</li>{{/list}}'
                   //向服务器请求数据
                   $.ajax({
                       url:'http://localhost/list.do',
                       data:value,
                       dataType:'json',
                       method:'post',
                       
                       success:function(res){
                         console.log(res.list)
                           //成功的话加载数据
                        var result= tool.getTemplate(html,res);
                          $('.thing_content_list').html(result);
                       },
                     error: function(err,textStatus){
                             alert(textStatus) 
                     }
                   })
                //   window.location.href='./list.html?key='+value;  
                }
        
            })
         });
    },
    onLoad: function(){
        $('.thing_content_list').html('<img src="./img/timg.gif" alt="加载中" />')
        //搜索框搜索事件
        if(!tool.getParam('key')){
          
            $('.keyname').text('手机');
            $('.menu-search-button').click()
        }else{
            $('.menu-serach-content').val(decodeURIComponent(tool.getParam('key')))
            $('.keyname').text(decodeURIComponent(tool.getParam('key')));   
        }
    },
};
$(function(){
    var act =['1折处理','2折处理','3折处理','4折处理','5折处理','6折处理','7折处理'];
    var specia=['它的速度是最快的','它的价格是最便宜的','他是最无聊的','他时最英俊的'];
    var src=['img/pms_1537356460.6227958220x220.png','img/pms_1537356460.6227958220x220.png','img/pms_1537356460.6227958220x220.png']
    var name=['电脑','手机','小米手机','最快的手机','最贵的手机']
    Mock.mock('http://localhost/list.do',{
    'list|6-25':[
        {
            'active|1':act,
            'price|66-99':2,
            'special|1': specia,
            'name|1':name,
             'id|+1': 2,
             'src|1': src,
        }
    ]
    });
    // {
    //     list:[
    //         {
    //             "id": 1,
    //             "active": '1折处理',
    //             'price': 66,
    //             'special': '它的速度是最快的',
    //             'src': 'img/pms_1537356460.6227958!220x220.png'
    //         }
    //     ]
    // }
  
    List.init();
    $('.menu-search-button').click()
      //动态文字实现
      $('.tips').animate({'left':'101%'},10000,function(){
        $(this).css({'display':'none'})
      })
   
})