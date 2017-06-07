var gulp = require('gulp');
var sass = require('gulp-sass');
//创建任务
gulp.task('compileSass',function(){
	//这是链式调用
	//文件路径
	gulp.src('./src/dafeiji/sass/*.scss')
	//编译文件dafeiji.scss
	.pipe(sass())
	//输出文件
	.pipe(gulp.dest('./src/dafeiji/css'))
});

/*
 自动编译
 */
gulp.task('monitorSass',function(){
	gulp.src('./src/dafeiji/sass/*.scss',['compileSass'])
})

// 浏览器同步插件
var browserSync = require('browser-sync');
//创建任务
gulp.task('server',function(){
	browserSync({
		// server:'./src',
		//后台服务器代理
		proxy:'http://localhost:2000',
		//监听文件路径,自动刷新
		files:['./src/**/*.html']
	});
	gulp.src('./src/dafeiji/sass/*.scss',['compileSass']);

})
