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
var Database = /** @class */ (function () {
    function Database(collectionName) {
        var _this = this;
        this.MongoClient = require('mongodb').MongoClient;
        this.uri = process.env.uri;
        this.dbName = "cs326-final-het";
        //
        var secrets, password;
        if (!process.env.PASSWORD) {
            secrets = require('./secrets.json');
            password = secrets.password;
        }
        else {
            password = process.env.PASSWORD;
        }

        this.collectionName = collectionName;
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
        
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.client.connect()["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2];
                }
            });
        }); })();
    }
    // Open up a connection to the client.
        // The connection is asynchronous, but we can't call await directly
        // in the constructor, which cannot be async. So, we use "IIFE". Explanation below.
        /* from https://anthonychu.ca/post/async-await-typescript-nodejs/
    
          Async/Await and the Async IIFE
    
          The await keyword can only be used inside of a function
          marked with the async keyword. [...] One way to do this is
          with an "async IIFE" (immediately invoked function
          expression)...
    
           (async () => {
           // code goes here
           })();
    
        */
       //PUT function
    Database.prototype.put = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        watch = value.category;
                        label = value.label;
                        insertvalue = {
                            
                        };
                        console.log("\nput: key = " + key + ", label: " + label);
                        return [4 /*yield*/, collection.updateOne({ 'key': key,
                                'categories.0.categoryName': category,
                                'categories.0.labels': { $elemMatch: { "labelName": label } } }, { $push: { 'categories.0.labels.$.videos': insertvalue } }, { 'upsert': true })];
                    case 1:
                        result = _a.sent();
                        console.log("\nresult = " + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    //                     console.log("put: key = " + key + ", value = " + value);
    //                     return [4, collection.updateOne({ 'name': key }, { $set: { 'value': value } }, { 'upsert': true })];
    //                 case 1:
    //                     result = _a.sent();
    //                     console.log("result = " + result);
    //                     return [2];
    //             }
    //         });
    //     });
    // };
    
    Database.prototype.getAll = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("getAll: key = " + username);
                        return [4 /*yield*/, collection.findOne({ 'email': username })];
                    case 1:
                        result = _a.sent();
                        console.log("\ngetAll: returned " + JSON.stringify(result));
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };

    Database.prototype.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("getAll: key = " + key); // change
                        return [4, collection.findOne({ 'name': key })];
                    case 1:
                        result = _a.sent();
                        console.log("getAll: returned " + JSON.stringify(result)); //change
                        if (result) {
                            return [2, result.value];
                        }
                        else {
                            return [2, null];
                        }
                        return [2];
                }
            });
        });
    };
    
    Database.prototype.del = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collectionName);
                        console.log("delete: key = " + key);
                        return [4, collection.deleteOne({ 'name': key })];
                    case 1:
                        result = _a.sent();
                        console.log("result = " + result);
                        return [2];
                }
            });
        });
    };
    
    Database.prototype.isFound = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("isFound: key = " + key);
                        return [4, this.get(key)];
                    case 1:
                        v = _a.sent();
                        console.log("is found result = " + v);
                        if (v === null) {
                            return [2, false];
                        }
                        else {
                            return [2, true];
                        }
                        return [2];
                }
            });
        });
    };
    return Database;
}());
exports.Database = Database;
