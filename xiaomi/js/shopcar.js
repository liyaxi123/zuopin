var obj = {
    init: function () {
        this.onLoad();
    },
    onLoad: function () {
        var _this = this;
        var thing_price = $('tbody .tong_three')  //单价
        var things_price = $('tbody .tong_five') //小计
        var count = $('tbody .tong_four input')//数量
        var finall_jian = $('.total_jian')   //共多少件
        var finall_chose = $('.total_chose') //共选择多少件
        var heji = $('.total_price') //共多少钱
        tool.zhezhao('chuqian', 'index.html');
        //页面加载进来内容是全选状态,并计算所有数据
        $('body').find('input').prop('checked', true)
        var $tr = $('tbody').children('tr');
        var danjia_he = 0, shuliang_he = 0, shuliang, danjia, xiaoji_he = 0, zongji;
        for (var i = 0; i < $tr.length; i++) {
            danjia = parseInt($tr.eq(i).find('.tong_three').text());
            danjia_he += danjia;

            shuliang = parseInt($tr.eq(i).find('.tong_four input').val())
            shuliang_he += shuliang;
            xiaoji = danjia * shuliang;
            xiaoji_he += xiaoji;
        }
        $('.total_jian').text(shuliang_he);
        $('.total_chose').text(shuliang_he);
        $('.total_price').text(xiaoji_he)
        //点击事件 单选框处理   
        $(document).on('click', 'tbody :checkbox', function () {
            $tr = $('tbody').children('tr');

            var inpus = $('tbody :checkbox');
            shuliang_he = 0; xiaoji_he = 0;
            for (var i = 0; i < $tr.length; i++) {
                danjia = parseInt($tr.eq(i).find('.tong_three').text());
                danjia_he += danjia;
                shuliang = parseInt($tr.eq(i).find('.tong_four input').val())

                xiaoji = danjia * shuliang;
                if (!xiaoji) {
                    xiaoji = 0
                }

                $tr.eq(i).find('.tong_five').text(xiaoji)
                if ($tr.eq(i).find('.tong_one input').is(':checked')) {
                    console.log(123)
                    shuliang_he += shuliang;
                    xiaoji_he += xiaoji;

                }
            }
            $('.total_jian').text(shuliang_he);
            $('.total_chose').text(shuliang_he);
            $('.total_price').text(xiaoji_he)
            //实现单选与多选的级联
            if (_this.panduan(inpus)) {
                $('thead input').prop('checked', true)
            } else {
                $('thead input').prop('checked', false)
            }
        })
        //全选框的的点击事件
        $('thead input').click(function () {
            shuliang_he = 0; xiaoji_he = 0;
            if (!$(this).is(':checked')) {

                $('table :checkbox').prop('checked', false)
                $('.total_jian').text(0);
                $('.total_chose').text(0);
                $('.total_price').text(0)
            }
            else {
                $('.xuan').prop('checked', true);
                for (var i = 0; i < $tr.length; i++) {
                    danjia = parseInt($tr.eq(i).find('.tong_three').text());
                    danjia_he += danjia;
                    shuliang = parseInt($tr.eq(i).find('.tong_four input').val())
                    shuliang_he += shuliang;
                    xiaoji = danjia * shuliang;
                    xiaoji_he += xiaoji;
                }
                $('.total_jian').text(shuliang_he);
                $('.total_chose').text(shuliang_he);
                $('.total_price').text(xiaoji_he)
            }
        })
        //动态文字
        $('.tips').animate({ 'left': '101%' }, 10000, function () {
            $(this).css({ 'display': 'none' })
        })
        //数量加减的事件
        $('.xiao').click(function () {
            var $jian = $(this).next()
            if (parseInt($jian.val()) > 0) {
                $jian.val(parseInt($jian.val()) - 1)
                $(this).parents('tr').find('.xuan').prop('checked', false)
                $(this).parents('tr').find('.xuan').click();
            } else {
                return
            }
        })
        //加
        $('.add').click(function () {
            $jia = $(this).prev();
            $jia.val(parseInt($jia.val()) + 1)
            $(this).parents('tr').find('.xuan').prop('checked', false)
            $(this).parents('tr').find('.xuan').click();
        })
        //移除物品功能
        $(document).on('click', '.tong_six.six', function () {
            var $tr = $(this).parents('tr')
            if ($($tr).find('.xuan').prop('checked')) {
                var shuling = parseInt($tr.find('.tong_four input').val());
                var xiaoji = parseInt($tr.find('.tong_five').text())
                finall_jian.text(parseInt(finall_jian.text()) - shuliang);
                finall_chose.text(parseInt(finall_chose.text()) - shuliang);
                heji.text(parseInt(heji.text()) - xiaoji);
            }
            $tr.remove()
            var inpus = $('tbody :checkbox');
            if ($('tbody tr').length == 0) {
                $('thead input').prop('checked', false)
            }
            if (_this.panduan(inpus)) {
                $('thead input').prop('checked', true)
            } else {
                $('thead input').prop('checked', false)
            }
        })
        //添加优惠
        $(document).on('click', '.youhui .add', function () {
            $name = $('.youhui .add_name').text();
            $price = parseInt($('.youhui .add_price').text())
            console.log($price)
            $shuliang = parseInt($('.youhui .add_shuliang').text())
            $xiaoji = parseInt($('.youhui .add_xiaoji').text())
            finall_jian.text(parseInt(finall_jian.text()) + $shuliang);
            finall_chose.text(parseInt(finall_chose.text()) + $shuliang);
            heji.text(parseInt(heji.text()) + $price);
            var htl = '<tr class="xin">' +
                '<td class="tong_one"><input type="checkbox" class="xuan"/></td>' +
                '<td><a hrf="#"><img src="img/pms_1494830677.5991301!80x80.jpg" alt="图片描述"/></td>' +
                '<td class="tong_two">' + $name + '</td>' +
                '<td class="tong_three">' + $price + '</td>>' +
                //  '<td class="tong_four">'+ $shuliang + '</td>'+
                '<td class="tong_four"><input type="text" readonly="readonly" value="' + $shuliang + '"/></td>' +
                '<td class="tong_five">' + $xiaoji + '</td>' +
                '<td class="shanchu tong_six"><span>x</span></td>' +
                '</tr>'
            $('tbody').append(htl)
            $(this).parents('.youhui').remove();
            $('tbody :checkbox').prop('checked', 'true')
        })
        //删除优惠
        $(document).on('click', '.tong_six.shanchu', function () {

            $name = $('.xin .tong_two').text();
            $price = parseInt($('.xin .tong_three').text())

            $shuliang = parseInt($('.xin .tong_four input').val())
            $xiaoji = parseInt($('.xin .tong_five').text())
            var htl = '<div class="youhui">' +
                '<span class="add">+</span>' +
                '<a hrf=""><img src="img/pms_1494830677.5991301!80x80.jpg"/ alt="图片描述"></a>' +
                '<span class="add_name">' + $name + '</span>' +
                '<span class="add_price">' + $price + '</span>' +
                '<span class="add_shuliang">' + $shuliang + '</span>' +
                '<span class="add_xiaoji">' + $xiaoji + '</span>' +
                '</div>'
            $('p').after(htl)
            if ($(this).parents('tr').find('.xuan').prop('checked')) {
                finall_jian.text(parseInt(finall_jian.text()) - $shuliang);
                finall_chose.text(parseInt(finall_chose.text()) - $shuliang);
                heji.text(parseInt(heji.text()) - $price);
            }
            $('.xin').remove()
            var inpus = $('tbody :checkbox');
            if (_this.panduan(inpus)) {

                $('thead input').prop('checked', true)
            } else {
                $('thead input').prop('checked', false)
            }
        })
        //input输入
        $('.tong_four input').keyup(function () {

            var re = /^(0*?[1-9][0-9]*)/;
            shuliang_he = 0; xiaoji_he = 0;
            for (var i = 0; i < $tr.length; i++) {
                danjia = parseInt($tr.eq(i).find('.tong_three').text());
                // danjia_he +=danjia;
                shuliang = parseInt($tr.eq(i).find('.tong_four input').val())
                if (!re.test(shuliang)) {
                    return
                }
                if (!shuliang) {
                    xiaoji = 0;
                    shuliang = 0
                }
                xiaoji = danjia * shuliang;
                $tr.eq(i).find('.tong_five').text(xiaoji)
                if ($tr.eq(i).find('.tong_one input').is(':checked')) {
                    shuliang_he += shuliang;
                    xiaoji_he += xiaoji;
                }
                $('.total_jian').text(shuliang_he);
                $('.total_chose').text(shuliang_he);
                $('.total_price').text(xiaoji_he)
            }
        })
    },

    //单选框是否完全选中
    panduan: function (el) {
        var a = false;
        for (var i = 0; i < el.length; i++) {

            if ((el.eq(i).prop('checked'))) {
                ;
            }
            else {
                return false
            }
        }
        return true
    }
}
$(function () {
    obj.init()
});