//获取数据
$.ajax({
        type: 'get',
        url: '/users',
        success: function(res) {
            // console.log(res);
            var html = template('userTpl', { data: res })
                // console.log(html);
            $('#tbody').html(html)
        }
    })
    // 表单提交
$('#userForm').on('submit', function() {
    //jq提供方法，自动收集表单数据
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(res) {
            // console.log(res);
            location.reload() //刷新当前页面
        }
    })
    console.log(formData);
    //阻止默认行为
    return false;
})


// 图片上传预览

$('#modifyBox').on('change', '#avatar', function() {
    var fd = new FormData();
    fd.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        //将数据转换为对象，不对数据处理
        processData: false,
        //jq默认会添加一行代码 xhr.setRequestHeader('content-type',')
        contentType: false,
        data: fd,
        success: function(res) {
            console.log(res);
            //实现文件预览功能
            $('#preview').attr('src', res[0].avatar);
            $('#hiddenAvatar').val(res[0].avatar)
        }
    })
})

//用户信息编辑功能
$('#tbody').on('click', '.edit', function() {
        var id = $(this).attr('data-id');
        console.log(id);
        $.ajax({
            type: 'get',
            url: '/users/' + id,
            success: function(res) {
                console.log(res);
                var html = template('modifyTpl', res);
                // console.log(html);
                $('#modifyBox').html(html)
            }
        })
    })
    //用事件委托给修改表单添加事件，修改头像
$('#modifyBox').on('submit', '#modifyForm', function() {
    //自动收集表单数据
    console.log($(this).serialize());
    var id = $(this).attr('data-id');
    console.log(id);
    $.ajax({
            type: 'put',
            url: '/users/' + id,
            data: $(this).serialize(),
            success: function() {
                location.reload()
            }
        })
        //阻止默认行为
    return false;

})

//删除功能
$('#tbody').on('click', '.del', function() {
    if (confirm('您确定要删除吗？')) {
        //id值
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload()
            }
        })
    }
})

//批量删除功能实现
$('#checkAll').on('change', function() {
    var bool = $(this).prop('checked');
    console.log(bool);

    var checkList = $('#tbody input[type="checkbox"]');
    checkList.prop('checked', bool);
    if (bool == true) {
        $('#deleteAll').show()
    } else {
        $('#deleteAll').hide()

    }
    console.log(bool);

})

$('#tbody').on('change', 'input[type="checkbox"]', function() {
    //tbody中所有checkbox的数量等于打勾的数量，说明全选
    if ($('#tbody input[type="checkbox"]').length == $('#tbody input[type="checkbox"]:checked').length) {
        $('#checkAll').prop('checked', true)
    } else {
        $('#checkAll').prop('checked', false)
    }
    if ($('#tbody input[type="checkbox"]:checked').length > 0) {
        $('#deleteAll').show()
    } else {
        $('#deletaAll').hide();
    }
})

$('#deleteAll').on('click', function() {
    var checkList = $('#tbody input[type="checkbox"]:checked');
    var str = '';
    checkList.each(function(index, item) {
            str += $(item).attr('data-id') + '-'
        })
        //str用来收集所有的id,用-来拼接到一起
    str = str.substr(0, str.length - 1)
    $.ajax({
        type: 'delete',
        url: '/users/' + str,
        success: function() {
            location.reload();
        }
    })
})