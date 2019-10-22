$.ajax({
    type:'get',
    url:'/slides',
    success:function(res) {
        console.log(res);
        var html=template('slidesTpl',{data:res});
        // console.log(html);
        
        $('#swiper-wrapper').html(html)
        var swiper = new Swiper('.swiper-container', {
            loop: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination'
            },
          });    
    }
})