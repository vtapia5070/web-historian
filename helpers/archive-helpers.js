var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var helpers = require('../web/http-helpers.js');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(error, data) {
    data = data.toString().split('\n');
    callback(data);
  });
};

exports.isUrlInList = function(url, callback){
  exports.readListOfUrls(function(contents) {
    if(url) {
      callback(contents);
    }
  });
};

exports.addUrlToList = function(url){
  //url=google.com
  // /google.com
  // var pathName = '/' + url.slice(4);
  //append 
  fs.appendFile(exports.paths.list, url, '\n', function(error) {
    if(error) {
      console.log("There is a error" + error);
    }
  });
  //add file
  var writeFile = fs.openSync(exports.paths.list + pathName, "wx");
  fs.writeSync(writeFile, pathName);
  fs.closeSync(exports.paths.list + pathName);
  //add to sites.txt
};

exports.isUrlArchived = function(url, callback){
  fs.readdir(exports.paths.archivedSites, function(error, data) {
    callback(_.contains(data, url));
  });
};

exports.downloadUrls = function(url){
  http.get('http://' + url, function(response) {
    helpers.handlePost(response, function(data) {
      fs.writeFile(path.join(exports.paths.archivedSites, url), data);
    });
  });
};
