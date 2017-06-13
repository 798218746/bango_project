require(['config'],function(){
	require(['jquery'],function($){
		// 传递用户信息到后台
		$('.regSub').on('click',function(){
			$.ajax({
				url:'../api/register.php',
				data:{
					username:$('#username').val(),
					telephone:$('#telephone').val()
				},
				success:function(res){
					console.log(res);
					if(res === 'ok'){
						alert('注册成功')
					}
				}
			});
		});
		
		var username = document.querySelector('#username');
		var telephone = document.querySelector('#telephone');
		var verify_text = document.querySelector('.verify_text').children;
		username.onfocus=function(){
			var _username = username.value;
			var reg = /^[\w\u2E80-\u9FFF]{4,20}$/;
			if(!reg){
				if(!reg.test(_username)){
					verify_text.innerText('用户名不合法');
					return false;
				}
			}
		};
		
		username.onblur = function(){
			verify_text.innerText = '请输入用户名';
		}
		
		telephone.onfocus=function(){
			var _telephone = telephone.value;
			if(!/^1[3-57-9]\d{9}$/.test(_telephone)){
				verify_text.innerText='手机号码不正确';
				return false;
			}
		};
		telephone.onblur=function(){
			verify_text.innerText = '请输入正确的手机号码';
		};
		
	});
	
});