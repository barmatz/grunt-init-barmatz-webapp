'use strict';

exports.description = 'Create a web application project with Sass utilizing the Compass framework, Jasmine unit tests on PhantomJS and JShint, CSSlint and HTML validation';
exports.notes = 'Initiating project....';
exports.after = 'Project is almost ready. You must run _npm install_ to install all the dependencies. Ones the installation is complete you can execute tasks with _grunt_.';
exports.warnOn = '*';

exports.template = function (grunt, init, done) {
    init.process({}, [
        init.prompt('name', 'my-web-application'),
        init.prompt('title', 'My Web Application'),
        init.prompt('description', 'This is the best web application in the world!'),
        init.prompt('version')
    ], function (error, props) {
        init.copyAndProcess(init.filesToCopy(props), props);
        init.writePackageJSON('package.json', {
            name: props.name,
            title: props.title,
            description: props.description,
            version: props.version,
            devDependencies: {
                "grunt": "~0.4.2",
                "grunt-contrib-jshint": "~0.8.0",
                "grunt-contrib-uglify": "~0.3.2",
                "grunt-contrib-watch": "~0.5.3",
                "grunt-contrib-copy": "~0.5.0",
                "grunt-contrib-clean": "~0.5.0",
                "grunt-contrib-concat": "~0.3.0",
                "grunt-contrib-csslint": "~0.2.0",
                "grunt-contrib-cssmin": "~0.7.0",
                "grunt-contrib-compass": "~0.7.1",
                "grunt-contrib-jasmine": "~0.6.1",
                "grunt-contrib-connect": "~0.6.0",
                "grunt-contrib-yuidoc": "~0.5.0",
                "grunt-html": "~0.3.4"
            }
        });

        done();
    });
};