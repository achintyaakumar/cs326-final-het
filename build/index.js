"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// @ts-ignore
app.use(cookie_parser_1.default());
var mediaFileData = [];

app.get('/ping', function (req, res) {
    res.send("working");
});
app.use("/", express_1.default.static(__dirname + "./../client/"));
var port = 31232;
app.listen(port, function () { return console.log("app working at " + port); });
process
    .on('unhandledRejection', function (reason, p) {
    console.error(reason, 'Unhandled Rejection at Promise', p);
})
    .on('uncaughtException', function (err) {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});
