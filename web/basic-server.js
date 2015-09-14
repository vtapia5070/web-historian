var http = require("http");
var handler = require("./request-handler");
var initialize = require("./initialize.js");
var HTTPRequest = require('HTTPRequest');

initialize();

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(handler.handleRequest);

if (module.parent) {
  module.exports = server;
} else {
  server.listen(port, ip);
  console.log("Listening on http://" + ip + ":" + port);
}
