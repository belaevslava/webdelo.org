gruntConfig = {
    cssmin: {
        bundle_css: {
            files: {
                'assets/css/dist/bundle.min.css': [
                    "node_modules/fullpage.js/dist/jquery.fullpage.min.css",
                    "node_modules/bootstrap/dist/css/bootstrap.min.css",
                    "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css",
                    "assets/css/common.css",
                    "assets/css/animations.css",
                    "assets/css/sections/preloader.css",
                    "assets/css/sections/home.css",
                    "assets/css/sections/how-do-we-work--evaluation.css",
                    "assets/css/sections/how-do-we-work--start-development.css",
                    "assets/css/sections/how-do-we-work--deployment-and-support.css",
                    "assets/css/sections/how-do-we-work--restful-api.css",
                    "assets/css/sections/how-do-we-work--projection.css",
                    "assets/css/sections/technologies.css",
                    "assets/css/sections/who-we-are.css",
                    "assets/css/sections/contacts.css",
                    "assets/css/diagrams/common-evaluation.css",
                    "assets/css/diagrams/deployment.css",
                    "assets/css/diagrams/development-process.css",
                    "assets/css/diagrams/project-process.css"
                ]
            }
        }
    },
    autoprefixer: {
        autoprefixGrutedCss: {
            src: ['assets/css/dist/bundle.min.css'],
            dest: 'assets/css/dist/bundle.min.css'
        }
    },
    uglify: {
        bundle_js: {
            files: {
                'assets/js/dist/bundle.min.js': [
                    "node_modules/jquery/dist/jquery.min.js",
                    "node_modules/fullpage.js/dist/jquery.fullpage.min.js",
                    "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
                    "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
                    "node_modules/snapsvg/dist/snap.svg-min.js",
                    "node_modules/countup.js/dist/countUp.min.js",
                    "node_modules/countup.js/countUp-jquery.js",
                    "node_modules/typeit/dist/typeit.min.js",
                    "node_modules/gsap/src/uncompressed/TweenMax.js",
                    "node_modules/particles.js/particles.js",
                    "node_modules/bowser/bowser.min.js",
                    "node_modules/bodymovin/build/player/bodymovin.js",
                    "assets/js/preloader.class.js",
                    "assets/js/sections/preloader/initialize.js",
                    "assets/js/sections/home/initialize.js",
                    "assets/js/diagrams/common-evaluation.js",
                    "assets/js/sections/how-do-we-work--evaluation/initialize.js",
                    "assets/js/diagrams/project-process.js",
                    "assets/js/sections/how-do-we-work--projection/initialize.js",
                    "assets/js/diagrams/deployment.js",
                    "assets/js/sections/how-do-we-work--deployment-and-support/initialize.js",
                    "assets/js/diagrams/development-process.js",
                    "assets/js/sections/how-do-we-work--start-development/initialize.js",
                    "assets/js/diagrams/restfull.js",
                    "assets/js/diagrams/technologies.js",
                    "assets/js/sections/footer/initialize.js",
                    "assets/js/app.js",
                    "assets/js/sections/who-we-are/initialize.js"
                ]
            }
        }
    }
};

if (typeof module !== 'undefined') {
    module.exports = function (grunt) {
        grunt.initConfig(gruntConfig);

        grunt.loadNpmTasks('grunt-contrib-cssmin');
        grunt.loadNpmTasks('grunt-autoprefixer');
        grunt.loadNpmTasks('grunt-contrib-uglify');

        grunt.registerTask('css', ['cssmin', 'autoprefixer']);
        grunt.registerTask('js', ['uglify']);
        grunt.registerTask('default', ['css', 'js']);
    };
} else {
    var head = document.head;

    var getTaskFiles = function(taskName) {
        var taskFiles = [];
        for (taskItemName in gruntConfig[taskName]) {
            var taskItemFileObject = gruntConfig[taskName][taskItemName].files,
                bundledFile = Object.keys(taskItemFileObject)[0],
                taskItemFiles = taskItemFileObject[bundledFile];

            taskFiles = taskFiles.concat(taskItemFiles);
        }
        return taskFiles;
    };

    var appendStylesToPage = function(taskName) {
        var taskFiles = getTaskFiles(taskName);

        for (var i = 0;i < taskFiles.length;i++) {
            appendCssToPage(taskFiles[i]);
        }
    };

    var appendScriptsToPage = function(taskName) {
        var taskScripts = getTaskFiles(taskName).reverse();

        console.log(taskScripts);
        loadScripts(taskScripts);
    };

    var loadScripts = function(scripts) {
        if (scripts.length < 1) return false;

        var scriptFilePath = scripts.pop();
        console.log('--------------');
        console.log(scriptFilePath);

        loadScript(scriptFilePath, function() {
            loadScripts(scripts);
        });
    };

    var appendCssToPage = function (fileName) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = fileName;
        head.appendChild(link)
    };

    var loadScript = function (url, callback){
        var script = document.createElement("script");

        script.onload = function(){
            callback();
        };

        script.src = url;
        document.body.appendChild(script);
    };

    document.addEventListener("DOMContentLoaded", function(event) {
        appendStylesToPage('cssmin');
        appendScriptsToPage('uglify');
    });
}