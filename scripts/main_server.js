'use strict';
exports.__esModule = true;
var mongo_database_1 = require("./mongodb");
var myServer_1 = require("./server");
var theDatabase = new mongo_database_1.Database('manan');
var theServer = new myServer_1.server(theDatabase);
theServer.listen(process.env.PORT || 8080);