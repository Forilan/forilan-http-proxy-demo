var http = require("http");
var proxy = require("forilan-http-proxy");

var httpServer = {};
var http_port = 80;

httpServer = http.createServer(function (req, res) {

    var host = "www.baidu.com";
    proxy(host, req, res, {
        proxyErrorHandler: function (err, res, next) {
            console.log("proxyErrorHandler:" + err);
        },
        proxyReqOptDecorator: function (proxyReqOpts, srcReq) {
            console.log("proxyReqOptDecorator");
            return proxyReqOpts;
        },

        proxyReqBodyDecorator: function (bodyContent, srcReq) {
            console.log("proxyReqBodyDecorator");
            return bodyContent;
        },
        proxyReqPathResolver: function (req) {
            console.log("proxyReqPathResolver");
            return req.url;
        },
        userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
            console.log("userResHeaderDecorator");
            return headers;
        },
        userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
            console.log("userResDecorator");
            return proxyResData;
        }
    });
});
httpServer.listen(http_port);
console.log("Http listen at port: ", http_port);