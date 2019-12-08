$('#logout').on('click', function () {
    // confirm('您真的要退出吗?');
    var isConfirm = confirm('您真的要退出吗?');
    if (isConfirm) {
      // alert('用户点击了确认按钮')
      $.ajax({
        type: 'post',
        url: '/logout',
        success: function () {
          location.href = 'login.html';
        },
        error: function () {
          alert('退出失败')
        }
      })
    }
  });
  // 处理日期时间格式
// function formateDate(date) {
// 	// 将日期时间字符串转换成日期对象
// 	date = new Date(date);
// 	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
// };
// var template = require('template');
template.defaults.imports.formateDate = function(date) {
	// 将日期时间字符串转换成日期对象
	date = new Date(date);
	return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
// 小西老师封装时间格式化开始
// template.defaults.imports.dateformat = function(d){
//   return d.slice(0,10);
// }
// 小西老师封装时间格式化结束

// 向服务器端发送请求 索要登录用户信息
$.ajax({
  type: 'get',
  url: '/users/' + userId,
  success: function (response) {
    // console.log(response);
    $('.avatar').attr('src', response.avatar)
    $('.profile .name').html(response.nickName)
  }
})