'use strict';

var readline = require('readline');
var fs = require('fs');
var rfOptions = {encoding: 'utf-8'};
var _ = require('lodash');
var path = require('path');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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
var SnowFrog = function (directory, indexFile, destPath, cb) {
  var obj = this._buildFrogObject(directory, indexFile);
  // obj._cb = cb;
  this._listWebFiles(obj);
};

SnowFrog.prototype._finish = function (obj) {
  console.log("Finishing....%>");
  if (obj._cb) {obj._cb(null, obj);}
  process.exit(0);
};

SnowFrog.prototype._buildFrogObject = function (directory, indexFile, destPath) {
  var template = indexFile;
  var dr = path.resolve(directory);
  if (!indexFile) {
    template = "layout.html";
  }
  console.log("Template file is: " + template);
  var destination = destPath;
  if (!destPath) {
    destination = '/sfsite/';
  }
  console.log("Frogging into directory: " + destination);
  var obj = {path: dr, template: template, dest: destination};
  return obj;
};

SnowFrog.prototype._listWebFiles = function (obj) {
  console.log("Identifying web files ##");
  fs.readdir(obj.path, function (err, files) {
    if (err) {return obj._cb(err);}
    var webFiles = [];
    var sSheets = [];
    var css = false;
    files.map(function (fileName) {
      if (fileName !== obj.template && fileName.slice(-5) === ".html") {
          webFiles.push(fileName);
          console.log("%> ");
      }
      if (fileName.slice(-4) === '.css') {
        obj.stylesheet.push(fileName);
        css = true;
      }
    }.bind(this));
    if (css === false) {
      console.log("SnowFrog did not locate a .css stylesheet " +
                  "in the source directory.  ##");
    }
    obj.webFiles = webFiles;
    this._extractTemplate(obj);
  }.bind(this));
};

SnowFrog.prototype._locateStylesheet = function (obj, path) {
  fs.readdir(path.resolve(obj.path, path), function (err, files) {
    if (err) {return obj._cb(err);}
    files.forEach(function (fileName) {
      if (fileName.slice(-4) === '.css') {
        obj.stylesheet = fileName;
      }
    }, this);
  }.bind(this));
};

SnowFrog.prototype._extractTemplate = function (obj) {
  console.log("Beginning template extraction ##");
  fs.readFile(obj.template, "utf-8", function (err, content) {
    if (err) {return obj._cb(err);}
    var layoutArray = content.split("{{CONTENT}}");
    obj.templateData = layoutArray;
    console.log("%> Template extracted ##");
    this._getOldContent(obj);
  }.bind(this));
};

SnowFrog.prototype._getOldContent = function (obj) {
  var counter = 0;
  obj.webContent = [];
  obj.webFiles.forEach(function (file, index) {
    fs.readFile(file, "utf-8", function (err, data) {
      if (err) {return obj._cb(err);}
      console.log("Extracted unique content from " + file);
      obj.webContent[index] = data;
      console.log("%> ");
      counter += 1;
      if (counter === obj.webFiles.length) {
        this._frogTheNewPath(obj);
      }
  }.bind(this));
  }, this);
};

SnowFrog.prototype._frogTheNewPath = function (obj) {
  fs.mkdir(path.resolve(obj.path + '/' + obj.dest + '/'), function (err) {
    if (err) {throw err;}
    this._writeNewFiles(obj);
  }.bind(this));
};

SnowFrog.prototype._writeNewFiles = function (obj) {
  console.log("%> Beginning to write new files ##");
  var counter = 0;
  obj.webFiles.forEach(function (file, index) {
    fs.writeFile(path.normalize(obj.path +
      '/' + obj.dest + '/' + 'frogged_' + file),
    (obj.templateData[0] + obj.webContent[index] +
      obj.templateData[1]), "utf-8", function (err) {
      if (err) {return obj._cb(err);}
        console.log("%> Created New File: frogged_" + file + " ##");
        counter += 1;
        if (counter === obj.webFiles.length) {
          this._finish(obj);
        }
    }.bind(this));
  }, this);
};

SnowFrog.prototype._includeCSS = function (obj) {
  if (obj.stylesheet) {
    var counter = 0;
    obj.stylesheet.forEach(function (file) {
      fs.readFile(file, "utf-8", function (err, data) {
        fs.writeFile(path.normalize(obj.path +
          '/' + obj.dest + '/' + 'frogged_' + file),data, function (err) {
            console.log("%> Copied .css stylesheet: frogged_" + file + " ##");
            counter += 1;
            if (counter === obj.stylesheet.length) {
              this._finish(obj);
            }
        }.bind(this));
      }.bind(this));
    },this);
  }
  else {
    this.finishfilele.exports = SnowFrog;
  }
};
