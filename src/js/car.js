require(['config'],function(){
	require(['jquery','common'],function(){
		
		
		
		//获取cookies
		// 获取cookie商品信息
		var goodslist = getCookie('goodslist');
		// 把json字符串转换成数组/对象
		// JSON.parse(json)
		goodslist = goodslist ? JSON.parse(goodslist) : [];
		console.log(goodslist);
		
		//写入页面
		var $mbshop_cart_1127_single_warp_goods = $('.mbshop_cart_1127_single_warp_goods');
		var $go_to_balance_left = $('.go_to_balance_left');
		
		$mbshop_cart_1127_single_warp_goods.html(goodslist.map(function(item){
			return `
				<ul list-tag="list" id="${item.guid}" name="" storeid="${item.guid}" class="mbshop_cart_1127_single_goods ">
					<!-- 选中按钮 -->
					<li class="mbshop_cart_1127_single_01">
						<p>
							<label class="mbshop_checkbox mbshop_cart_allSelect_list">
								<input type="checkbox" name="status" class="mbshop_cart_1127_single_goods_checkbox" checked="true">
							</label>
						</p>
					</li>
					<!-- 商品信息 -->
					<li class="mbshop_cart_1127_single_02">
						<dl>
							<dt>
								<a href="">
									<img src="../${item.imgurl}" alt="" style="display: block;">
								</a>
							</dt>
							<dd>
								<a href="">
									<p title="${item.name}">${item.name}</p>
								</a>
								<i>商品编号：${item.guid}</i>
								<div class="mbshop_cart_1127_b">
									<b><i class="iconfont"></i>满赠</b>
									<b><i class="iconfont"></i>包邮</b>
									<b class="icon_grey"><i class="iconfont"></i>不可用红包</b>
									<b class="icon_grey"><i class="iconfont"><img style="float:left" src=""></i>该商品支持14天退换货</b>
								</div>
							</dd>
						</dl>
					</li>
					<!-- 颜色尺码 -->
					<li class="mbshop_cart_1127_single_03">
						<p>颜色：</p>
						<p>尺码：()</p>
					</li>
					<!-- 单价 -->
					<li class="mbshop_cart_1127_single_04">
						<i>￥${item.price}</i>
						<em>￥${item.price}</em>
						<ul id="main_box">
							<li class="select_box">
								<div>修改优惠</div>
								<ul class="son_ul" style="display: none;">
									<li version="-1" value="不使用活动优惠" title="不使用活动优惠" class="mbshop_cart_1127_single_06_chose">
										<label class="mbshop_radio">
											<input value="-1" type="radio">
											<b>不使用活动优惠</b>
										</label> 
									</li>
								</ul>
							</li>
						</ul>
					</li> 
					<!-- 数量 -->
					<li class="mbshop_cart_1127_single_05">
						<span name="num-edit-cut" class="mbshop_cart_1127_single_label_left">-</span>
						<input type="text" value="${item.qty}" name="numEdit" class="mbshop_cart_1127_single_goods_num">
						<span name="num-edit-add" class="mbshop_cart_1127_single_label_right">+</span>
						<p></p>
					</li>
					<!-- 优惠 -->
					<!-- 成交价 -->
					<li class="mbshop_cart_1127_single_07">￥${(item.price*item.qty).toFixed(2)}</li>
					<!-- 状态 -->
					<!-- 操作 -->
					<li class="mbshop_cart_1127_single_09">
						<a href="javascript:void(0);" class="in_favorites" name="A06259">移入我的点赞</a>
						<a href="javascript:void(0);" class="delete_goods">删除</a>
					</li>
				</ul>			
			`;
		}));
		
		var subPrice = 0;
		var subQty = 0;
		goodslist.map(function(item){
			subPrice += (item.price*item.qty);
			subQty += item.qty;
			 
		});
		
		$go_to_balance_left.html(`
				<label class="mbshop_checkbox">
					<input name="checkAll" storetype checked="true" type="checkbox">
					<b>全选</b>
				</label>
				<p id="deleteCheckbox" class="go_to_balance_left_del">删除选中商品</p>
				<p id="cleanError" class="go_to_balance_left_clean">清除失效商品</p>
				<p class="go_to_balance_left_total">合计(不含运费)：<i class="heji">￥${subPrice.toFixed(2)}</i></p>
				<p class="go_to_balance_left_alg">商品总价<i class="totalP">￥${subPrice.toFixed(2)}</i> - 优惠<em class="youhuiPrice">￥${subPrice.toFixed(2)}</em></p>
				<p class="go_to_balance_left_have">已选商品<em class="selectedNum">${subQty}</em>件</p>
		`);
		
//		console.log(subPrice,subQty);
		getCookie('goodslist');
//		setCookie('goodslist',JSON.stringify(goodslist));
		
		
		//结算
		function jiesuan(){
		var totalPrice = 0;
		var totalNum = 0;
		var heji = 0;
		var youhuiPrice=0;
//		console.log(type(youhuiPrice));
		var $selectedNum = $('.selectedNum');
		var $heji = $('.heji');
		var $totalP = $('.totalP');
		var $youhuiPrice = $('.youhuiPrice');
//		console.log($youhiuPrice);
		//计算已购数量selectedNum
		for(var k = 0;k<goodslist.length;k++){
			totalPrice+=goodslist[k].qty*goodslist[k].price*1;
			console.log(goodslist[k].price,goodslist[k].qty)
			totalNum+=goodslist[k].qty;
			var $sumGoods = goodslist.qty;
//				console.log($selectedNum)
			youhuiPrice = (totalPrice*0.2).toFixed(2);
			heji = (totalPrice - youhuiPrice).toFixed(2);
			/*totalPrice = (totalPrice*1).toFixed(2);*/
		
		}
		console.log(youhuiPrice)
		$selectedNum.html(totalNum);
		$totalP.html(totalPrice.toFixed(2));
		$heji.html(heji);
		$youhuiPrice.html(youhuiPrice);
	
	
		}
		jiesuan()
	
	
	
		/*点击减少商品数量*/
		var $jian = $('.mbshop_cart_1127_single_label_left');
		var $qtyNum = $('.mbshop_cart_1127_single_goods_num');
		var $xiaoji = $('.mbshop_cart_1127_single_07');
		var $selectedNum = $('.selectedNum');
		console.log($xiaoji,$selectedNum);
		$jian.click(function(){
			
//			console.log(type(youhuiPrice) );
			var curClass = this.parentNode.parentNode.id;
			var txtNum = $(this).next();
//			console.log(txtNum);
			for(var i=0;i<goodslist.length;i++){
				if(curClass==goodslist[i].guid){
					console.log(goodslist[i].guid);
					goodslist[i].qty--;
					//获取cookies
					// 获取cookie商品信息
					
					setCookie('goodslist',JSON.stringify(goodslist));
					
					getCookie('goodslist');
//					location.reload();
					txtNum.val(goodslist[i].qty);

//					console.log($qtyNum);
					if(txtNum.val()<1){
						alert('商品数不能少于1');
						txtNum.val(1);
						goodslist[i].qty=1;
						
					}
					
					
				}
				jiesuan();
				
			}

			//小计
			var $xiaoji = $(this).parent().parent().find('.mbshop_cart_1127_single_07');
			
			console.log($xiaoji);
			for(var j= 0;j<goodslist.length;j++){
				if(curClass==goodslist[j].guid){
					//获取cookies
					// 获取cookie商品信息
					var $sum = (goodslist[j].price*goodslist[j].qty).toFixed(2);
					console.log($sum)
					setCookie('goodslist',JSON.stringify(goodslist));
					
					getCookie('goodslist');
					
					$xiaoji.html($sum);
				}
				if(txtNum.val()<1){
						alert('商品数不能少于1');
						txtNum.val(1);
						
					}
			}
			
		});
		
		
		
		/*----点击添加商品数量-----*/
		var $jia = $('.mbshop_cart_1127_single_label_right');
//		var $qtyNum = $('.mbshop_cart_1127_single_goods_num');
//		console.log($jia);
		$jia.click(function(){
			var totalPrice = 0;
			var totalNum = 0;
			var curClass = this.parentNode.parentNode.id;
			var txtNum = $(this).prev();
			var $xiaoji = $(this).parent().parent().find('.mbshop_cart_1127_single_07');
//			console.log(curClass)
			//更新数量
			for(var i=0;i<goodslist.length;i++){
				if(curClass==goodslist[i].guid){
					goodslist[i].qty++;
					goodslist[i].price;
					//刷新cookie
					// 获取cookie商品信息
					setCookie('goodslist',JSON.stringify(goodslist));
					getCookie('goodslist');
//					location.reload();
					txtNum.val(goodslist[i].qty);
//					console.log($qtyNum);
					if(txtNum.val()>100){
						alert('商品数不能大于100');
						txtNum.val(1);
						goodslist[i].qty=1;
					}
					
				}
				jiesuan()
				
			}
			//小计
			for(var j= 0;j<goodslist.length;j++){
				if(curClass==goodslist[j].guid){
					//获取cookies
					// 获取cookie商品信息
					var $sum = (goodslist[j].price*goodslist[j].qty).toFixed(2);
					console.log($sum)
					setCookie('goodslist',JSON.stringify(goodslist));
					getCookie('goodslist');
					$xiaoji.html($sum);
				}
				if(txtNum.val()>100){
					alert('商品数不能大于100');
					txtNum.val(1);
					goodslist[i].qty=1;
				}
			}

		});
		
		
		//删除单个商品
		var $delete_goods = $('.delete_goods');
		console.log($delete_goods);
		$delete_goods.click(function(){
			var curentUl = this.parentNode.parentNode;
			console.log(curentUl)
			var id = curentUl.getAttribute('id');
//			console.log(id);
			for(var i=0;i<goodslist.length;i++){
//				console.log(goodslist[i].guid);
				if(goodslist[i].guid === id){
					console.log(id,goodslist[i].guid )
					// 删除数组中对应的商品
					goodslist.splice(i,1);

					jiesuan();
					// 重新写入cookie
					setCookie('goodslist',JSON.stringify(goodslist));
					break;
				}
				
			}


			// 删除DOM节点
			// removeChild
			 curentUl.parentNode.removeChild(curentUl);
//			render();
		
		});
		
		
		
	});
	
});

