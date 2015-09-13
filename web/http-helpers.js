// var path = require('path');
// var fs = require('fs');
// var archive = require('../helpers/archive-helpers');

// exports.headers = headers = {
//   "access-control-allow-origin": "*",
//   "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//   "access-control-allow-headers": "content-type, accept",
//   "access-control-max-age": 10, // Seconds.
//   'Content-Type': 'text/html'
// };

// //GET static files
// exports.handleStaticFiles = function(request, response){
//   var filePath = request.url;
//   if(filePath === '/') {
//     filePath = '/index.html';
//   }
//   var headerIs = path.extname(filePath);
//   if(headerIs === '.js') {
//     headers['Content-Type'] = 'text/javascript';
//   } else if(headerIs ==='.css') {
//     headers['Content-Type'] = 'text/css';
//   }  
//   fs.readFile(__dirname + '/public' + filePath, function(error, contents) {
//     if (error) {
//       exports.sendResponse(response, "Not found", 404);
//     } else {
//       exports.sendResponse(response, contents);
//     }    
//   });
// };

// exports.sendResponse = function(response, data, statusCode) {
//   statusCode = statusCode || 200;
//   response.writeHead(statusCode, exports.headers); 
//   response.end(data);
//   return response;   
// };

// // exports.handleGet = function(request, response) {
// //   request.on('error', function () {
// //     response.writeHead(404);
// //     response.end();
// //   });
// //   var sitesPath = path.join(__dirname, '../archives/sites.txt');
// //   var txtFile = fs.createReadStream(sitesPath);
// //   txtFile.pipe(response);
// // };

// exports.handlePost = function(request, callback){
//     //get data chunks here
//     var body = '';
//     request.on('data', function (chunk) {
//       body += chunk;
//     });
//     request.on('end', function(){
//       //call helper func to archive
//       callback(body);
//     });
//     //exports.sendResponse(response, data);
// };

// exports.redirect = function(response, destination) {
//   console.log("redirecting to :", destination);
//   response.writeHead(302, {loc: destination});
//   response.end();
// }

