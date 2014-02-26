'use strict';

exports.description = 'Create a web application project with Sass utilizing the Compass framework, Jasmine unit tests on PhantomJS and JShint, CSSlint and HTML validation';
exports.notes = 'Initiating project....';
exports.after = 'Project is almost ready. You must run _npm install_ to install all the dependencies. Ones the installation is complete you can execute tasks with _grunt_.';
exports.warnOn = '*';

exports.template = function (grunt, init, done) {
    function mkdir(dirpath) {
        if (!grunt.file.exists(dirpath)) {
            grunt.file.mkdir(dirpath);
        }
    }

    init.process({}, [
        init.prompt('name', 'my-web-application'),
        init.prompt('title', 'My Web Application'),
        init.prompt('description', 'This is the best web application in the world!'),
        init.prompt('version'),
        {
            name: 'sass',
            message: 'Are you going to use Sass?',
            default: 'y/N'
        },
        {
            name: 'jsdoc',
            message: 'Are you going to document your JavaScript?',
            default: 'y/N'
        },
        {
            name: 'jstest',
            message: 'Are you going to test your JavaScript?',
            default: 'y/N'
        }
    ], function (error, props) {
        var devDependencies = {
            'grunt': '~0.4.2',
            'grunt-contrib-jshint': '~0.8.0',
            'grunt-contrib-uglify': '~0.3.2',
            'grunt-contrib-watch': '~0.5.3',
            'grunt-contrib-copy': '~0.5.0',
            'grunt-contrib-clean': '~0.5.0',
            'grunt-contrib-concat': '~0.3.0',
            'grunt-contrib-csslint': '~0.2.0',
            'grunt-contrib-cssmin': '~0.7.0',
            'grunt-html': '~0.3.4'
        };

        props.sass = /^y(\/N)?$/.test(props.sass);
        props.jsdoc = /^y(\/N)?$/.test(props.jsdoc);
        props.jstest = /^y(\/N)?$/.test(props.jstest);

        if (props.sass) {
            devDependencies['grunt-contrib-compass'] = '~0.7.1';
        }

        if (props.jsdoc) {
            mkdir('jsdoc');
            devDependencies['grunt-contrib-yuidoc'] = '~0.5.0';
        }

        if (props.jstest) {
            mkdir('test');
            devDependencies['grunt-contrib-jasmine'] = '~0.6.1';
        }

        init.copyAndProcess(init.filesToCopy(props), props);
        init.writePackageJSON('package.json', {
            name: props.name,
            title: props.title,
            description: props.description,
            version: props.version,
            devDependencies: devDependencies
        });

        mkdir('dist');
        mkdir('src');
        mkdir('vendor');

        done();
    });
};