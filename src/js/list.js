//加载
require(['config'],function(){
	require(['jquery'],function($){
		let $goodslist = $('.goodslist');
		let pageNo = 1;
		let qty = 40;

		// 请求数据
		$.ajax({
			
			url:'../api/list.php',
			dataType:'json',
			data:{
				page:pageNo,
				qty:qty
			},
			success:function(res){
				console.log(res);
				showList(res);

				// 显示分页
				var pageQty = Math.ceil(res.total/res.qty);

				var page_str = '';
				for(var i=1;i<=pageQty;i++){
					page_str += `<li ${res.pageNo==i?'class="active"':''}><a href="#">${i}</a></li>`
				}

				$('.pagination').html(page_str);
			}
		});

		// 点击分页切换
		$('.pagination').on('click','a',function(){
			$(this).parent().addClass('active').siblings().removeClass();
			pageNo = $(this).text();

			$.ajax({
				url:'../api/list.php',
				dataType:'json',
				data:{
					page:pageNo,
					qty:qty
				},
				success:function(res){
					console.log(res);
					showList(res);
				}
			});

			return false;
		});


		function showList(res){
			console.log(res);
			let html = res.data.map(item=>{
				return `
					<div class="col-sm-4 col-md-2">
						<div class="thumbnail">
							<a href=""><img src="../${item.imgurl.replace('goods','')}" alt="..."></a>
							<div class="caption">
								<p class="pinpai">${item.pinpai}</p>
								<a href="#" class="goodsname">${item.goodsname}</a>
								<p class="price"><b>￥ ${item.price}</b></p>
								<div class="moreColor">
									<ul class="morePic">
										<li><a><img src="../${item.imgurl.replace('goods','')}" alt="..."></a></li>
										<li><a><img src="../${item.imgurl.replace('goods','')}" alt="..."></a></li>
										<li><a><img src="../${item.imgurl.replace('goods','')}" alt="..."></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				`
			}).join('');
			$goodslist.html(html);
		}
	});
});