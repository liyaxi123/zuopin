var tool={
    //获取网址指定参数的value
    getParam: function(name){
        var href = window.location.href;
        //匹配所需名称的参数
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var result = window.location.search.substr(1).match(reg);
         if(result!=null){
             return result[2]
         }
         return ;
    },
    //动态生成模板函数hogan
    getTemplate: function(templateHtml,data){
     //第一步编译模板
     var compiledTemplated = Hogan.compile(templateHtml);
     //第二部渲染模板
     var result = compiledTemplated.render(data);
        return result;

    },
    //获取元素到body的距离
    getOffsetHeight:function(el){
        var el1 = document.getElementsByClassName(el)[0]
        var parent=el1.offsetParent;
        var curH=el1.offsetTop;
    
        while(parent!=null){
            curH+=parent.offsetTop;
            parent=parent.offsetParent
        }
      return curH;
    },
    //遮罩层函数
    zhezhao: function(className,addresst){
         var a =document.getElementsByClassName(className)[0];
         $(a).click(function(){
             $('.zhezhao').css('display','block');
             $('.zhezhao .queding').click(function(){
                 window.location.href='./'+addresst
             })
             $('.zhezhao .quxiao').click(function(){
                $(this).parents('.zhezhao').css('display','none');
            })
         })
    },
};