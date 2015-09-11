var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
//var _ = require('underscore');
//var swig  = require('swig');


exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': 'text/html'
};


//GET static files
exports.handleStaticFiles = function(request, response){ 
  var filePath = request.url;
  if(filePath === '/') {
    filePath = '/index.html';
  }
  var headerIs = path.extname(filePath);
  if(headerIs === '.js') {
    headers['Content-Type'] = 'text/javascript';
  } else if(headerIs ==='.css') {
    headers['Content-Type'] = 'text/css';
  }  
  fs.readFile(__dirname + '/public' + filePath, function(error, contents) {
    if (error) {
      exports.sendResponse(response, "Not found", 404);
      // response.writeHead(404, exports.headers); 
      // response.end();
      // console.log(response);
    } else {
      exports.sendResponse(response, contents);
      // response.writeHead(200, exports.headers); 
      // response.end(contents);
    }    
  });
};

exports.sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, exports.headers); 
  response.end(data);
  return response;   
};

exports.handleGet = function(request, response) {
  request.on('error', function () {
    response.writeHead(404);
    response.end();
  });
  var sitesPath = path.join(__dirname, '../archives/sites.txt');
  var txtFile = fs.createReadStream(sitesPath);
  txtFile.pipe(response);
};

exports.handlePost = function(request, callback){
 //get data chunks here
  //exports.sendResponse(request, response);
  var body = '';
  request.on('data', function (chunk) {
    body += chunk;
  });
  request.on('end', function(){
    //call helper func to archive
    callback(body);
  });
  // exports.sendResponse(request, response);
};

exports.redirect = function(response, destination) {
  response.writeHead(302, {loc: destination});
  response.end();
}
exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  // if(asset === '/index.html') {
  // //   swig.renderFile('/index.html', {
    
  // // });
  // }  
};

exports.checkArchive = function(request){
  
  //request.url
  //checking if url is archived
    //helper method
      //display page
    //if not archived 
      //archive it
      //display page
};



// As you progress, keep thinking about what helper functions you can put here!
