module.exports = function(grunt){

	"use strict";
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/**
		 *
		 * ディレクトリの設定
		 *
		 */
		dir: {
			dev: 'dev',
			build: 'build'
		},

		/**
		 *
		 * ファイルの結合
		 *
		 */
		concat: {
			js_libs: {
				src: [
					'<%= dir.dev %>/vender/underscore/underscore.js',
					'<%= dir.dev %>/vender/jquery/jquery.js',
					'<%= dir.dev %>/vender/backbone/backbone.js',
				],
				dest: '<%= dir.dev %>/js/libs.js'
			},
			js: {
				src: [
					'<%= dir.dev %>/js/Todo/config.js',
					'<%= dir.dev %>/js/Todo/Models/ModelBase.js',
					'<%= dir.dev %>/js/Todo/Models/Todo.js',
					'<%= dir.dev %>/js/Todo/Collections/CollectionBase.js',
					'<%= dir.dev %>/js/Todo/Collections/Todos.js',
					'<%= dir.dev %>/js/Todo/Views/ViewBase.js',
					'<%= dir.dev %>/js/Todo/Views/TodoForm.js',
					'<%= dir.dev %>/js/Todo/Views/TodoList.js',
					'<%= dir.dev %>/js/Todo/Views/TodoListItem.js',
					'<%= dir.dev %>/js/Todo/Routers/RouterBase.js',
					'<%= dir.dev %>/js/Todo/Routers/TodoRouter.js',
					'<%= dir.dev %>/js/index.js',
				],
				dest: '<%= dir.dev %>/js/todo.js'
			}
		},

		/**
		 *
		 * JSの文法チェック
		 * @see http://www.jshint.com/docs/options/
		 *
		 */
		jshint: {
			all: ['<%= dir.dev %>/js/todo.js'],
			options: {
				strict: true,		// "use strict" を強制
				indent: 2,			// インデントの深さ
				//				maxlen: 80,			// 一行の最大長
				unused: false,		// 宣言したきり使っていない変数を検出

				// グローバル変数へのアクセスの管理
				undef: true,		// グローバル変数へのアクセスを禁止
				browser: true,		// ブラウザ用のやつは許可
				devel: true,		// consoleやalertを許可
				debug: true,		// debugger を許可
				node: true,
				globals: {
					jQuery: false,
					$: false,
					Backbone: false
				}
			}
		},


		/**
		 *
		 * JSのminify
		 *
		 */
		uglify: {
			build: {
				src: '<%= dir.dev %>/js/todo.js',
				dest: '<%= dir.dev %>/js/todo.min.js'
			},
			options: {
				// ファイルの始めにコメントを追加
				banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
					'<%= grunt.template.today("yyyy-mm-dd") %> */',
				mangle: true,		// 変数を短いものに変える
				compress: true,		// 冗長になっている書き方を短くまとめる
				beautify: false,	// 読みやすくインデントをつけて整形する
				report: 'minify'	// ファイルをminify, gzipした場合のサイズを教えてくれる
			}
		},

		/**
		 *
		 * sassをcssにコンバート
		 *
		 */
		sass: {
			dist: {
				options: {
					style: 'expanded',
					compass: true
				},
				files: {
					'<%= dir.dev %>/css/style.css': '<%= dir.dev %>/scss/style.scss'
				}
			}
		},

		/**
		 *
		 * ファイルのコピー
		 *
		 */
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= dir.dev %>/',
					src: ['**/*.html', '**/*.min.js', '**/libs.js', '**/*.css'],
					dest: '<%= dir.build %>/'
				}]
			}
		},

		/**
		 *
		 * 不要ファイルの削除
		 *
		 */
		clean: {
			build: ['<%= dir.build %>/*']
		},

		/**
		 *
		 * webサーバの設定
		 *
		 */
		connect: {
			site: {
				options: {
					hostname: 'localhost',
					port: 9000
				}
			}
		},

		/**
		 *
		 * watch
		 *
		 */
		watch: {
			html: {
				files: [
					'<%= dir.dev %>/**/*.html'
				]
			},

			javascripts: {
				files: [
					'<%= dir.dev %>/js/**/*.js'
				],
				tasks: ['concat:js_libs', 'concat:js', 'jshint:all', 'uglify' ]
			},

			sass: {
				files: [
					'<%= dir.dev %>/scss/**/*.scss'
				],
				tasks: ['sass']
			},

			css: {
				files: [
					'<%= dir.dev %>/css/**/*.css'
				]
			},

			options: {
				livereload: true, // 変更があればリロードする
				hostname: '<%= connect.site.options.hostname %>',
				open: true,
				spawn: false
			}
		}
	});

	/**
	 *
	 * プラグインの読み込み
	 *
	 */
	var pkg = grunt.file.readJSON('package.json');
	var taskName;
	for(taskName in pkg.devDependencies) {
		if(taskName.substring(0, 6) == 'grunt-') {
			grunt.loadNpmTasks(taskName);
		}
	}

	/**
	 *
	 * タスクの登録
	 *
	 */
	grunt.registerTask('default', ['connect', 'watch']);
	grunt.registerTask('build', ['clean:build', 'concat:js_libs', 'concat:js', 'jshint', 'uglify', 'sass', 'copy']);
};