# Gulp

Eu costumo usar o **GULP** para:
- minicar HTML
- compilar SASS
- concatenar, minificar, renomear e gerar MAPS de CSS
- concatenar, minificar e verificar erros de JavaScript
- Minificar IMAGENS

Para instalar o gulp global:
```js
npm install --global gulp-cli
```

Depois instale como dependencia do projeto
```js
npm install --save-dev gulp

// ou

yarn add -D gulp-cli
```

Para saber se esta instalado:
```js
gulp --version
```


Minha estrutura de projeto basico para usar todas estas funções é:
```js
nome_projeto_gulp/
├── dist/
├── src/
│   ├── assets/
│   │   ├── css/
│   │   │   └─── style.css
│   │   ├── imgs/
│   │   ├── js/
│   │   │   ├── javascript.js
│   │   │   └─── style.js
│   │   └── sass/
│   │       ├── _variables.scss
│   │       └── sass.scss
│   └── index.html
├── gulpfile.js
└── package.json
```

Vale lembrar que apenas altero os arquivos que estou usando e rodo apenas os comandos para os arquivos que estou usando.

Os conteudos são:
- ```css/style.css```: Vai estilização em css
- ```js/javascript.js```: Costumo colocar uma configuração padrão, alguma coisa que nao vou ficar mudando e que vai estar no começo do arquivo final. Por exemplo um script para fazer um efeito de scroll diferenciado.
- ```js/style.js```: Vai estilização em js
- ```imgs```: Coloco as imagens que vou minificar
- ```sass/_variables.js```: Vai variaveis para o SASS
- ```sass/_variables.js```: Vai estilização em SASS
- ```index.html```: Vai o conteudo do arquivo html que quero minificar, podem ter outros arquivos HTML neste diretorio e cada um vai ser minificado


## package.json
```js
{
  "name": "nome-projeto",
  "version": "1.0.0",
  "description": "Teste de gulp",
  "main": "index.js",
  "scripts": {
  },
  "author": "Fulano <fulano@fulano.com.br> (http://fulano.com.br/)",
  "license": "MIT",
  "devDependencies": {
    "autoprefixer": "^6.3.3",
    "browser-sync": "^2.11.1",
    "del": "^2.2.0",
    "express": "^4.13.4",
    "gulp": "^3.9.1",
    "gulp-cache": "^0.4.2",
    "gulp-concat": "^2.6.0",
    "gulp-concat-css": "^2.2.0",
    "gulp-copy": "0.0.2",
    "gulp-cssnano": "^2.1.1",
    "gulp-dest": "^0.2.3",
    "gulp-htmlmin": "^1.3.0",
    "gulp-if": "^2.0.0",
    "gulp-imagemin": "^2.4.0",
    "gulp-jshint": "^2.0.0",
    "gulp-notify": "^2.2.0",
    "gulp-postcss": "^6.1.0",
    "gulp-prompt": "^0.1.2",
    "gulp-rename": "^1.2.2",
    "gulp-ruby-sass": "^2.0.6",
    "gulp-sourcemaps": "^1.6.0",
    "gulp-uglify": "^1.5.3",
    "gulp-zip": "^3.2.0",
    "inquirer": "^0.12.0",
    "jshint": "^2.9.1",
    "jshint-stylish": "^2.1.0",
    "map-stream": "0.0.6",
    "merge-stream": "^1.0.0",
    "node-notifier": "^4.5.0",
    "postcss-merge-rules": "^2.0.5",
    "postcss-scss": "^0.1.5",
    "precss": "^1.4.0",
    "rsyncwrapper": "^1.0.0",
    "run-sequence": "^1.1.5"
  }
}
```


