var firstPage = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        //轮播图实现方法
        this.img_begin('direct-right', 'direct-left', 'menu-photo-totol', 'menu-dot');
        //小米闪购  获取当前整点时间的函数
        this.getFullHour();
        // 距离活动结束时间
        this.duringTime();
        //左右箭头控制列表滑动和明暗，小米闪购
        this.left_right_controlImg();
        //智能模块 列表切换逻辑
        this.zhineng();
        //小轮播图逻辑
        this.xiaoLunBo();
        //点击登录遮罩层出现
        this.zhezhao();
        //localsorage判断登录状态
        this.login_status();
        //牌面翻转逻辑
        this.fanzhuan();
        //返回顶部
        this.goTop();
    },
    onLoad: function () {
        var _this = this;
        var t = null;
        //返回顶部处理
        $(window).scroll();
        //初次进入页面轮播图自动播放
        var timer = null;

        timer = setInterval(function () {
            $('.direct-right').click()
        }, 2000)

        $('.menu-side').hover(function () {
            if (timer) {
                clearInterval(timer)
            }
        }, function () {
            timer = setInterval(function () {
                $('.direct-right').click()
            }, 2000)
        });

        //下载app逻辑
        $('.nav-left').find('.app').hover(function () {

            $('.trangle').css({
                'display': 'block'
            });
            $('.erweima').css({
                'display': 'block'
            })

        }, function () {
            $('.trangle').css({
                'display': 'none'
            });
            $('.erweima').css({
                'display': 'none'
            })
        });
        //购物车模块显示逻辑
        $('.nav-right').children('.shopcar').hover(function () {
            $this = $(this);
            $this.find('a,span').css({
                'color': 'red'
            })
            $this.css({
                'background-color': 'white',
                'color': 'red'
            })
            var $divs = $('<div class="shop_thing">空空如也~</div>');
            $divs.prependTo($this);
        }, function () {
            $this.find('a,span').css({
                'color': '#999'
            });
            $this.css({
                'background-color': 'black',
                'color': '#bbb'
            });
            $('.shop_thing').remove()
        });
        //搜索框搜索
        $('.menu-search-button').click(function () {
            var value = $('.menu-serach-content').val();
            if (value == '') {
                return
            } else {
                window.location.href = './list.html?key=' + value;
            }
        });
        $('.menu-serach-content').val(tool.getParam('key'))
        //侧栏电话显示
        $('.woqu').hover(function () {
            $('.people_phone').css({
                'display': 'block'
            })
        }, function () {
            $('.people_phone').css({
                'display': 'none'
            })
        })
        // hogen动态生成列表
        var data = {
            list: [{
                'img': 'img/3G.png',
                'dec': '小米路由',
                'price': 99
            },
            {
                'img': 'img/3G.png',
                'dec': '小米路由1',
                'price': 98
            },
            {
                'img': 'img/3G.png',
                'dec': '小米路由2',
                'price': 97
            },
            {
                'img': 'img/3G.png',
                'dec': '小米路由3',
                'price': 96
            },
            {
                'img': 'img/3G.png',
                'dec': '小米路由4',
                'price': 95
            },
            {
                'img': 'img/3G.png',
                'dec': '小米路由5',
                'price': 94
            },
            ]
        }
        //定义模板
        var hml = '<ul>{{#list}}<li><a href="#"><img src="{{img}}" alt="图片"></a><p>{{dec}}</p><p class="price">{{price}}元</p></li>{{/list}}</ul>'
        //渲染模板
        var template = Hogan.compile(hml)
        //渲染数据
        var result = template.render(data)
        //菜单显示逻辑处理
        $('.menu-middle span').hover(function () {
            var $this = $(this)
            $this.append('<div class="menu-middle-content"></div>')
            if (!$('.menu-middle-content').is(':animated')) {
                $('.menu-middle-content')
                    .stop(true)
                    .animate({
                        'height': '300px'
                    }, 1000, function () {
                        $('.menu-middle-content').css({
                            'box-shadow': '1px 0px 2px grey'
                        })
                    }).html(result);
            }
        }, function () {
            $('.menu-middle-content').remove();
            //左侧菜单实现逻辑
            $('.menu-side .menu-parent .meun-item').hover(function () {
                var $this = $(this);
                $this.children('.menu-item-child').css({
                    'display': 'block'
                })
            }, function () {
                var $this = $(this);
                $this.children('.menu-item-child').css({
                    'display': 'none'
                })
            })
        })
        //文字滚动特效
        t = setInterval(function () {
            var s = $('.text-s').scrollTop();
            $('.text-s').scrollTop(s + 1);
            if ($('.text-s').scrollTop() == 560) {
                $('.text-s').scrollTop(0)
            }
        }, 20)
        $('.quick-item.text-s').mouseover(function () {
            clearInterval(t)
        }
        )
        $('.quick-item.text-s').mouseout(function () {
            t = setInterval(function () {
                var s = $('.text-s').scrollTop();
                $('.text-s').scrollTop(s + 1);
                if ($('.text-s').scrollTop() == 560) {
                    $('.text-s').scrollTop(0)
                }
            }, 20)
        })
    },
    img_begin: function (el1, el2, el3, el4) {
        var index = 1;
        var $img_right = $(document.getElementsByClassName(el1)[0]);
        var $img_left = $(document.getElementsByClassName(el2)[0]);
        var $parent = $(document.getElementsByClassName(el3)[0]);
        var $dot = $(document.getElementsByClassName(el4)[0]);
        var num = $parent.children().length - 1;
        var width = $parent.children().eq(1).width();
        $img_right.click(function () {
            if (index == num) {
                index = 0;
            }
            //当前没有动画时
            if (!$parent.is(':animated')) {
                ++index
                $dot.children().eq(index - 1).addClass('white').siblings().removeClass('white')
                $parent.animate({
                    'left': '-=' + width
                }, 1000, function () {
                    var lef = parseInt($parent.css('left'));
                    if (lef === -width * num) {
                        $parent.css({
                            'left': '0'
                        })
                    }
                })

            }
        });
        $img_left.click(function () {
            var lef = parseInt($parent.css('left'));
            if (!$parent.is(':animated')) {
                if (lef == 0) {
                    index = 5
                    $parent.css({
                        'left': -width * num
                    })
                    $parent.animate({
                        'left': '+=' + width
                    }, 1000)
                } else {
                    --index
                    $parent.animate({
                        'left': '+=' + width
                    }, 1000)
                }
                $dot.children().eq(index - 1).addClass('white').siblings().removeClass('white')
            }
        });
        $dot.children().click(function () {
            $this = $(this);
            $this.addClass('white').siblings().removeClass('white')
            $index = $this.index();

            $parent.css({
                'left': -$index * width + 'px'
            })
        });
    },
    getFullHour: function () {
        var _this = this
        var mydate = new Date();
        var h = this.addZero(mydate.getHours());
        var m = mydate.getMinutes();
        var s = this.addZero(mydate.getSeconds());
        if (m > 0) {
            ++h;
            if (h == 24) {
                h = 0;
            }
        }
        var t = setTimeout(function () {
            _this.getFullHour()
        }, 60000);
        $('.time-start').find('.time').text(h + ':00');
    },
    addZero: function (i) {
        if (i < 10) {
            i = '0' + i;
        }
        return i
    },
    duringTime: function () {
        var _this = this
        var ltime = new Date();
        var h = ltime.getHours();
        var m = ltime.getMinutes();
        var s = ltime.getSeconds();
        var ftime = $('.time-start').find('.time').text();
        var time_new = 3600
        var shengyu = time_new - (m * 60) - s;
        var m_new = this.addZero(parseInt(shengyu / 60))
        var s_new = this.addZero(shengyu - m_new * 60)
        $('.time-end .hour').text('00');
        $('.time-end .minute').text(m_new);
        $('.time-end .second').text(s_new);
        var mer = setTimeout(function () {
            _this.duringTime()
        }, 1000)
    },
    left_right_controlImg: function () {
        var index = 1;
        var num = Math.floor($('.quickshop-content .baoguo li').length / 4);
        console.log(num)
        var wid = $('.quickshop-content .baoguo').width();
        $('.quick-control .pre-quick').click(function () {
            if (index == 1) {

                return;
            } else if (index == 2) {
                $('.quick-control .pre-quick').css({
                    'color': '#00000033'
                })
                $('.quickshop-content .baoguo .quick-parent').animate({
                    'left': "+=" + wid + 'px'
                }, function () {
                    --index
                })
            } else {
                $('.quickshop-content .baoguo .quick-parent').animate({
                    'left': "+=" + wid + 'px'
                }, function () {
                    --index
                    $('.quick-control .next-quick').css({
                        'color': 'black'
                    })

                })

            }


        });
        $('.quick-control .next-quick').click(function () {

            if (index > num) {

                return;
            } else if (index == num) {

                $('.quick-control .next-quick').css({
                    'color': '#00000033'
                })
                $('.quickshop-content .baoguo .quick-parent').animate({
                    'left': "-=" + wid + 'px'
                }, function () {
                    ++index

                })
            } else {
                $('.quick-control .pre-quick').css({
                    'color': 'black'
                })
                $('.quickshop-content .baoguo .quick-parent').animate({
                    'left': "-=" + wid + 'px'
                }, function () {
                    ++index

                })
            }
        })
    },
    zhineng: function () {
        $('.quickshop.smart').find('.quick-control>span').click(function () {
            var $index = $(this).index();
            var $obj = $('.quickshop.smart .quickshop-content>ul:eq(' + $index + ')');
            if ($obj.hasClass('smart-active')) {
                return;
            } else {
                $obj.addClass('smart-active').siblings().removeClass('smart-active')
            }
        })
    },
    xiaoLunBo: function () {
        $('.quick-parent.content-x .quick-item').hover(function () {
            var $this = $(this);
            $(this).children('.left').css({
                'display': 'block'
            })
            $(this).children('.right').css({
                'display': 'block'
            })
        }, function () {
            $(this).children('.right').css({
                'display': 'none'
            })
            $(this).children('.left').css({
                'display': 'none'
            })
        })
        var index = 1;
        $('.quick-item .right').click(function () {
            var lef = parseInt($('.biaoji').css('left'));
            if (lef === -288) {
                return;
            }
            if (!$('.biaoji').is(':animated')) {
                ++index
                $('.quick-item .dot :nth-child(' + index + ')').addClass('white').siblings().removeClass('white')
                $('.biaoji').animate({
                    'left': '-=288px'
                }, 1000)
            }
        })
        $('.quick-item .left').click(function () {
            var lef = parseInt($('.biaoji').css('left'));
            if (!$('.biaoji').is(':animated')) {
                if (lef == 0) {
                    return;
                } else {
                    --index
                    $('.biaoji').animate({
                        'left': '+=288px'
                    }, 1000)
                    $('.quick-item .dot :nth-child(' + index + ')').addClass('white').siblings().removeClass('white')
                }
            }
        });
    },
    zhezhao: function () {
        $('.nav-item.login').click(function () {
            $('.zhezhao').css({
                'display': 'block'
            });
        })
        $('.zhezhao').click(function (e) {
            if (e.target.className != 'zhezhao') {
                return;
            } else {
                $('.zhezhao').css({
                    'display': 'none'
                });
            }
        })
    },
    login_status: function () {
        var username = localStorage.getItem('username');
        if (username) {

            $('.login .one').css({ 'display': 'none' });
            $('.login .two').css({ 'display': 'inline-block' })
            $('.login .two .username').text(username)
        }
    },
    fanzhuan: function () {
        $(".img-box").hover(function () { //鼠标移动的function
            $(this).css("transform", "rotateY(180deg)"); //鼠标移上去旋转180度

            $(".font").css("display", "block"); //让back显示出来
            $(".back").hide(); //隐藏front
        }, function () {
            $(this).css("transform", "rotateY(0deg)"); //鼠标移开让旋转度数归零

            $(".back").css("display", "block");
            $(".font").hide();
        });

    },
    goTop: function () {
        $(window).scroll(function () {
            var ch = $(window).scrollTop(); //滚动高度

            if (ch > 0) {
                $('.gotop').css({
                    'display': 'block'
                })
            } else {
                $('.gotop').css({
                    'display': 'none'
                })
            }
        });
        $('.gotop').click(function () {
            $(window).scrollTop(0);
        })
    }
}
$(function () {
    firstPage.init();
})






