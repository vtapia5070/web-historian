var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var handler = require("../web/request-handler.js");

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};
//for test
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, function(error, data) {
    data = data.toString().split('\n');
    if (callback) {
      callback(data);
    }
  });
};

exports.isUrlInList = function(url, callback){
  console.log("checking if url is in list");
  exports.readListOfUrls(function(contents) {
    var found = _.any(contents, function(site, url){
       return site.match(url);
    });
    callback(found);
  });
};

exports.addUrlToList = function(url, callback){
  var body = url;
  var pathName = '/'+body;
  console.log("the url is: ", body);
  // append file to archives/sites
  var archiveFile = fs.openSync(exports.paths.archivedSites + pathName, "wx");
  fs.writeSync(archiveFile, body, function(){
    if (err) {
      callback("error is:", err);
    } else {
      callback("file written!");
    }
  });
  fs.closeSync(archiveFile);
  //write and append text
  fs.appendFile(exports.paths.list, body, function(err) {
    if (err) {
      callback("ERROR is: ", err);
    }
    callback("file saved");
  });
};

exports.isUrlArchived = function(url, callback){
  console.log("checking if url is archived");
  var urlList = fs.readdir(exports.paths.archivedSites, function (err, results){
    if (!err) {
      console.log("checking url and list ", url, urlList);
      console.log(_.contains(urlList, url));
    }else {
      console.log("error is :", err);
    }
  });
};

exports.downloadUrls = function(url){
  http.get('http://' + url, function(response) {
    //send get req
    // helpers.handlePost(response, function(data) {
    fs.readFile(path.join(exports.paths.archivedSites, url), function(data){
      response.writeHead(200, handler.headers);
      response.end(data);
    });
  });
};