## gulpfile.js
```js
var gulp               = require('gulp'),
    rename             = require("gulp-rename"),
    dest               = require('gulp-dest'),
    runSequence        = require('run-sequence'),
    zip                = require('gulp-zip'),
    del                = require('del'),
    concatFile         = require('gulp-concat'),
    express            = require('express'),
    browserSync        = require('browser-sync').create();
    inquirer           = require("inquirer"),
    gulpif             = require('gulp-if'),
    mergeTask          = require('merge-stream'),
    notify             = require('gulp-notify'),
    notifier           = require('node-notifier'),
    map                = require('map-stream'),
    cache              = require('gulp-cache'),
    sourcemaps         = require('gulp-sourcemaps'),
    autoprefixer       = require('autoprefixer'),
    htmlmin            = require('gulp-htmlmin'),
    sass               = require('gulp-ruby-sass'),
    cssnano            = require('gulp-cssnano'),
    mergerules         = require('postcss-merge-rules'),
    postcss            = require('gulp-postcss'),
    jsnamo             = require('gulp-uglify'),
    jshint             = require('gulp-jshint'),
    imagemin           = require('gulp-imagemin');


/* Minificar HTML */
gulp.task('minificaHtml', function() {
  	return gulp.src('src/*.html')
	    .pipe(htmlmin({collapseWhitespace: true}))
	    .pipe(gulp.dest('dist'))
	    .pipe(notify({ title: 'BlackCat - Notificação',
	    			   message: 'Arquivos .html minificados',
	    			   sound: true }));
});


/* Compila Sass */
gulp.task('compilaSass', function() {
    return sass('src/assets/sass/sass.scss', {
        noCache      : true,
        precision    : 4,
        unixNewlines : true
    })
	    .on('error', sass.logError)
	    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions']})]))
	    .pipe(dest('src/assets/css/', { basename: 'sass' }))
	    .pipe(gulp.dest('./'))
	    .pipe(notify({ title: 'BlackCat - Notificação',
	    			   message: 'Arquivo style.scss compilado com êxito.',
	    			   sound: true }));
});


/* Concatena Css */
gulp.task('concatenaCss', function () {
    return gulp.src('src/assets/css/*.css')
	    .pipe(concatFile("main.css"))
        .pipe(postcss([mergerules]))
	    .pipe(gulp.dest('dist/css/'))
	    .pipe(notify({ title: 'BlackCat - Notificação',
	    			   message: 'Arquivos .css concatenados com êxito.',
	    			   sound: true }));
});


/* Minifica, renomeia e gera source maps */
gulp.task('mrsCss', function() {
    var original   = gulp.src('dist/css/main.css'),
        nameMap    = 'main.min.css';

    function renomeia(Original) {
        var varMinify = Original
        function funcMinify(varMinify) {
            return varMinify
	            .pipe(postcss([autoprefixer, mergerules]))
	            .pipe(cssnano({ discardComments: { removeAll: true}}))
	            .pipe(dest('dist/css/', { basename : 'min' }))
        }

        return funcMinify(varMinify)
        	.pipe(rename("dist/css/main.min.css"));
    }

    return renomeia(original)
	    .pipe(sourcemaps.init())
	    .pipe(sourcemaps.write('./'))
	    .pipe(gulp.dest('./'))
	    .pipe(notify({ title: 'BlackCat - Notificação',
	    			   message: 'Arquivo main.css minificado e com sourcemap gerado.',
	    			   sound: true }));
});


/* Concatena Js */
gulp.task('concatenaJs', function () {
    return gulp.src('src/assets/js/*.js')
	    .pipe(concatFile("javascript.js"))
	    .pipe(gulp.dest('dist/js/'))
	    .pipe(notify({ title: 'BlackCat - Notificação',
	    			   message: 'Os arquivos JS foram concatenados com êxito.',
	    			   sound: true }));
});


/* Minifica Js */
gulp.task('minificaJs', function () {
    return gulp.src('dist/js/javascript.js')
		.pipe(jsnamo())
		.pipe(dest('dist/js/', { basename : 'javascriptmin' }))
		.pipe(rename("dist/js/javascript.min.js"))
		.pipe(gulp.dest('./'))
        .pipe(notify({ title: 'BlackCat - Notificação',
                       message: 'O arquivo javascript.js foi minificado com êxito.',
                       sound: true}));

});


/* Verifica erros no js */
gulp.task('verificarErroJs', function() {
	var jshintReporter = map(function (file, cb) {
	  	if (file.jshint.success) {
            notifier.notify({
                title: 'BlackCat - Notificação',
                message: 'O arquivo ' + file.path.replace(/^.*[\\\/]/, '') + ' não possue erros.',
                sound: true
            });
        }else{
            notifier.notify({
                title: 'BlackCat - Notificação',
                message: 'Foram encontrados erros, verificar os apontamentos no terminal.',
                sound: true
            });
        }
		cb(null, file);
	});

	return gulp.src('src/assets/js/*.js')
	   	.pipe(jshint())
	   	.pipe(jshintReporter)
	    .pipe(jshint.reporter('jshint-stylish'));
});


/* Minifica Imgs */
gulp.task('minificaImg', function(){
  	return gulp.src('src/assets/imgs/*')
	    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true})))
	    .pipe(gulp.dest('dist/imgs/'))
	    .pipe(notify({
					title: 'BlackCat - Notificação',
			    	message: 'Imagens minificadas com êxito.',
			    	sound: true,
			    }));
});
```


## sass.scss
```js
@import 'variables';

// Estilização
```

## Usar
Para rodar algum comando basta digitar no terminal ```gulp nomeTask```.

## Mais
Outras coisas legais:
- Usar o watch do proprio gulp.
```js
gulp.task('default', ['taskx', 'tasky']);

//Observador
gulp.task('aqqq', function() {
  gulp.watch('./dev/styles/**/*', ['taskw', 'taskm']);
  gulp.watch('./dev/app/**/*', ['tasku']);
});
```