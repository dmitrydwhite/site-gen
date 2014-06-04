var readline = require('readline');
var fs = require('fs');
var rfOptions = {encoding: 'utf-8'};
var _ = require('lodash');
var path = require('path');

/**
 *
 * @function SnowFrog is a static-site generating function that accepts a
 * directory and converts it into a directory with the new layout
 *
 * @param {string} path: a path for the file or file system that will be
 *                       the basis for the generated site.
 *
 * @param {string} indexFile A string naming the file to use as the template.
 *                           If no template file is specified, the program
 *                           assumes "layout.html"
 */
var SnowFrog = function (directory, indexFile) {
  var snowObj = this._findDirectory(directory, indexFile);
  this._startFrogging(snowObj, this._finish(snowObj));
};

SnowFrog.prototype._startFrogging = function (obj, cb) {
  this._webList(obj, function (obj) {
    this._extractTemplate(obj, function (obj) {
      this._writeNewFiles(obj, function (obj) {

      });
    });
  });
};

SnowFrog.prototype._finish = function (obj) {
  return obj;
};

SnowFrog.prototype._findDirectory = function (directory, indexFile) {
  var template = indexFile;
  var dr = path.resolve(directory);
  if (!indexFile) {
    template = path.normalize(dr + "/layout.html");
  }
  console.log("Template file is: " + template);
  var readObject = {path: dr, template: template};
  return readObject;
};

SnowFrog.prototype._webList = function (obj, cb) {
  console.log("beginning webList");
  fs.readdir(obj.path, function (err, files) {
    var webFiles = [];
    files.map(function (fileName) {
      if (fileName !== "layout.html") {
        if (fileName.slice(-5) === ".html") {
          webFiles.push(fileName);
        }
      }
      }.bind(this));
    console.log(webFiles);
    obj.webFiles = webFiles;
    // console.log(obj);
  });
  cb(obj);
  return obj;
};

SnowFrog.prototype._extractTemplate = function (obj, cb) {
  console.log("beginning template extraction");
  fs.readFile(obj.template, "utf-8", function (err, content) {
    var layoutArray = content.split("{{CONTENT}}");
    obj.templateData = layoutArray;
  }.bind(this));
};

SnowFrog.prototype._getOldContent = function (file) {
  var oldContent;
  fs.readFile(file, "utf-8", function (err, data) {
    oldContent = data;
    console.log("Extracting unique content from " + file);
  });
  if (oldContent) {return oldContent;}
};

SnowFrog.prototype._writeNewFiles = function (obj) {
  obj.webFiles.forEach(function(file) {
    fs.readFile(file, "utf-8", function (err, data) {
    fs.writeFile(path.normalize(snowObj.path + 'new' + file),
      (array[0].toString + data + array[1]), "utf-8", function () {
        console.log("Created New File: new" + file);
      });
    }.bind(this));
  });
};


module.exports = SnowFrog;
