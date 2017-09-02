var http = require("http");

var catchFirstUrl = 'http://http://checkin.longruan.com/V2/HBBX/Default.aspx';

function start() {
  function onRequest(request, response) {
    // console.log("Request received.");
    response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    response.write("Hello World");
    response.end();
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

exports.start = start;