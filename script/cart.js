$(document).ready(function(){
    var cartlist = [];
    // 평상시는 비어있는 장바구니
    fill(cartlist);

    var loadarr, pdt;
    $.ajax({
        url : '../json/items.json',
        method : 'GET',
        dataType : 'json'
    }).done(function(data){
        pdt = data;
        
        var load = localStorage.getItem('localcart')
        loadarr = load.split(',');

        for(var a in loadarr){
            for(var i in pdt){
                if(pdt[i].code == loadarr[a]){
                    cartlist.push(pdt[i]);
                }
            }
        }
        console.log(cartlist);
        fill(cartlist);
    })

    // 스크롤 헤더분리
    $(document).scroll(function(){
        scrolltop = $(window).scrollTop();
        offsettop = $('.section1').offset().top;
        
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

    $(document).on('click', '.item_img', function(){
        var itemcode = $(this).siblings('input').attr('value');
        window.location = 'iteminform.html?code='+itemcode;
    });
    
    $(document).on('click','.header_bottom_left li', function(){
        var group = $(this).children('input').attr('value');
        window.location = 'itemgroup.html?group='+group;
    });

    // 장바구니 일괄정리후, 비어있다는 태그 표시
    $(document).on('click', '.clear', function(){
        localStorage.clear();
        cartlist = [];
        fill(cartlist);

        setTimeout(function(){
            $('.cartcount').text(0);
        }, )
    });

    // 장바구니 낱개 지우기
    $(document).on('click', '.remove', function(){
        cartlist = [];
        var index = $(this).parent().index();
        loadarr.splice(index,1);

        localStorage.clear();
        localStorage.setItem('localcart', loadarr);

        for(var a in loadarr){
            for(var i in pdt){
                if(pdt[i].code == loadarr[a]){
                    cartlist.push(pdt[i]);
                }
            }
        }
        
        fill(cartlist);

        setTimeout(function(){
            var getitem = localStorage.getItem('localcart');
            if(getitem == null || getitem == undefined || getitem == ''){
                $('.cartcount').text(0);
            }else{
                $('.cartcount').text(getitem.split(',').length);
            }
        },)
    })

    setTimeout(function(){
        var getitem = localStorage.getItem('localcart');
        if(getitem == null || getitem == undefined || getitem == ''){
            $('.cartcount').text(0);
        }else{
            $('.cartcount').text(getitem.split(',').length);
        }
    },)

    var html = '';
    var txt = '';
    function fill(cartlist){
        html = '';
        if(cartlist.length == 0){
            $('.section1_wrap').html('<div class="none">장바구니가 비었습니다</div>');
        }else{
            for(var a in cartlist){
                txt = '';
                
                name = cartlist[a].name;
                group = cartlist[a].group;
                subgroup = cartlist[a].subgroup;
                price = cartlist[a].price;
                discount = cartlist[a].discount;
                deliverprice = cartlist[a].deliverprice;
                candy = cartlist[a].candy;
                code = cartlist[a].code;
                cashback = cartlist[a].cashback;
                src = cartlist[a].src;
                coupon = cartlist[a].coupon;
                new2 = cartlist[a].new;
                sale = cartlist[a].sale;
                deliveryevent = cartlist[a].deliveryevent;
    
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
    
                txt = '<div class="item"><input type="hidden" value="'+code+'"><div class="item_img"><div class="graybox"><div class="heart"></div><div class="cart"></div><div class="opinion">0</div></div><img src="../img/items/'+src+'" alt="'+name+'"></div><div class="name overflow_dot">'+name+'</div><div class="price">'+comma(price)+percent+'</div><div class="tag">'+coupon+sale+new2+deliveryevent+'</div><div class="remove">x</div></div>'
    
                html = html + txt;
            }
            $('.section1_wrap').html(html);
        }
    }
    
    // 콤마
    function comma(num){
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
})
