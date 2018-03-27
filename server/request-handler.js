/*************************************************************

You should implement your req handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
//require url node package
var url = require('url');
//initialize example data
var exampleData = [{
  username: 'fred', 
  text: 'hey there', 
  roomname: 'lobby'
}];

requestHandler = function(req, res) {
  var headers = defaultCorsHeaders;
  var parsedUrl = url.parse(req.url);
  headers['Content-Type'] = 'text/plain';
  // if url is classes/messages and method is GET, then handle get request
  if (parsedUrl.pathname === '/classes/messages' && req.method === 'GET') {
    var statusCode = 200;
    // declare a response object, a template literal that has results, set results equal to example data
    var response = {
      results: exampleData
    };
    // declare JSON response variable, set equal to JSON stringify results
    var JSONResponse = JSON.stringify(response);
    // response with headers, pass in status code and headers
    res.writeHead(statusCode, headers);
    // pass in stringified data into response.end()
    res.end(JSONResponse);
  }
  // if url is classes/messages and method is POST, then handle post request
  if (parsedUrl.pathname === '/classes/messages' && req.method === 'POST') {
    // set status code to 201, which means created
    var statusCode = 201;
    // handle adding data into exampleMessages
    exampleData.unshift(req._postData);
    // set response headers, passing in status code and headers
    res.writeHead(statusCode, headers);
    // end response
    res.end();
  }
  // if url is classes/messages and method is OPTIONS, then handle options request
  if (parsedUrl.pathname === '/classes/messages' && req.method === 'OPTIONS') {
    console.log('Our incomingMessage Instance: ', req);
  }
  
  
  console.log('Serving req type ' + req.method + ' for url ' + req.url);
};


var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
