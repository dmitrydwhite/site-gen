var readline = require('readline');
var fs = require('fs');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var rfOptions = {encoding: 'utf8'};

/**
 * SnowFrog is a static-site generator that accepts a directory and
 * converts it into a directory with the new layout
 *
 * @param {string} path: a path for the file or file system that will be
 *                       the basis for the generated site.
 *
 * @param {string} indexFile A string naming the file to use as the template.
 *                           If no template file is specified, the program
 *                           assumes "layout.html"
 */
var SnowFrog = function (directory, indexFile) {
  var sourceObj = this._findDirectory(directory, indexFile);
  console.log(this.webList(sourceObj));
  return this.webList(sourceObj);
  // return sourceObj;
};

SnowFrog.prototype._findDirectory = function (directory, indexFile) {
  var template = indexFile;
  var dr = directory;
  if (directory === '.') {
    dr = __dirname;
  }
  if (!indexFile) {
    template = dr + "/layout.html";
  }
  console.log("Template file is: " + template);
  var readObject = {path: dr, template: template};
  return readObject;
};

SnowFrog.prototype.webList = function (sourceDir) {
  var files = fs.readdirSync(sourceDir.path);
  var webFiles = [];
  files.map(function (fileName) {
    if (fileName.slice(-5) === ".html") {
      webFiles.push(fileName);
    }
  });
  return webFiles;
};


module.exports = SnowFrog;
