    $('#logo').on('change',function() {
    var fd=new FormData();
    fd.append('logo',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:fd,
        processData:false,
        contentType:false,
        success:function(res) {
            console.log(res);
            console.log(res[0].logo);
            
            $('#hiddenImage').val(res[0].logo) 
            $('#preview').attr('src',res[0].logo)
        }
    })
})

//表单提交
$('#settingsForm').on('submit',function() {
    //获取表单中的数据
    var formData=$(this).serialize();
    console.log(formData);
    
    //获取请求
    $.ajax({
        type:'post',
        url:'/settings',
        data:formData,
        success:function(res) {
            // console.log(res);
            //页面刷新
            location.reload();
            
        }
    })
    return false;
})

// 实现网站设置数据的展示功能
// 请求数据
$.ajax({
    type:'get',
    url:'/settings',
    success:function(res) {
        console.log(res);
        
        //如果能请求到数据，就显示在页面中
        if(res) {
            $('#hiddenImage').val(res.logo)
            $('#preview').attr('src',res.logo)
            $('input[name="title"]').val(res.title)
            $('input[name="comment"]').prop('checked',res.comment)
            $('input[name="review"]').prop('checked', res.review);
        }
    }
});

