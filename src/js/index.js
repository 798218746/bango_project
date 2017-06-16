//加载首页
require(['config'],function(){
	//此处代码是在config文件加载完才执行的
	require(['jquery','lxCarousel'],function(){
		//引用轮播图
		let $carousel = $('.carousel');
		$('.carousel').lxCarousel({
				imgs:['img/carousel_1.jpg','img/carousel_2.jpg',
				'img/carousel_3.jpg','img/carousel_4.jpg','img/carousel_5.jpg','img/carousel_6.jpg'],
				autoPlay:false,
				index:3,
				width:720,
				height:455
			}).css('background-color','#fff');
	});
});