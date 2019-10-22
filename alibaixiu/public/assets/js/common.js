$('#logout').on('click', function() {
    var bool = confirm('你确定要退出吗')
    if (bool) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.href = 'login.html';
            }
        })
    }
})


//发送请求，获取用户登录信息
$.ajax({
    type:'get',
    url:`/users/${userId}`,
    success:function(res) {
        console.log(res);
        $('.profile .name').text(res.nickName)
        $('.profile img.avatar').attr('src', res.avatar)
        $('#profile').css('visibility', 'visible')
    }
})

