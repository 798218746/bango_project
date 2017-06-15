//加载
require(['config'],function(){
	require(['jquery','gdszoom','common'],function($,gdsz,com){
		let $zoom_l_bigPicArea = $('.zoom_l_bigPicArea');
		let $zoom_l_smallPicList = $('.zoom_l_smallPicList');
		let $mbshop_detail_pdbrand = $('.mbshop_detail_pdbrand');
		let $mbshop_detail_goods_title = $('.mbshop_detail_goods_title');
		let $mbshop_detail_price = $('.mbshop_detail_price');
		let $clipbox = $('.clipbox');
		let $colorSelected = $('#colorSelected');
		let $color = $('.color');
		let $goods_num = $('.goods_num');
		let $zoom_l_smallPic = $('.zoom_l_smallPic');
		let $mbshop_detail_pdid = $('.mbshop_detail_pdid');
//		console.log($colorSelected);
		
		
		//页面跳转
		var data = location.search.substring(1).split('=');
//		console.log(data);
		var curId = data[1];
//		console.log(curId);

		var goodsId;
		// 请求数据
		$.ajax({
			url:'../api/details.php',
			async:false,
			success:function(res){
				var goodslist = JSON.parse(res);
//				console.log(goodslist);
				goodslist.forEach(function(item){
					if(item.id===curId){
//						console.log(item)
						goodsId = item;
					}
//					console.log(item.id);
				})

			}
		});
		//拼接html写入页面
		$zoom_l_bigPicArea.html(`
			<div class="tb-pic goods">
                <img src="../${goodsId.imgurl}" data-big="../${goodsId.imgurl}" class="jqzoom" style="width:480px;height:480px" />
             </div>
		`);
		$mbshop_detail_pdbrand.html(`<a href="" target="_blank">${goodsId.pinpai}</a>${goodsId.goodsname}`);
		/*商品名*/
		$mbshop_detail_goods_title.html(`${goodsId.pinpai} ${goodsId.goodsname}`);
		/*价格*/
		$mbshop_detail_price.html(`
			<b>售价：</b>
			<strong id="salePriceText">￥${goodsId.price}</strong>
			<input type="hidden" name="_price" id="_price" value="${goodsId.price}" />
			<i>吊牌价：</i><em class="yuanjia">￥${goodsId.yuanjia}</em>
			<span class="zhekou">${goodsId.zhekou}</span>
		`);
		/*销量*/
		$clipbox.html(`
			<div class="first">销量<span>${goodsId.xiaoliang}</span></div>
			<div><i>&nbsp;</i>累计评价<span id="saleInfoCommentCount">${goodsId.pingjia}</span></div>
			<div><i>&nbsp;</i>送邦购积分<span id="salePoint">${goodsId.jifen}</span></div>
		`);
		/*颜色*/
		$colorSelected.html(`${goodsId.color}`);
		
		$color.html(`
			<a id="color_03" type="color" attr_value="${goodsId.color}" goods_attr_sn="${goodsId.bianhao}"class="selected">
				<img src="../${goodsId.imgurl}" large_src="../${goodsId.imgurl}" alt="">
			</a>
			<a id="color_99" type="color" attr_value="${goodsId.color}" goods_attr_sn="${goodsId.bianhao}" class="selected">
				<img src="../${goodsId.imgurl}" large_src="../${goodsId.imgurl}" alt="">
			</a>
			<a id="color_46" type="color" attr_value="${goodsId.color}" goods_attr_sn="${goodsId.bianhao}" class="selected">
				<img src="../${goodsId.imgurl}" large_src="../${goodsId.imgurl}" alt="">
			</a>
			<a id="color_32" type="color" attr_value="${goodsId.color}" goods_attr_sn="${goodsId.bianhao}" class="selected">
				<img src="../${goodsId.imgurl}" large_src="../${goodsId.imgurl}" alt="">
			</a>
		`);
		/*购买数量*/
		$goods_num.html(`
			<a class="mbshop_detail_buyNum_less" title="减少">-</a>
			<input class="mbshop_detail_buyNum" type="text" value="1">
			<a class="mbshop_detail_buyNum_add" title="增加">+</a>
			<strong id="availableNum">（库存剩余 <span id="stockNum">${goodsId.kucun}</span>件）</strong>
			<b id="availableMessage"></b>
		`);
		/*图片切换*/
		$zoom_l_smallPic.html(`
			<li class="change_pic zoom_l_pic"><img src="../${goodsId.imgurl}" /></li>
			<li class="change_pic zoom_l_pic"><img src="../${goodsId.imgurl}" /></li>
			<li class="change_pic zoom_l_pic"><img src="../${goodsId.imgurl}" /></li>
			<li class="change_pic zoom_l_pic"><img src="../${goodsId.imgurl}" /></li>
			<li class="change_pic zoom_l_pic"><img src="../${goodsId.imgurl}" /></li>
		`);
		/*商品编号*/
		$mbshop_detail_pdid.html(`商品编号：${goodsId.bianhao}`);
		
		/*使用放大镜插件*/
		$('.goods').gdszoom({
			width:480,height:480,position:'right'
		});
		/*切换*/
		$('.change_pic img').click(function(){
			$('.goods img').attr({
				'src':this.src,
				'data-big':this.src
			});
		});
		
		
		/*飞入购物车效果*/
		// 1）给按钮绑定点击事件
        var $goodsList = $('.mbshop_detail_btn_bag');
        var $carList = $('.shopping_bag');
		var $redbag_num = $('.redbag_num');
		var $jqzoom = $('.jqzoom');
		var $title = $('.mbshop_detail_pdbrand mbshop_detail_pdname')
		var $price = $('#salePriceText');
		var qty = 0;
		 /*写入cookie*/
		//Unexpected end of JSON input
		//JSON.parse中的字符串不符合规则
		var goodslist = getCookie('goodslist')
		goodslist = goodslist ? JSON.parse(goodslist) : [];
		console.log($jqzoom);
        $goodsList.on('click',function(){
//      	console.log(6666);
//          var $currentLi = $(this).closest('li');
		
            // 当前商品图片
            var $img = $jqzoom;

            // 把复制的图片写入页面，并设置样式
            var $cloneImg = $img.clone();
            console.log($cloneImg);
            $cloneImg.css({
                position:'absolute',
                left:$img.offset().left,
                top:$img.offset().top,
                width:$img.outerWidth(),
                height:$img.outerHeight()
            }).appendTo('body');


            // 2>复制当前商品所有信息(用于往购物车添加)
            // 删除无用的“添加到购物车”按钮
            // 添加删除按钮

            // 图片飞入动画效果
            // 动画完成后，把复制li写入购物车列表
            $cloneImg.animate({
                left:$carList.offset().left,
                top:$carList.offset().top + $carList.outerHeight(),
                width:10,
                height:10
            },function(){
//             $cloneLi.appendTo($carList);
               qty++;
				$redbag_num.html(qty);
				
               // 删除动画图片
               $cloneImg.remove();
            });
            
				// 关键：判断当前商品是否存在cookie
				for(var i=0;i<goodslist.length;i++){
					if(goodslist[i].guid === curId){
						goodslist[i].qty++;
						break;
					}
				}

				// 商品不存cookie中
				if(i===goodslist.length){
					// 获取<当前>商品的信息
					var goods = {
						guid:curId,
						imgurl:goodsId.imgurl,
						name:goodsId.goodsname,
						price:goodsId.price,
						qty:1
					};

					// 往数组中添加当前商品
					goodslist.push(goods);
				}
				

				

				// 设置cookie
				// cookie保存的是字符串
				// JSON.stringify()：把对象/数组转成json字符串
				setCookie('goodslist',JSON.stringify(goodslist));
			
			
        });
		
	});
});