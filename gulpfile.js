var project = {
	open: false
};

var gulp = require('gulp'),
	connect = require('gulp-connect'),
	open = require('gulp-open'),
	jade = require('gulp-jade'),
	sass = require('gulp-sass'),
	gulpIgnore = require('gulp-ignore');
	 
var build_path = './build';
var app_path = './src';
var port = 8080;
var exclude = 	[
					app_path + '/views/**/*.jade',
					app_path + '/styles/**/*.scss',
					app_path + '/scripts/**/*.js'
				];
 
gulp.task('server', function() {
	connect.server({
		root: build_path,
		livereload: true
	});
	gulp.src(build_path + '/index.html')
		.pipe(open('', { url: 'http://localhost:' + port }));
	if(project.open) {
		gulp.src(project.open)
			.pipe(open(''));
	}
});

gulp.task('jade', function() {
	gulp.src(app_path + '/views/*.jade')
		.pipe(jade())
		.pipe(gulp.dest(build_path))
		.pipe(connect.reload());
});

gulp.task('sass', function () {
	gulp.src(app_path + '/styles/main.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(gulp.dest(build_path + '/styles'))
		.pipe(connect.reload());
});

gulp.task('copy', function () {
	gulp.src([	app_path + '/**/*',
				'!' + app_path + '/views/**/*.jade',
				'!' + app_path + '/styles/**/*.scss',
				'!' + app_path + '/scripts/**/*.js' ])
	    //.pipe(gulpIgnore.exclude(exclude))
	    .pipe(gulp.dest(build_path));
});

gulp.task('watch', function() {
	gulp.watch(app_path + '/views/**/*.jade', ['jade']);
	gulp.watch(app_path + '/styles/**/*.scss', ['sass']);
});

gulp.task('default', ['jade', 'sass', 'server', 'copy', 'watch']);