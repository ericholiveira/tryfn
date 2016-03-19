var grunt = require("grunt");
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-release');
grunt.loadNpmTasks('grunt-mocha-test');
grunt.loadNpmTasks('grunt-istanbul');

grunt.initConfig({
	watch: {
		scripts: {
			files: ['src/**/*.js', '*.js', 'tests/*.js'
			],
			tasks: ['all'],
			options: {
				spawn: false
			}
		}
	},
	instrument: {
		files: ['src/**/*.js','tests/**/*.js'],
		options: {
			lazy: false,
			basePath: '.coverage'
		}
	},
	jshint: {
		all: ['src/**/*.js', '*.js', 'tests/**/*.js'],
		options:{
			esnext:true
		}
	},
	mochaTest: {
		test: {
			options: {
				reporter: 'spec',
				clearRequireCache:true
			},
			src: ['tests/basic_test.js']
		},
		testCancel: {
			options: {
				reporter: 'spec',
				clearRequireCache:true
			},
			src: ['tests/cancel_test.js']
		},
		cov: {
			options: {
				reporter: 'spec',
				clearRequireCache:true
			},
			src: ['.coverage/tests/**/*_test.js']
		}
	},
	storeCoverage: {
		options: {
			dir: '.coverage/reports'
		}
	},
	makeReport: {
		src: '.coverage/reports/**/*.json',
		options: {
			type: 'html',
			dir: '.coverage/reports',
			print: 'both'
		}
	},
	release: {
		options: {
			bump: true,
			npm: true,
			npmTag: "<%= version %>"
		}
	}

});
grunt.registerTask("cov-test", [ "instrument","mochaTest:cov", 'storeCoverage','makeReport']);
grunt.registerTask("test", ["mochaTest:test","mochaTest:testCancel"]);
grunt.registerTask("coverage", ["jshint","cov-test"]);
grunt.registerTask("all", ["jshint", "test"]);
grunt.registerTask("default", ["all", "watch"]);
grunt.registerTask("prod", ["all", "release"]);

