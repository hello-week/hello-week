const glob = require("glob");
const path = require("path");
const fs = require('fs');
const package = require('../package.json');

glob("./demos/*.html", {root: '../'}, function (er, files) {
    files.forEach(function(file) {
        fs.exists(file, function(fileok) {
            if (fileok) {
                fs.readFile(file, function(error, data) {
                    const html = data.toString();
                    var result = html.replace('@{version}', package.version);
                    fs.writeFile(file, result, 'utf8', function (err) {
                        if (err) return console.log(err);
                    });
                });
            } else {
                console.log("File not found!");
            }
        });
    });
});
