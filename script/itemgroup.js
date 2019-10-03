$(document).ready(function(){
    var groupcart = [];
    var grouparr;
    $.ajax({
        url : 'https://raw.githubusercontent.com/sangmin802/artbox/master/json/items.json',
        method : 'GET',
        dataType : 'json'
    }).done(function(data){
        var pdt = data

        for(var i in pdt){
            if(pdt[i].group==korgroup){
                groupcart.push(pdt[i]);
            }
        }
    })

    $.ajax({
        url : 'https://raw.githubusercontent.com/sangmin802/artbox/master/json/subgroup.json',
        method : 'GET',
        dataType : 'json'
    }).done(function(data){        
        var pdt = data

        for(var i in pdt){
            if(pdt[i].group==group){
                grouparr = pdt[i];
            }
        }
        
        fillsection(0);
        fillaside(grouparr);
    })
    
    var findarr, grouparrnocomma, index, name, group, subgroup, name, price, discount, deliverprice, candy, code, cashback, src, coupon, sale, new2, deliveryevent ;
    var html = '';
    var html2 = '';
    var txt = '';
    var group = findgroup('group');
    var korgroup = langchange(group);
    fillimg(korgroup, group);

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

    $(document).on('click', '.group_divide_li', function(){
        index = $(this).index();
        $('.group_divide_li').removeClass('colorbold');
        $(this).addClass('colorbold');
        fillsection(index);
    });
    
    $(document).on('click','.header_bottom_left li', function(){
        var group = $(this).children('input').attr('value');
        console.log(group);
        window.location = 'itemgroup.html?group='+group;
    });

    $(document).on('click', '.item_img', function(){
        var itemcode = $(this).siblings('input').attr('value');
        window.location = 'iteminform.html?code='+itemcode;
    });

    $(document).on('click', '.cart', function(){
        window.location = 'cart.html';
    })
    
    setTimeout(function(){
        var getitem = localStorage.getItem('localcart');
        if(getitem == null || getitem == undefined || getitem == ''){
            $('.cartcount').text(0);
        }else{
            $('.cartcount').text(getitem.split(',').length);
        }
    },)
    
    // 함수모음
    function findgroup(group){
        findarr = window.location.search.slice(1).split('&');
        for(var i in findarr){
            var dividearr = findarr[i].split('=');
            if(dividearr[0]=='group'){
                return dividearr[1];
            }
        }
    }

    function langchange(group){
        switch(group){
            case 'toy' : {
                return '인형/토이'
            }break;
            case 'suply' : {
                return '문구'
            }break;
            case 'passion' : {
                return '패션'
            }break;
            case 'bath' : {
                return '주방/욕실'
            }break;
            case 'living' : {
                return '리빙/데코'
            }break;
            case 'digital' : {
                return '디지털/가전'
            }break;
            case 'travel' : {
                return '여행'
            }break;
            case 'beauty' : {
                return '뷰티'
            }break;
        }
    }

    function fillimg(korgroup, group){
        $('.mainimg').children('.img').addClass(group+'bg')
        $('.mainimg').children('.img').children('p').text(korgroup)
    }
    
    function fillaside(grouparr){
        grouparrnocomma = grouparr.subgroup.split(',');
        
        for(var i in grouparrnocomma){
            txt = '<li class="group_divide_li group_divide_li_'+i+'">'+grouparrnocomma[i]+'</li>'
            
            html = html + txt;
        }
        $('.group_divide').html(html);
        $('.group_divide_li').eq(0).addClass('colorbold');
    };

    function fillsection(index){
        html2 = '';
        var finalcart = [];
        var grouparrsubgroup = grouparr.subgroup;
        grouparrsubgroup = grouparrsubgroup.split(',')
        // console.log(index);
        // console.log(grouparrsubgroup)
        if(index==0){
            finalcart = groupcart;
        }else{
            for(var i in groupcart){
                if(groupcart[i].subgroup==grouparrsubgroup[index]){
                    finalcart.push(groupcart[i]);
                }
            }
        }

        for(var a in finalcart){
            txt = '';
            
            name = finalcart[a].name;
            group = finalcart[a].group;
            subgroup = finalcart[a].subgroup;
            price = finalcart[a].price;
            discount = finalcart[a].discount;
            deliverprice = finalcart[a].deliverprice;
            candy = finalcart[a].candy;
            code = finalcart[a].code;
            cashback = finalcart[a].cashback;
            src = finalcart[a].src;
            coupon = finalcart[a].coupon;
            new2 = finalcart[a].new;
            sale = finalcart[a].sale;
            deliveryevent = finalcart[a].deliveryevent;

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

            html2 = html2 + txt;
        }
        $('.section_wrap').html(html2);
    };

    // 콤마
    function comma(num){
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
});