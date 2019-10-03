$(document).ready(function(){
    var pdt, pdt2, value ,name ,group ,subgroup ,price ,discount ,deliverprice ,candy ,code ,cashback ,src ,coupon ,new2 ,sale ,deliveryevent;
    var txt = '';
    var html = '';
    var event_kind = event_kind('event_kind');
    // 1번제이슨
    var slideandevent_cart = [];
    var event_kind_cart = [];

    // 2번제이슨
    var value_cart;

    var event_item_cart0 = [];
    var event_item_cart1 = [];

    $.ajax({
        url : '../json/items.json',
        method : 'GET',
        dataType : 'json'
    }).done(function(data){
        pdt = data;
        
        for(var i in pdt){
            if(pdt[i].slideandevent){
                slideandevent_cart.push(pdt[i]);
            }
        }
        
        for(var i in slideandevent_cart){
            if(slideandevent_cart[i].slideandeventtype == event_kind){
                event_kind_cart.push(slideandevent_cart[i]);
            }
        }
    });
    $.ajax({
        url : '../json/slideandevent.json',
        method : 'GET',
        dataType : 'json'
    }).done(function(data){
        pdt2 = data;
        
        for(var i in pdt2){
            if(pdt2[i].type == event_kind){
                value_cart = pdt2[i].value.split(',')
            }
        }

        fill_title(value_cart)
    });

    $('.mainimgcontent').attr('src', '../img/eventdivide/'+event_kind+'.jpg');

    // 스크롤 헤더분리
    $(document).scroll(function(){
      scrolltop = $(window).scrollTop();
      offsettop = $('.mainimg').offset().top;
      
      if(scrolltop > offsettop){
        $('header').addClass('fixed');
        $('.header_top').addClass('height70');
        $('.logo').addClass('sizedown');
        $('.headerblank').addClass('positionrelative');
      }else{
        $('header').removeClass('fixed');
        $('.header_top').removeClass('height70');
        $('.logo').removeClass('sizedown');
        $('.headerblank').removeClass('positionrelative');
      }
    });

    // 클릭했을 때 이동
    $(document).on('click', '.item_img', function(){
        var itemcode = $(this).siblings('input').attr('value');
        window.location = 'iteminform.html?code='+itemcode;
    });

    setTimeout(function(){
        var getitem = localStorage.getItem('localcart');
        if(getitem == null || getitem == undefined || getitem == ''){
            $('.cartcount').text(0);
        }else{
            $('.cartcount').text(getitem.split(',').length);
        }
    },)

    // 함수모음
    // ajax를 통해 가져온 json pdt 분류해서 넣은 cart 불러오는 틈 주기
    setTimeout(function(){
        event_item_cart_divide(event_kind_cart, value_cart);
    }, 100)

    $(document).on('click', '.cart', function(){
        window.location = 'cart.html';
    })
        
    // title만 있는 배열을 통해 이벤트별로 변하는 title 생성
    function fill_title(value_cart){
        for(var i in value_cart){
            txt = '';
            txt = '<div class="title_'+i+'"><h1>'+value_cart[i]+'</h1><div class="title_'+i+'_content"></div></div>'
            
            html = html+txt;
        }
        $('.section1').html(html);
    };

    // 이벤트 종류의 모든 상품정보가 담긴 배열에서 event_divde와 title의 순번별 매칭을통해 각각의 배열에 정리
    function event_item_cart_divide(event_kind_cart, value_cart){
        for(var i in event_kind_cart){
            if(event_kind_cart[i].event_divide == value_cart[0]){
                event_item_cart0.push(event_kind_cart[i])
            }else if(event_kind_cart[i].event_divide == value_cart[1]){
                event_item_cart1.push(event_kind_cart[i])
            }
        }
    
        fill1(event_item_cart0);
        fill2(event_item_cart1);
    }

    // 순번별로 정리된 배열을 content를 자동생성하는 함수로 변수 이동, return으로 값만 받아온뒤 각각의 위치에 html 생성
    function fill1(event_item_cart0){
        $('.title_0_content').html((fillbox(event_item_cart0)));
    }
    function fill2(event_item_cart1){
        $('.title_1_content').html((fillbox(event_item_cart1)));
    }

    // event_kind 주소에서 뗘오기
    function event_kind(event_kind){
        var findeventkind = window.location.search.slice(1).split('&');
        for(var i in findeventkind){
            if(findeventkind[i].split('=')[0]==event_kind){
                return findeventkind[i].split('=')[1]
            }
        }
    }

    // 콤마
    function comma(num){
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };  
    
    // html 생성
    function fillbox(fill){
        html = '';
        for(var i in fill){
            txt = '';
            
            name = fill[i].name;
            group = fill[i].group;
            subgroup = fill[i].subgroup;
            price = fill[i].price;
            discount = fill[i].discount;
            deliverprice = fill[i].deliverprice;
            candy = fill[i].candy;
            code = fill[i].code;
            cashback = fill[i].cashback;
            src = fill[i].src;
            coupon = fill[i].coupon;
            new2 = fill[i].new;
            sale = fill[i].sale;
            deliveryevent = fill[i].deliveryevent;

            if(discount < price){
                percent = '<span class="saleprice">'+comma(discount)+'원 ['+Math.round(((price-discount)/price)*100)+'%]</span>'
                price = '';
            }else {
                percent = '원';
            }
    
            if(coupon){
                coupon = '<img src="../img/eventalert/coupon.png" alt="쿠폰">'
            }else {
                coupon = '';
            }
    
            if(sale){
                sale = '<img src="../img/eventalert/sale.png" alt="할인">'
            }else {
                sale = '';
            }
    
            if(deliveryevent){
                deliveryevent = '<img src="../img/eventalert/deliveryevent.png" alt="무료배송">'
            }else {
                deliveryevent = '';
            }
    
            if(new2){
                new2 = '<img src="../img/eventalert/new.png" alt="신상품">'
            }else {
                new2 = '';
            }

            txt = '<div class="item"><input type="hidden" value="'+code+'"><div class="item_img"><div class="graybox"><div class="heart"></div><div class="cart"></div><div class="opinion">0</div></div><img src="../img/items/'+src+'" alt="'+name+'"></div><div class="name overflow_dot">'+name+'</div><div class="price">'+comma(price)+percent+'</div><div class="tag">'+coupon+sale+new2+deliveryevent+'</div></div>'

            html = html + txt;
        }
        return html;
    }
})