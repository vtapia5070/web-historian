var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.handleStaticFiles = function(req, res){
  var url = req.url;
  var content;
  if (req.url === '/') {
    url = "/public/index.html";
    content = {"Content-Type" : "text/html"};
  }
  if (req.url === '/styles.css') {
    url = "/public/styles.css";
    content = {"Content-Type": "text/css"};
  }
  var pathName = path.join(__dirname, url);
  fs.readFile(pathName, function (err, data) {
    if (err) {
      console.log('this is an error', err);
      res.writeHead(404);
      res.end(err);
    }
    else {
      res.writeHead(200, content);
      res.end(data);
    }
  });
};

var redirect = function(response, destination) {
  var path = __dirname + destination;
  console.log("this is where we redirect", path);
  fs.readFile(path, function (err, data) {
    if (err) {
      console.log("redirecting error is ", err);
    } else {
      console.log("redirecting to :", destination);
      response.writeHead(302, {Location: destination});
      response.end(data);
    }
  }); 
};

var manageArchive = function(url, response, request){
  console.log("this is url in manageArchive", url);
  var body = url.slice(4);
  console.log("this is url body after slice", body);
  archive.isUrlInList(body, function(result){
    if (!result) {
      console.log("url is not in list");
      storeUrl(body, response, request);
    } else {
      console.log("url is in list, this is result", result);
      archive.isUrlArchived(url, function(result) {
        if (!result) {
          storeUrl(body, response, request);
        } else {
          redirect(response, '/'+ url);
          console.log("url is archived, send get req");
        }
      });
    }
  }); 
};

var storeUrl = function(url, response, request){
  console.log("called storeURL and passed in:", url);
  console.log("path inside of storeURL",__dirname);
  var loc = '/public/loading.html';
  archive.addUrlToList(url, function(result){
    console.log("The result of addingUrlToList is:", result);
    redirect(response, loc);
  });  
};

exports.collectData = function (req, res) {
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
  });
  req.on('end', function() {
    manageArchive(body, res, req);
  });
};
