module.exports = function(grunt) {  
  //配置参数  
  grunt.initConfig({  
     pkg: grunt.file.readJSON('package.json'),  
     concat: {  
         options: {  
             separator: ';',  
             stripBanners: true  
         },  
         dist: {  
             src: [
                "js/Actor.js",
                "js/Background.js",
                "js/Land.js",
                "js/Game.js",
				"js/Pipe.js"
             ],  
             dest: "js/all.js"  
         }  
     },
      uglify: {
        my_target: {
          files: {
            'js/all.min.js':'js/all.js'
          }
        }
      }
  });  
   
  //载入concat和uglify插件，分别对于合并和压缩  
  grunt.loadNpmTasks('grunt-contrib-concat');  
  grunt.loadNpmTasks('grunt-contrib-uglify');  
   
  //注册任务  
  grunt.registerTask('default', ['concat','uglify']);  
}  