var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers.js');
var urlParser = require('url');

exports.handleRequest = function (request, response) {
  if(request.method === 'GET') {
    if(request.url === '/' || request.url === 'style.css') {
      helpers.handleStaticFiles(request, response);
    }
    else {
      helpers.handleGet(request,response);
    }
  }  
  else if(request.method === 'POST') {    
    helpers.handlePost(request,function(data) {
      data = data.slice(4);
      archive.isUrlInList(data, function(inList) {
        if(!inList) {
          archive.addUrlToList(data);
          helpers.redirect(response, '/loading.html');
        } else {
          archive.isUrlArchived(data, function(checkArchives) {
            if(checkArchives) {
              helpers.handleStaticFiles;
            } else {
              helpers.redirect(response, '/loading.html')
            }
          })
        }
      });
    });
  }
};

