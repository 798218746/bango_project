requirejs.config({
	urlArgs: 'v='+ Date.now(),
	//不建议在这里使用baseUrl,因为这样会写死路径
	//使用paths，配置别名
	paths:{
		//"别名":"路径"
		"jquery":"../lib/jquery-3.2.1",
		"gdszoom":"../lib/jquery-gdszoom/jquery.gdszoom",
		"lxCarousel":"../lib/jquery-lxCarousel/jquery.lxCarousel"
	},
	shim:{
		'gdszoom':['jquery'],
		'lxCarousel':['jquery']
	}
	
	
});
