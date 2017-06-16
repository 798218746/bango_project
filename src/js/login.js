require(['config'],function(){
	require(['jquery'],function($){
		//传递信息到后台
		$('.login_btn').on('click','img',function(){
			console.log(8888)
			$.ajax({
				url:'../api/login.php',
				data:{
					username:$('#username').val(),
					password:$('#username').val()
				},
				success:function(res){
					console.log(res);
					if(res==1){
						alert( '登录成功');
						location.href = '../index.html';
					}
					if(res==0){
						alert('用户不存在,请重新输入正确的用户名' );
					}
				},
//				error:function(){
//					alert('用户名或密码错误');
//				}
			});
			
		});
		
		
		let login_tab = document.querySelector('.login_tab');
		let login_title = login_tab.querySelector('.login_title').children;
		let login_content = login_tab.querySelector('.login_content').children;
		
//		console.log(username);
		var index = 0;

		// 高亮显示第一个login_tab
		// 隐藏除第一个以外的content
		for(var i=0;i<login_title.length;i++){
			login_content[i].style.display = 'none';

			if(i===index){
				login_title[i].classList.add('active');
				login_content[i].style.display = 'block';
			}

			// 绑定事件
			login_title[i].onclick = (function(idx){

				return function(){
					// 先去掉所有高亮，再添加当前高亮
					// 先隐藏所有content,再显示当前content
					for(var i=0;i<login_title.length;i++){
						login_content[i].style.display = 'none';
						login_title[i].classList.remove('active');
					}

					login_title[idx].classList.add('active');
					login_content[idx].style.display = 'block';
					
					
					var username = document.getElementById('username');
					var _username = username.value;
					
				}
			})(i);

		}
		
		
		
		
		
	});
})
