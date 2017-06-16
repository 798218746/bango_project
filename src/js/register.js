require(['config'],function(){
	require(['jquery'],function($){
//		console.log(222);
		//验证信息
		
		var username = $('#username');
		var telephone = $('#telephone');
		var password = $('#password');
		console.log(password);
		var $reg_sub = $('.reg_sub');
		var $tips = $('.tips');
		var $userTips = $('.userTips');
		var $phoneTips = $('.phoneTips');
		var $pwdTips = $('.pwdTips');
		console.log($tips);
		console.log($reg_sub);
		$reg_sub.on('click',function(e){
			
			//验证用户名
			var _username = username.val();
			//var reg = /^[\w\u2E80-\u9FFF]{4,20}$/;
			//console.log(_username);
				if(!/^[\w\u2E80-\u9FFF]{4,20}$/.test(_username)){
					$userTips.html('您输入的用户名不符合！请重新输入4-20个字符，一个汉字为两个字符。');
//					alert('用户名不正确')
					return false;
				}
			
			//验证手机号
			var _telephone = telephone.val();
			if(!/^1[3-57-9]\d{9}$/.test(_telephone)){
				$phoneTips.html('您输入的手机号不正确！请重新输入正确的手机号');
				return false;
			}
			//验证密码
			var _password = password.val();
			if(!/^\S{4,19}$/.test(_password)){
				$pwdTips.html('密码不合法,请输入4位以上的密码');
				return false;
			}
			console.log($('#username').val(),$('#telephone').val(),$('#password').val())
			//ajax请求后台数据
			$.ajax({
				url:'../api/register.php',
				dataType:"json",
				data:{
					username:$('#username').val(),
					telephone:$('#telephone').val(),
					password:$('#password').val()
				},
				success:function(res){
					console.log(res);
					if(res == 1){
						alert ('恭喜你，注册成功，前往登录！！！');
						location.href = '../index.html';
					};						
					if(res != 1){
						alert ('用户名已被注册');
					};
				}
			});
			return false;
		});
		
		
	});
	
});