$.ajax({
    type: 'get',
    url: '/posts',
    success: function(res) {
        console.log(res);
        var html = template('postsTpl', res);
        // console.log(html);
        $('#postBox').html(html)
        var page = template('pageTpl', res)
        $('.pagination').html(page)
    }
})

function changePage(pageNum) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: pageNum
        },
        success: function(res) {
            var html = template('postsTpl', res);
            $('#postBox').html(html)
            var page = template('pageTpl', res);
            $('.pagination').html(page)
        }
    })
}

$.ajax({
    type:'get',
    url:'/categories',
    success:function(res) {
        console.log(res);
        
        var html=template('categoryTpl',{data:res});
        $('#categoryBox').html(html);
    }
})

$('#filterForm').on('submit',function() {
    var formData=$(this).serialize();
    console.log(formData);
    
    $.ajax({
        type:'get',
        url:'/posts',
        data:formData,
        success:function(res) {
            var html=template('postsTpl',res);
            $('#postBox').html(html)
            var page=template('pageTpl',res)
            $('.pagination').html(page);
            console.log(res);
            
        }
    })
    return false
})




















function dateFormat(date) {
    date = new Date(date);
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日';
}
// template.defaults.imports.dateFormat = dateFormat;