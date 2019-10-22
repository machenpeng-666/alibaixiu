//获取轮播图数据
$.ajax({
    type:'get',
    url:'/slides',
    success:function(res) {
        console.log(res);
        var html=template('slidesTpl',{data:res})
        // console.log(html);
        
        $('#slidesBox').html(html)
        
    }
})

//上传文件
$('#file').on('change',function() {
    //
    // this.file[0];
    var fd=new FormData();
    fd.append('avatar',this.files[0]);
    $.ajax({
        type:'post',
        url:'/upload',
        data:fd,
        processData:false,
        contentType:false,
        success:function(res) {
            console.log(res);
           $('#hiddenImage').val(res[0].avatar) 
        }
    })
})
//轮播图表单提交
$('#slidesForm').on('submit',function() {
    //获取表单内容
    var FormData=$(this).serialize();
    $.ajax({
        type:'post',
        url:'/slides',
        data:FormData,
        success:function(res) {
            location.reload()
        }
    })
    return false
})

$('#slidesBox').on('click','.delete',function() {
    var id=$(this).attr('data-id');
    $.ajax({
        type:'delete',
        url:`/slides/${id}`,
        success:function() {
            location.reload()
        }
    })
})