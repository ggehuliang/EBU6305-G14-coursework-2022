const fileinclude = require('gulp-file-include');
const gulp = require('gulp');
const open = require('open');
// const fs = require('fs');
const pack = async () => {
  // // 删除原有dist
  // await fs.promises.unlink('./dist');
  // 拷贝资源文件
  await gulp.src('src/resources/**').pipe(gulp.dest('dist/resources'));
  // 拷贝bootstrap
  await gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.js').pipe(gulp.dest('dist/resources/js'));
  await gulp.src('node_modules/bootstrap/dist/css/bootstrap.css').pipe(gulp.dest('dist/resources/css'));
  await gulp.src('node_modules/bootstrap/dist/css/bootstrap.css.map').pipe(gulp.dest('dist/resources/css'));
  await gulp.src('node_modules/jquery/dist/jquery.min.js').pipe(gulp.dest('dist/resources/js'));

  // 处理include
  await gulp
    .src('src/**.html')
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: '@file',
      })
    )
    .pipe(gulp.dest('dist'));
  return true;
};
gulp.task('pack', pack);
gulp.task('dev', async () => {
  await pack();
  open('dist/index.html');
  console.log('开始监听文件变更...');
  await gulp.watch('src/**', { events: 'all' }, async () => {
    console.log('文件变更，重新转译...');
    await pack();
    return true;
  });
});
