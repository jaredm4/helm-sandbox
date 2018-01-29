var http = require('http');
var File = require("fs");

var handleRequest = function(request, response) {
  console.log('Received request for URL: ' + request.url);
  response.writeHead(200);
  var inputContent = File.readFileSync("/var/secret/mysecret.txt", "utf-8").trim();
  response.write("Secret file: \n" + inputContent);
  response.write("\n\n");
  var inputContent = File.readFileSync("/var/config/myconfig.txt", "utf-8").trim();
  response.write("Config file: \n" + inputContent);
  response.write("\n\n");
  response.end('Hello World!');
};
var www = http.createServer(handleRequest);
www.listen(8080);
