var http = require('http');

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var serve = serveStatic("./server");

var server = http.createServer(function (req, res) {
    var done = finalhandler(req, res)
    serve(req, res, done)
});

//server.listen(44544);
module.exports = server;