// 当管理员选择logo图片时
$('#logo').on('change', function () {
	// 获取到管理员选择到的图片
	var file = this.files[0];
	// 创建formData对象 实现二进制文件上传吧
	var formData = new FormData();
	// 将管理员选择到的文件添加到formData对象中
	formData.append('logo', file);
	// 向服务器端发送请求 实现文件上传
	$.ajax({
		type: 'post',
		url: '/upload',
		data: formData,
		processData: false,
		contentType: false,
		success: function (response) {
			console.log(response)
			$('#hiddenLogo').val(response[0].logo)
			// 将logo图片显示在页面中
			$('#preview').attr('src', response[0].logo)
		}
	})
});

// 当网站设置表单发生提交行为时
$('#settingsForm').on('submit', function () {
	function serializeObj(form){
		var arr = form.serializeArray();
		var obj = {};
		arr.forEach((item) => {
			obj[item.name] = item.value;
		});
		return obj;
	}
	var obj = serializeObj($(this));
	// 对布尔值进行处理
	if(!obj.comment){
		obj.comment = false;
	};
	if(!obj.review){
		obj.review = false;
	};
	// 获取管理员在表单中输入的内容
	// var formData = $(this).serialize();
	// 向服务器端发送请求 实现网站设置数据添加功能
	$.ajax({
		type: 'post',
		url: '/settings',
		// data: formData,
		data:obj,
		success: function () {
			location.reload();
		}
	})
	// 阻止表单默认提交行为
	return false;
})
// 向服务器端发送请求 索要网站设置数据
$.ajax({
	type: 'get',
	url: '/settings',
	success: function (response) {
		// console.log(response)
		if (response) {
			// 将logo地址存储在隐藏域中
			$('#hiddenLogo').val(response.logo)
			// 将logo显示在页面中 
			$('#preview').attr('src', response.logo)
			// 将网站标题显示在页面中
            $('input[name="title"]').val(response.title);
            $('textarea[name="description"]').val(response.description);
            $('input[name="keywords"]').val(response.keywords);
			// 将是否开启评论功能显示在页面中
			$('input[name="comment"]').prop('checked', response.comment)
			// 将评论是否经过人工审核显示在页面中
			$('input[name="review"]').prop('checked', response.review)
		}
	}
})