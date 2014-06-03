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
  this._startExtracting(snowObj, this._finishAll(snowObj));
};

SnowFrog.prototype._startExtracting = function (snowObj, fn) {
  this._webList(snowObj);
  this._extractTemplate(snowObj.template);
  this._writeANewFile(snowObj.webFiles[0], snowObj.templateData);
  fn(snowObj);
  this._findDirectory(directory, indexFile);
  var sourceObj = this._findDirectory(directory, indexFile);
  this._webList(sourceObj);
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

SnowFrog.prototype._webList = function (sourceDir) {
  fs.readdir(sourceDir.path, function (err, files) {
    var webFiles = [];
    files.map(function (fileName) {
      if (fileName.slice(-5) === ".html") {
        webFiles.push(fileName);
      }
    });
  this._proceed(this._extractTemplate(indexFile));
  });
};

SnowFrog.prototype._findCommon = function (sourceDir) {
  var filesList = sourceDir.webFiles;
  var commonText;

  var checkConstants = function (err, fileText) {
    var contentString = fileText;

      if (!commonText) {
        commonText = fileText.split(" ");
        // console.log(commonText);
      }
      if (_.difference(fileText.split(" "), commonText).length === 0) {
        commonText = fileText.split(" ");
        // console.log(commonText);
      }
      else {
        commonText = _.intersection(commonText, fileText.split(" "));
        // console.log(commonText);
      }
      console.log("Common text is " + commonText);
  };

  filesList.forEach(function (fileToCompare) {
    console.log("Reading file " + fileToCompare);
    fs.readFile(fileToCompare, "utf-8", function (err, data) {
      checkConstants(err, data);
    });
  });
};

SnowFrog.prototype._extractTemplate = function (layoutFile) {
  fs.readFile(layoutFile, "utf-8", function (err, content) {
    var layoutArray = content.split("{{CONTENT}}");
    console.log(layoutArray);
    return layoutArray;
  });
};

SnowFrog.prototype._getOldContent = function (file) {
  var oldContent;
  fs.readFile(file, "utf-8", function (err, data) {
    oldContent = data;
    console.log("Extracting unique content from " + file);
  });
  if (oldContent) {return oldContent;}
};

SnowFrog.prototype._writeANewFile = function (file, array) {
  fs.readFile(file, "utf-8", function (err, data) {
    fs.writeFile(path.normalize(directory + 'new' + file),
      (array[0].toString + data + array[1]), "utf-8", function () {
        console.log("Created New File");
      });
  });
};


module.exports = SnowFrog;
