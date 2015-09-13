/*
we store the url in files that contain a text of the url and add to the text file the 
text of the url
-when we download/retrieve that stored ingo and sent it in a get req response, 
will the buffer string automatically created that file?
-or do we have to save the data that's recieved in the post request to render that
same info?
*/
var http = require("http");
var path = require('path');
var archive = require('../helpers/archive-helpers');
//var helpers = require('./http-helpers.js');
var urlParser = require('url');
var fs = require('fs');
//console.log("PATH TO REQUEST HANDLER", __dirname);
exports.headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

var postURL = [];

var handleStatic = function(req, res){
  var url = "/public/index.html";
  var content;
  if (req.url === '/') {
    url = "/public/index.html";
    content = {"Content-Type" : "text/html"};
  }
  if (req.url === '/styles.css') {
    url = "/public/styles.css";
    content = {"Content-Type": "text/css"};
  }
  else {
    content = exports.headers;
  }
  var pathName = path.join(__dirname, url);
  //console.log("this is pathName", pathName);
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
//create function to check if url is in list

var manageArchive = function(url, response){
  //test
  console.log("this is url in manageArchive", url);
  var body = url.slice(4);
  console.log("this is url body after slice", body);
  //check if url is in list
  archive.isUrlInList(body, function(result){
    if (!result) {
      console.log("url is not in list");
      storeUrl(body, response);
    } else {
      console.log("url is in list, this is result", result);
      archive.isUrlArchived(url, function(result) {
        if (!result) {
          storeUrl(body, response);
        } else {
          console.log("url is archived, send get req");
          //if true- http get req to send data or url page back (use download url func?)
        }
      });
    }
  }); 
};
var storeUrl = function(url, response){
  console.log("called storeURL and passed in:", url);
  //redirect to loading html
  console.log("path inside of storeURL",__dirname);
  var loc = path.join(__dirname, '/public/loading.html');
  fs.readFile(loc, function(err, data){
    if (err) {
      console.log("err redirecting is", err);
    } else {
      response.writeHead(200, exports.headers);
      response.end(data);
    }
  });
  //redirect(response, '/public/loading.html');
  // , function(response) {
  //   console.log("got response", response.statusCode);
  // }).on('error', function(e){
  //   console.log("got error", e.message);
  // });
  archive.addUrlToList(url, function(result){
    console.log("The result of addingUrlToList is:", result);
  });
};

// var redirect = function(response, destination) {
//   console.log("redirecting to :", destination);
//   response.writeHead(302, {loc: destination});
//   response.end();
// };

var collectData = function (req, res) {
  var cb = function (data, res){
    res.writeHead(200, exports.headers);
    res.end(data);
  };
  var body = '';
  req.on('data', function(chunk) {
    body += chunk;
    //we have access to data url=(data)
    //pass body into manageArchive
    manageArchive(body, res);
  });
  req.on('end', function(data) {
    //data is always undefined on 'end' so send response
    cb(data, res);
  });
};

exports.handleRequest = function (req, res) {
  //console.log("req.url", req.url);
  if (req.method === "GET") {
    if (req.url === '/' || '/styles.css') {
      handleStatic(req, res);
    }
  }
  if (req.method === "POST") {
    collectData(req, res);
  }
};