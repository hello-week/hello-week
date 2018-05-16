const glob = require("glob");
const path = require("path");
const fs = require('fs');
const package = require('../package.json');

const oldVersion = '<span class="tag">v1.3.2</span>'
const newVersion = '<span class="tag">v' + package.version + '</span>'
console.log("newVersion", newVersion);

glob("./demos/*.html", {root: '../'}, function (er, files) {
    files.forEach(function(file) {
        fs.exists(file, function(fileok) {
            if (fileok) {
                fs.readFile(file, function(error, data) {
                    const html = data.toString();
                    var result = html.replace(oldVersion, newVersion);
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
