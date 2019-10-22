// //获取地址栏id值
function getUrlParams(key) {
    
    var str=location.search.substr(1).split('&');

    console.log(str);
   for(var i=0;i<str.length;i++) {
       var arr=str[i].split('=');
       if(arr[0]==key) {
           return arr[1]
       }
   }
   
}
var categoryId=getUrlParams('categoryId');
console.log(categoryId);



var key=getUrlParams('key')
console.log(key);

$.ajax({
    type:'get',
    url:`/posts/search/${key}`,
    success:function(res) {
        console.log(res);
        var html=template('listTpl',{data:res})
        // console.log(html);
        
        $('#listBox').html(html)
        $('.new h3').text(res[0].category.title)
    }
})
