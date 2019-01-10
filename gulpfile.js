const gulp = require('gulp');
const $ = require('gulp-load-plugins')() // 自动引入需要的插件
const stylus = require('gulp-stylus');//引入gulp-stylus
const connect = require('gulp-connect') // 实时自动编译打包
const htmlmin = require('gulp-htmlmin');


//定义处理stylus的任务
gulp.task('stylusTask',function () {
  return gulp.src('public/css/*.styl') // 操作的源文件
    .pipe($.stylus())
    .pipe(gulp.dest('public/css')) // 将转换为stylus的文件输出到css下
    .pipe($.connect.reload())
})

//定义处理css的任务
gulp.task('css', ['stylusTask'], function () {
  return gulp.src('public/css/*.css')
    .pipe(concat('dist.min.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
});

//定义处理html的任务
gulp.task('html', function() {
  return gulp.src('public/*.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'))
});

//定义监视的任务
gulp.task('watch',function () {
  //监视指定的文件，并制定对应的处理任务
  gulp.watch('public/css/*.styl',['stylusTask'])
})
gulp.task('default',['stylusTask','watch','css','html'])