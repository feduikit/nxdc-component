module.exports=function (grunt) {
	'use strict';

	var me = this;
    var fs = require("fs");
    var pkg = grunt.file.readJSON('package.json');
    var ske = grunt.file.readJSON('skeleton.json')||{type:"1"};
    var modules = [];
    try{
        var path = (ske.type=="1")?"src/js":'js';
        var arr = fs.readdirSync(path);
        for(var i=0;i<arr.length;i++){
            var r = arr[i].match(/^(.+)\.js$/i);
            if(r && r[1]!="config") modules.push({'name':r[1]});
        }
    }catch(err){}
    
    var cfg = (function(){
        var o = {requirejs:{},clean:{},concat:{},uglify:{},cssmin:{},copy:{}};//,watch:{}
        o.requirejs.tranditionCompile={
            options : {
                baseUrl: ".",
                appDir : (ske.type=="1")?'src/js':'js',
                dir : './dist/demo/js',
                optimize : 'uglify2',
                generateSourceMaps: true,//是否生成source map
                mainConfigFile : (ske.type=="1")?'src/js/config.js':'js/config.js',
                logLevel : 0,
                modules  : modules,
                findNestedDependencies: true,
                fileExclusionRegExp: /^\./,
                inlineText: true,
                preserveLicenseComments: false
            }           
        };
        o.clean.js = {src : ['dist/demo/js/*/','dist/demo/js/config.js',
							 'dist/demo/js/config.js.*','dist/demo/js/config.js.map',
							 'dist/demo/js/*.txt','dist/com/']
					 };
		/***
		** 合并 js 代码
		**/
		o.concat = {
			dist: {
			  	src: ['src/js/Compatibility/**/*.js', 'src/js/components/**/*.js'],
			  	dest: 'dist/com/nxdc.js'
			}
		 };	
		 /***
		 ** 压缩js 代码， 和上一步是前后脚的关系
		 **/
		 o.uglify = {
			 options:{
				 sourceMap:true
			 },
			 build: {  
				src: 'dist/com/nxdc.js',//压缩源文件是之前合并的buildt.js文件  
				dest: 'dist/com/nxdc.min.js'//压缩文件为built.min.js  
			 }
		 };	
		
        o.cssmin={
			options:{
				report:"min",
				sourceMap:true
			},
			build:{	
				expand: true,
				cwd: (ske.type==1)?'src/css/pages/':'css/pages/',
				src : ['*.css'],
				dest : 'dist/com/css/',
				ext : ".min.css"
			}
		};
        o.copy.main = {
            files:[
            {expand: true,
             src: (ske.type==1)?['src/*font*/*.*','src/css/*font*/*.*','lib/**/*font*/*.*']:['css/fonts/*.*','lib/**/*font*/*.*'],
             dest: 'dist/fonts/',
             flatten: true,
             filter: 'isFile'
            },  
            {expand: true,//css
             src: (ske.type==1)?['src/css/global/*.css','src/css/modules/*.css']:['css/global/*.css','css/modules/*.css'],
             dest: 'dist/com/splitcss/',
             flatten: true,
             filter: 'isFile'
            },  				
            {//图片
                expand: true,
                cwd: (ske.type==1)?'src/imgs/':'imgs/',
                src: '**',
                dest: 'dist/imgs/',
                flatten: true,
                filter: 'isFile'              
              },
			 {//copy  requirejs
                expand: true,
                cwd: 'lib/requirejs/',
                src: '*.js',
                dest: 'dist/lib/',
                flatten: true,
                filter: 'isFile'              
              }]
        };
//        o.watch.css = {//监视css文件发生的改变
//            files : [(ske.type=="1")?'src/css/**/*.css':'css/**/*.css'],
//            options : {nospawn : true}
//		}; 
        return o;
    }());
	grunt.initConfig(cfg);
    var gs = JSON.stringify(pkg).match(/grunt-[a-z]+(-[a-z]+)?/ig);
        gs.forEach(function(item){grunt.loadNpmTasks(item);});
		
	grunt.task.registerTask("replace","for this one",function(arg1,arg2){
		grunt.file.recurse('html/',function(abspath, rootdir, subdir, filename){
			var html = grunt.file.read('html/'+ (subdir?subdir+"/":"") +filename);
			/****
			** 替换css
			**/
			var one = html.replace(/href=\"(.+?)\.css\"/ig,function(all,a){
				var arr = a.split(/[\/\\]/);
				var the = arr[arr.length-1];
				if(the.indexOf("bootstrap")==-1){
					return "href="+"../com/css/"+the+".min.css"; 
				}else{
					return all;
				}
			});
			/***
			** 替换 requirejs
			**/
			one = one.replace(/src=\"(.+?)require.js\"/i,function(all,b){ 
				return "src="+"'../lib/require.js'";  
			});
			
			/***
			** 替换 data-main    js
			**/
			one = one.replace(/data-main=\"(.+?)\"/i,function(all,b){ 
				return "data-main="+"'./js/"+ filename.replace(/\.html/i,"'");   
			});
			grunt.file.write('dist/demo/'+ (subdir?subdir+"/":"")+filename,one);
		});
        grunt.file.recurse('lib/bootstrap/', function(abspath, rootdir, subdir, filename) {
            var src = 'lib/bootstrap/' + (subdir ? subdir + "/" : "") + filename;
            grunt.file.copy(src, 'dist/lib/bootstrap/' + (subdir ? subdir + "/" : "") + filename);
        });
		grunt.file.recurse('src/js/components/', function(abspath, rootdir, subdir, filename) {
			var src = 'src/js/components/' + (subdir ? subdir + "/" : "") + filename;
			grunt.file.copy(src, 'dist/com/splitjs/' + (subdir ? subdir + "/" : "") + filename);
		});
		// 提取工具类的js 放到发布目录
		grunt.file.recurse('src/js/Compatibility/', function(abspath, rootdir, subdir, filename) {
			var src = 'src/js/Compatibility/' + (subdir ? subdir + "/" : "") + filename;
			grunt.file.copy(src, 'dist/com/splitjs/' + (subdir ? subdir + "/" : "") + filename);
		});	
//		grunt.file.recurse('src/css/modules/', function(abspath, rootdir, subdir, filename) {
//			var src = 'src/css/modules/' + (subdir ? subdir + "/" : "") + filename;
//			grunt.file.copy(src, 'dist/com/splitcss/' + (subdir ? subdir + "/" : "") + filename);
//		});			
		
		console.log("-------打包，压缩，合并，完成!------------");		
	});		
	grunt.registerTask('build', Object.keys(cfg));
	grunt.registerTask('default', ['build','replace']);
};