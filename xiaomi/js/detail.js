var obj = {
    init: function(){
        this.onLoad();
        this.shijian();
    },
    onLoad: function(){
    },
    shijian: function(){
        var _this=this
        $('.banben span').click(function(){
            $(this).css({'border-color':'red'}).siblings().css({'border-color':'white'})
            
        })       
        $(window).scroll(function(){
            var Height1=tool.getOffsetHeight('hi');         
          var finallz =(Height1-($(window).height()))   
            if($(window).scrollTop()>153&&$(window).scrollTop()<(finallz)){
                $('.detail_right').css({'position':'fixed','right':'6em', 'top':'0em','width':'38%','left':''})
            }else if($(window).scrollTop()>(finallz)){
                $('.detail_right').css({'position':'absolute','right':'6em', 'top':'170em','width':'43%','left':'38em'}) 
            }
            else{
                $('.detail_right').css({'position':'relative','right':'4em','top':'0em','width':'43%','left':'0em'})
            }
        })
    },
    //实现右侧滑动，对应位置固定  
}
$(function(){
    obj.init();
});