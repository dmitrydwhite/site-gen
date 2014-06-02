var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * SnowForge is a static-site generator that accepts a directory and
 * converts it into a directory with the new layout
 * @param {string} path: a path for the file or file system that will be
 *                       the basis for the generated site.
 */
module.exports.SnowForge = function (directory, indexFile) {
  var template = indexFile;
  if (!indexFile) {
    template = directory + "/layout.html";
  }
  console.log(directory);
  console.log("Template file is: " + template);
  var complex = {path: directory, temp: template};
  return complex;
};
