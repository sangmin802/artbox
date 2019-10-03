$(document).ready(function(){
  var index, new_src, ori_src, scrolltop, offsettop, pdt, id, name, src, price, code, discount, coupon, sale, new2, deliveryevent;
  var html = '';
  var txt = '';
  var percent = '';

  
  $.ajax({
    url : 'https://raw.githubusercontent.com/sangmin802/artbox/master/json/items.json',
    type : 'GET',
    dataType : 'json'
  }).done(function(data){
    pdt = data;
    
    var bestpdt = [];
    var letterpdt = [];
    var friendpdt = [];
    var designfinderpdt = [];
    
    for(var i in pdt){
      if(pdt[i].best){
        bestpdt.push(pdt[i]);
      }
      
      if(pdt[i].letter_event){
        letterpdt.push(pdt[i]);
      }
      
      if(pdt[i].friend){
        friendpdt.push(pdt[i]);
      }
    };
    
    bestfill(bestpdt);
    letterfill(letterpdt);
    frienddivide(friendpdt);
    
    friend_change_fill(0);
  });
  
  
  // 상단 슬라이드
  var swiper = new Swiper('.main_slide', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    }, 
  });

  // 중단 디자인 파인더 슬라이드
  var swiper = new Swiper('.designfinder_wrap', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 7,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    }, 
  });
  
  // 하단 이벤트 슬라이드
  var swiper = new Swiper('.event_slide', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    }, 
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // 스크롤 헤더분리
  $(document).scroll(function(){
    scrolltop = $(window).scrollTop();
    offsettop = $('.main_slide').offset().top;
    
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

  // hover시 바뀌는 친구들
  $(document).on('mouseover', '.img_change', function(){
    index = $(this).index();
    new_src = bigger(index);
    ori_src = ['img/mali.jpg', 'img/iren.jpg', 'img/peter.jpg', 'img/otto.jpg',];
    
    for(var i in ori_src){
      $('.img_change').eq(i).children('img').attr('src', ori_src[i]);
    }
    $('.img_change').eq(index).children('img').attr('src', new_src);
  })

  $(document).on('mouseover', '.img_change', function(){
    index = $(this).index();
    html = '';
    friend_change_fill(index);
  });

  $(document).on('click', '.iteminform', function(){
    var itemcode = $(this).siblings('input').attr('value');
    window.location = 'iteminform.html?code='+itemcode;
  });

  $(document).on('click','.header_bottom_left li', function(){
    var group = $(this).children('input').attr('value');
    window.location = 'itemgroup.html?group='+group;
  });

  $(document).on('click', '.go_event_page', function(){
    var event_kind = $(this).children('input').attr('value');
    window.location = 'slideandevent.html?event_kind='+event_kind;
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
  // 함수모음-------------------------------
  // best item 
  function bestfill(bestpdt){
    for(var i in bestpdt){       
      

      id = bestpdt[i].id;
      name = bestpdt[i].name;
      price = bestpdt[i].price;
      discount = bestpdt[i].discount;
      src = bestpdt[i].src;
      coupon = bestpdt[i].coupon;
      sale = bestpdt[i].sale;
      code = bestpdt[i].code;
      deliveryevent = bestpdt[i].deliveryevent;
      new2 = bestpdt[i].new;

      if( discount < price ){
        percent = ' ['+Math.round(((price-discount)/price)*100)+'%]'
        price = discount;
      }else {
        percent = '';
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
      
      txt = '<div class="best_item"><input type="hidden" value="'+code+'"><div class="best_item_id_num">'+zero(id)+'</div><div class="best_item_img iteminform"><img src="../img/items/'+src+'" alt="'+name+'"></div><div class="best_item_name overflow_dot">'+name+'</div><div class="best_item_price overflow_dot">'+comma(price)+'원'+percent+'</div><div class="tag">'+coupon+sale+new2+deliveryevent+'</div></div>';

      html = html + txt;
    }
    $('.section2_item_wrap').html(html);
  };

  // letter item 
  function letterfill(letterpdt){
    html = '';
    for(var i in letterpdt){
      txt = '';

      name = letterpdt[i].name;
      price = letterpdt[i].price;
      src = letterpdt[i].src;
      code = letterpdt[i].code;

      txt = '<div class="letter_item"><input type="hidden" value="'+code+'"><div class="letter_item_img iteminform"><img src="img/items/'+src+'" alt="'+name+'"></div><div class="letter_item_name overflow_dot">'+name+'</div><div class="letter_item_price">'+comma(price)+'원</div></div>'

      html = html + txt;
    }
    $('.letter').html(html);
  };

  // friend친구들 호버시 큰이미지로 변경
  function bigger(value){
    switch(value){
      case 0 : {
        return 'img/mali_big.jpg';
      }break;
      case 1 : {
        return 'img/iren_big.jpg';
      }break;
      case 2 : {
        return 'img/peter_big.jpg';
      }break;
      case 3 : {
        return 'img/otto_big.jpg';
      }break;
    }
  }

  // friend친구별 상품분류
  var mali = [];
  var iren = [];
  var peter = [];
  var otto = [];
  function frienddivide(friendpdt){
    for(var i in friendpdt){
      switch(friendpdt[i].friend_type){
        case 'mali' : {
          mali.push(friendpdt[i]);
        }break;
        case 'iren' : {
          iren.push(friendpdt[i]);
        }break;
        case 'peter' : {
          peter.push(friendpdt[i]);
        }break;
        case 'otto' : {
          otto.push(friendpdt[i]);
        }break;
      }
    }
  }

  // friend친구별 바뀌는 상품 리스트(8개)
  function friend_change_fill(index){
    html = '';
    var friend_name;
    var friend_change_fill_pdt;
    switch(index){
      case 0 : {
        friend_name = mali;
      }break;
      case 1 : {
        friend_name = iren;
      }break;
      case 2 : {
        friend_name = peter;
      }break;
      case 3 : {
        friend_name = otto;
      }break;
    }
    friend_change_fill_pdt = friend_name;
    
    for(var i in friend_change_fill_pdt){
      src = friend_change_fill_pdt[i].src;
      name = friend_change_fill_pdt[i].name;
      code = friend_change_fill_pdt[i].code;

      txt = '<div class="friend_change_item"><input type="hidden" value="'+code+'"><img src="../img/items/'+src+'" alt="'+name+'" class="iteminform"></div>'

      html = html + txt;
    }
    $('.section6_friend_items').html(html);
  };

  // 10보다 작으면 0 붙이기
  function zero(value){
    if(value < 10){
      return '0'+value;
    }else{
      return value;
    }
  }

  // 콤마
  function comma(num){
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
});