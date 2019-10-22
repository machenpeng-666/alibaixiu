$.ajax({
    type:'get',
    url:'/posts/recommend',
    success:function(res) {
        console.log(res);
        var tpl=`
        {{each data}}
        <li>
        <a href="javascript:;">
          <img src="{{$value.thumbnail}}" alt="">
          <span>{{$value.title}}</span>
        </a>
      </li>
      {{/each}}
      `
      var html=template.render(tpl,{data:res});
      $('.hots ul').html(html)
    }
})