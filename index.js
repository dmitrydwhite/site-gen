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
 * @param {string} path: a path for the file or file system that will be
 *                       the basis for the generated site.
 */
module.exports.SnowFrog = function (directory, indexFile) {
  // this.readDirectory(directory, indexFile);
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

// var readDirectory = function (directory, indexFile) {
//   var template = indexFile;
//   var dr = directory;
//   if (directory === '.') {
//     dr = __dirname;
//   }
//   if (!indexFile) {
//     template = dr + "/layout.html";
//   }
//   console.log("Template file is: " + template);
//   var readObject = {path: dr, template: template};
//   return readObject;
// }.bind(this);


