$(document).ready(function(){
    $.ajax({
        url : '../json/items.json',
        method : 'GET',
        datatype : 'json'
    }).done(function(data){
        pdt = data;

        finditem(pdt);
    });
    
    var codenumber = findcode('code');
    var itemcart, name, group, subgroup, price, discount, candy, code, cashback, src, deliverprice, total, ea, scrolltop, offsettop, coupon;
    var html = '';
    var txt = '';
    var sale = '';
    var couponsale = '';
    var c = 1;

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
    
    $(document).on('click', '.plus', function(){   
        plus();
    });

    $(document).on('click', '.minus', function(){
        minus();
    });

    $(document).on('keypress', '.count_number', function(){
        if(event.keyCode<48 || event.keyCode>57){
            event.returnValue=false;
        }
    }); // text에 한글 안써지게 하기

    // 키보드로 수량입력시 자동 합계금 정산
    // 10보다 작은 수량일 때 지우면 1이되도록
    
    $(document).on('keydown', '.count_number', function(e){
        var keycode = e.keyCode;
        setTimeout(function(){
            if(discount < price){
                total = $('.discountcheck').val();
            }else{
                total = $('.price').children('.content').html().split(' ')[0];
            }
            if(ea<10){
                if(keycode==8){
                    ea = 1;
                    $('.count_number').val(1);
                }
            }
            ea = Number($('.count_number').val());
            total = comma(total.replace(',', '')*ea);
            $('.final_price').children('.content').html(total + ' 원');
        })
    })

    // 배송 교환 환불 등 정보
    $(document).on('click', '.top', function(){
        c++;
        c = c%2;
        console.log(c);
        if(c==0){
            $('.top').addClass('inform_scroll_down');
            $('.top').addClass('borderround4');
            $('.bottom').addClass('displaynone')
        }else{
            $('.top').removeClass('inform_scroll_down');
            $('.top').removeClass('borderround4');
            $('.bottom').removeClass('displaynone')
        }
    });

    $(document).on('click','.header_bottom_left li', function(){
        var value = $(this).children('input').attr('value');
        window.location = 'itemgroup.html?group='+value;
    });
    
    // 로컬카트
    $(document).on('click', '.cartin', function(){
        var text = $(this).parent().siblings('.item_right_section').children('.code').children('.content').text();
        var loadcart, load_arr;
        var load = localStorage.getItem('localcart');
        console.log(load);

        if(load==null || load==undefined || load==''){
            loadcart =  text;
            // localStorage에 아무것도 없는 상태일 때, 불러오면 위의 3가지 경우중 하나더라. 그래서 아래의 조건만 있다면, 아무것도 없는 상태라 split이 작동될 수 없기 때문에, localStorage가 위의 조건처럼 비어있는 상태라면 text를 그냥 넣으라는 소리
        }else{
            load_arr = load.split(',')
            if(load_arr.indexOf(text)==-1){
                loadcart =  load + ',' + text;
            }else{
                alert('이미 담긴 상품입니다.')
                loadcart = load;
            }
        }
        localStorage.setItem('localcart', loadcart);

        // 담으면 담은 수치 반영해서 띄우기
        setTimeout(function(){
            var getitem = localStorage.getItem('localcart');
            console.log(getitem);
            console.log(getitem.lastIndexOf(' '));
            
            $('.cartcount').text(getitem.split(',').length);
        }, )
    });

    // 평상시에도 보이게
    setTimeout(function(){
        var getitem = localStorage.getItem('localcart');
        if(getitem == null || getitem == undefined || getitem == ''){
            $('.cartcount').text(0);
        }else{
            $('.cartcount').text(getitem.split(',').length);
        }
    },)

    $(document).on('click', '.cart', function(){
        window.location = 'cart.html';
    })
    

    // 함수 모음
    // code에 맞는 아이템정보 갖고오기
    function finditem(pdt){
        var itemcart = [];
        for(var i in pdt){
            if(pdt[i].code == codenumber){
                itemcart.push(pdt[i]);
            }
        }
        filliteminform(itemcart);
    };
    
    // 주소에서 code갖고오기
    function findcode(code){
        var findcode = window.location.search.slice(1).split('&')[0].split('=');
        if(findcode[0]==code){
            return findcode[1];
        }
    }

    function filliteminform(itemcart){
        for(var i in itemcart){
            txt = '';
            sale = '';
            couponsale = '';
    
            name = itemcart[i].name;
            group = itemcart[i].group;
            subgroup = itemcart[i].subgroup;
            price = itemcart[i].price;
            discount = itemcart[i].discount;
            deliverprice = itemcart[i].deliverprice;
            candy = itemcart[i].candy;
            code = itemcart[i].code;
            cashback = itemcart[i].cashback;
            src = itemcart[i].src;
            coupon = itemcart[i].coupon;

            if(discount < price){
                if(coupon){
                    couponsale = '<div class="couponsale"><div class="label">쿠폰적용가</div><div class="content">'+comma(discount)+' 원 ['+Math.round(((price-discount)/price)*100)+'%]</div><div class="getcoupon">쿠폰받기</div></div>'
                }else if(!coupon){
                    sale = '<div class="originsale"> → '+comma(discount)+' 원 ['+Math.round(((price-discount)/price)*100)+'%]</div>'

                } 
            }
            compare(price, discount)
            function compare(price, discount){
                if(discount < price){
                    return discount;
                }else{
                    return price;
                }
            };

            txt = '<div class="item"><div class="item_left_img"><img src="../img/items/'+src+'" alt="'+name+'"></div><div class="item_right"><div class="item_right_head"><div class="name">'+name+'</div><div class="group">'+group+' > '+subgroup+'</div></div><div class="item_right_section"><div class="price"><div class="label">판매가</div><div class="content">'+comma(price)+' 원</div>'+sale+'</div><input type="hidden" class="discountcheck" value="'+discount+'">'+couponsale+'<div class="delivery"><div class="label">배송비</div><div class="content">'+comma(deliverprice)+' 원</div><div class="deliveryinformbtn">배송비 안내</div></div><div class="candy"><div class="label">꿈캔디</div><div class="content">'+candy+'개</div></div><div class="code"><div class="label">상품코드</div><div class="content">'+code+'</div></div><div class="cashback"><div class="label">OK캐쉬백</div><div class="content">'+cashback+'% 적립</div></div></div><div class="order_count"><div class="label">주문수량</div><div class="count"><input type="button" class="minus" value="-"><input type="text" class="count_number" value="1"><input type="button" class="plus" value="+"></div></div><div class="final_price"><div class="label">총 합계금액</div><div class="content">'+comma(compare(price, discount))+' 원</div></div><div class="cart_buy"><input type="button" class="cartin" value="장바구니 담기"><input type="button" class="buy" value="바로 구매하기"><div class="love"></div><div class="share"></div></div></div></div>'
    
            html = html + txt;
        }
        $('.section1').html(html);
    }
    // 저거  total, ea 밖에서는 undefined 로 나오는데 이유를 모르겠음
    // console.log($('.section1').html());이것도 마찬가지 얘가 공란으로 떠서 안뜨는것같음
    // setTimeout(function(){
    //     setInterval(function(){
    //         console.log($('.count_number').val());
    //     }, 1000)
    // },100);
    // 해답 : 빈 html 파일에, 스크립트를 활용해 태그들을 채워넣고, 그 다음에 변하는 값을 찾는것이기 때문에, 스크립트로 태그가 생성된 후까지의 시간이 지나야 해당 값을 찾을 수 있다

    // 총합계
    function plus(){
        if(discount < price){
            total = $('.discountcheck').val();
        }else{
            total = $('.price').children('.content').html().split(' ')[0]; // 판매가격 
        }
        // 여기 계산식 할인값으로 바꾸기 15일날 하자
        ea = Number($('.count_number').val()); // 주문수량
        ea++
        total = comma(total.replace(',', '')*ea);
        $('.count_number').val(ea);
        $('.final_price').children('.content').html(total + ' 원');
        // 숫자부분은 따로 b태그로 해주면 위에 불필요하게 긴 부분을 지울 수 있다
        // ea를 곱해줄 때, ,가 껴있어서 얘가 곱하기를 못함. 그래서 ,를 지웠다가 곱한뒤에 다시 ,를 붙여줌
    }

    function minus(){
        if(discount < price){
            total = $('.discountcheck').val();
        }else{
            total = $('.price').children('.content').html().split(' ')[0];
        }
        ea = Number($('.count_number').val());
        ea--
        if(ea<1){
            ea=1;
        }
        total = comma(total.replace(',', '')*ea);
        $('.count_number').val(ea);
        $('.final_price').children('.content').html(total + ' 원');
    }

    // 콤마
    function comma(num){
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
});