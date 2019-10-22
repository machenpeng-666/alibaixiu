// 从地址栏中获取文章id
function getUrlParams(key){
    var url=location.search.substr(1);
    var keys=url.split('&');
    for(var i=0;i<keys.length;i++){
        var str=keys[i].split('=');
       if(str[0]==key){
           return str[1]
       }
    }
}
var id = getUrlParams('id');
// console.log(id);

$.ajax({
	type: 'get',
	url: '/posts/' + id,
	success: function (res) {
        console.log(res);
		var html = template('detailTpl', res);
		$('.article').html(html)
	}
})


//文章点赞功能
$('#article').on('click', '#like', function () {
	// 向服务器端发送请求 执行点赞操作
	$.ajax({
		type: 'post',
		url: '/posts/fabulous/' + id,
		success: function () {
			alert('点赞成功, 感谢您的支持')
		}
	})
})

//获取网站配置，提交评论功能
$.ajax({
	type:'get',
	url:'/settings',
	success:function(res) {
		console.log(res);
		//判断是否开启了评论功能
		if(res.comment) {
			var html=template('commentTpl')
			$('#comment').html(html)
		} 
	}
})

//实现评论功能2
