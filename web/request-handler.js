/*
* need to pass in actual data to the archives file using cron
*/

var helpers = require('./http-helpers.js');
var fs = require('fs');

exports.handleRequest = function (req, res) {
  if (req.method === "GET") {
    if (req.url === '/' || '/styles.css') {
      helpers.handleStaticFiles(req, res);
    } else {
      fs.readFile(archive.paths.archivedSites + req.url, function (err, data) {
        if (err) {
          res.writeHead(404);
          res.end(err);        
        } else {
          res.writeHead(200, helpers.headers);
          res.end(data);
        }
      });
    }
  }
  if (req.method === "POST") {
    console.log("this is post data");
    helpers.collectData(req, res);
  }
};