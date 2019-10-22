//获取文章数量
$.ajax({
    type:'get',
    url:'/posts/count',
    success:function(res) {
        console.log(res);
        $('#postsBox').html(`<strong>${res.postCount}</strong>篇文章（<strong>${res.draftCount}</strong>篇草稿）`)
    }
})