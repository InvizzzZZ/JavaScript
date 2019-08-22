var gulp       = require('gulp'), // Подключаем Gulp
    sass         = require('gulp-sass'), //Подключаем Sass пакет,
    browserSync  = require('browser-sync'), // Подключаем Browser Sync
    concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
    autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов


gulp.task('browser-sync', async function() { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: './' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
});

// сборка css из sass и ребут релоад страницы при изменениях в sass
gulp.task('css', function() { // Создаем таск Sass
    return gulp.src('style.css') // Берем источник
        .pipe(browserSync.reload({ stream: true }))
});

//релоад страницы при изменениях в html
gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function() {
    return gulp.src('common.js')
        .pipe(browserSync.reload({ stream: true }))
});



//слежение за sass, html, js файлами и запуск соотвествующих тасков
gulp.task('watch', async function() {
    gulp.watch('style.css', gulp.parallel('css')); // Наблюдение за sass файлами
    gulp.watch('index.html', gulp.parallel('html')); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/common.js', gulp.parallel('js')); // Наблюдение за главным JS файлом и за библиотеками
});


//дефолтный таск во время разработки
gulp.task('default', gulp.parallel('browser-sync', 'watch'));

// //сборка продакшина
// gulp.task('build', gulp.parallel('prebuild', 'clean', 'img', 'sass', 'scripts'));
