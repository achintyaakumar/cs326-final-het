"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fakeData_1 = require("./fakeData");
var http = require('http');
var url = require('url');
var express = require('express');
var app = express();
var Server = /** @class */ (function () {
    function Server(db) {
        var _this = this;
        this.server = express();
        this.port = 8080;
        this.router = express.Router();
        this.db = db;
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        //serve static
        this.server.use('/', express.static('./scripts'));
        //parse as JSON
        this.server.use(express.json());
        //endpoint for API
        this.server.use('/scripts', this.router);
        //API routes
        this.router.post('/create', this.registerHandler.bind(this));
        this.router.post('/login', this.loginHandler.bind(this));
        this.router.post('/result', this.resultHandler.bind(this));
        this.router.post('/watchlist', this.watchlistHandler.bind(this));
        //fall through handler if nothing matches
        this.router.post('*', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.send(JSON.stringify({ "result": "command-not-found" }));
                return [2 /*return*/];
            });
        }); });
    }

    //  CRUD handlers


    Server.prototype.createWatchListHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, WatchListObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.params['username'];
                        console.log('username: ' + username);
                        WatchListObj = request.body.WatchListObj;
                        console.log(WatchListObj);
                        return [4 /*yield*/, this.createWatchList(username, WatchListObj, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.readWatchListHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, category, label;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.params['username'];
                        category = request.query.category;
                        label = request.query.label;
                        console.log('------ username, category, label: ' + username + ", " + category + " , " + label);
                        return [4 /*yield*/, this.readWatchList(username, category, label, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.readAllWatchListHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.params['username'];
                        return [4 /*yield*/, this.readAllWatchLists(username, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.updateWatchListHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, WatchListObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.params['username'];
                        WatchListObj = request.body.WatchListObj;
                        return [4 /*yield*/, this.updateWatchList(username, WatchListObj, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.deleteWatchListHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var WatchListObj, username;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("in deleteWatchListHandler");
                        // WatchListObj = {//make changes here
                       

                        //         }]//make changes here 
                        // };
                        username = request.param['username'];
                        console.log('------ username, WatchList: ' + username + ', ' + WatchListObj);
                        return [4 /*yield*/, this.deleteWatchList(username, WatchListObj, response)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };

    // CRUD functions 
    Server.prototype.createWatchList = function (username, WatchListObj, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("creating WatchList...");
                        return [4 /*yield*/, this.theDatabase.put(username, WatchListObj)];
                    case 1:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'created',
                            'username': username,
                            'WatchListObj': WatchListObj
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.readWatchList = function (username, category, label, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("reading WatchList...");
                //await this.theDatabase.get(username, category, label);
                response.write(JSON.stringify({ 'result': 'read',
                    'username': username,
                    'category': category,
                    'label': label,
                    'title': faker.random.word() + " WatchList",
                    'notes': faker.random.words() + " WatchList",
                    'bookmarks': faker.date.recent() + " - " + faker.random.words() + ", " + faker.date.recent() + " - " + faker.random.words()
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.readAllWatchLists = function (username, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userObj, labelWatchLists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("\n\nreading all WatchLists...");
                        return [4 /*yield*/, this.theDatabase.getAll(username)];
                    case 1:
                        userObj = _a.sent();
                        labelWatchLists = this.parseLabelWatchLists(userObj);
                        response.write(JSON.stringify({ 'result': 'read all WatchLists',
                            'username': username,
                            'WatchListData': labelWatchLists
                        }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    Server.prototype.parseLabelWatchLists = function (WatchListObj) {
        console.log("parsing usr obj");
        var labelWatchLists = WatchListObj.categories[0].labels;
        return labelWatchLists;
    };
    Server.prototype.updateWatchList = function (username, WatchListObj, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("updating WatchList...");
                //await this.theDatabase.put(username, WatchListObj);
                response.write(JSON.stringify({
                    'result': 'updated',
                    'username': username,
                    'updatedWatchListData': WatchListObj
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    Server.prototype.deleteWatchList = function (username, WatchListObj, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("deleting WatchList");
                // await this.theDatabase.del(WatchListObj);
                response.write(JSON.stringify({ 'result': 'deleted',
                    'username': username,
                    'WatchList': WatchListObj
                }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    return Server;


    // Server.prototype.registerHandler = function (request, response) {
    //     return __awaiter(this, void 0, void 0, function () {
    //         return __generator(this, function (_a) {
    //             response.write(JSON.stringify({ success: true }));
    //             response.end();
    //             return [2 /*return*/];
    //         });
    //     });
    // };
    // Server.prototype.loginHandler = function (request, response) {
    //     return __awaiter(this, void 0, void 0, function () {
    //         return __generator(this, function (_a) {
    //             response.write(JSON.stringify({ jwt: "JSON Web Token", success: true }));
    //             response.end();
    //             return [2 /*return*/];
    //         });
    //     });
    // };
    // Server.prototype.resultHandler = function (request, response) {
    //     return __awaiter(this, void 0, void 0, function () {
    //         return __generator(this, function (_a) {
    //             switch (_a.label) {
    //                 case 0: return [4 /*yield*/, fakeData_1["default"].generateMedia(request.body, response)];
    //                 case 1:
    //                     _a.sent();
    //                     return [2 /*return*/];
    //             }
    //         });
    //     });
    // };
    // Server.prototype.watchlistHandler = function (request, response) {
    //     return __awaiter(this, void 0, void 0, function () {
    //         return __generator(this, function (_a) {
    //             switch (_a.label) {
    //                 case 0: return [4, fakeData_1["default"].generateWatchlist(request.body, response)];
    //                 case 1:
    //                     _a.sent();
    //                     return [2];
    //             }
    //         });
    //     });
    // };
    //return Server;
}());
exports.Server = Server;
