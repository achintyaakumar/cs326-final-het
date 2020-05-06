"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var body_parser_1 = __importDefault(require("body-parser"));
var express_session_1 = __importDefault(require("express-session"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var fs_1 = __importDefault(require("fs"));
var database_1 = __importDefault(require("./server/database"));
var path_1 = __importDefault(require("path"));
var api_1 = __importDefault(require("./server/api"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// @ts-ignore
app.use(cookie_parser_1.default());
var mediaFileData = [];
console.log("directory", __dirname);
fs_1.default.readFile(__dirname + '/server/media.json', function (err, data) {
    if (err)
        throw err;
    var hold = JSON.parse(data);
    mediaFileData = hold;
});
if (database_1.default.isConnected()) {
    console.log("DB already connected");
}
else {
    console.log("DB not Connected, connecting now...");
    database_1.default.loadDB(function () {
    });
}
var checkSignIn = function (req, res, next) {
    if (req.session.user) {
        var userCred = req.session.user;
        api_1.default.auth(userCred, function (err, result) {
            if (err)
                res.send({ isError: true, data: 'Authentication failed please try logging in again' });
            if (result.login) {
                next();
                return;
            }
            else {
                res.send({ isError: true, data: 'Authentication failed please try logging in again' });
            }
        });
        //If session exists, proceed to page
    }
    else {
        // res.sendFile('client/login.html', {root: __dirname }); 
        res.status(401);
        res.send({ isError: true, message: 'Authentication failed please try logging in again' });
    }
};
var checkSignInFrontEnd = function (req, res, next) {
    if (req.session.user)
        next();
    else
        res.redirect("/login");
};
// @ts-ignore
app.use(express_session_1.default({
    secret: "reallystrongestpassword",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.get('/login', function (req, res) {
    res.sendFile(path_1.default.resolve('./client/login.html'));
});
app.post('/api/signup', function (req, res) {
    var userDetails = req.body;
    var firstName = userDetails.firstName;
    var lastName = userDetails.lastName;
    var email = userDetails.email;
    var password = userDetails.password;
    if (email && password && lastName && firstName) {
        api_1.default.signUpUser(userDetails, function (err, result) {
            if (err)
                res.send({ isError: true, message: err });
            var user = { email: email, password: password };
            req.session.user = user;
            req.session.save();
            res.send({ isError: false, data: "Added successfully" });
        });
    }
    else {
        res.send({ isError: true, data: "Email, password, lastName, firstName are mendatory" });
    }
});
app.get('/home', checkSignIn, function (req, res) { return res.redirect('index.html'); });
app.get('/', checkSignInFrontEnd, function (req, res) { return res.redirect('index.html'); });
app.get('/watchlist', checkSignIn, function (req, res) { return res.redirect('watchlist.html'); });
app.get('/api/watchlist', checkSignIn, function (req, res) {
    var userDetails = req.session.user;
    api_1.default.getWatchlist(userDetails, function (err, result) {
        console.log("wachlist", result);
        if (err)
            res.send({ isError: true, message: err });
        res.send({ isError: false, data: result });
    });
});
app.post('/api/AddInwatchlist', checkSignIn, function (req, res) {
    var name = req.body.name;
    var foundedRecord;
    if (name) {
        for (var i = 0; i < mediaFileData.length; i++) {
            var element = mediaFileData[i];
            if (name == element.name) {
                foundedRecord = element;
                break;
            }
        }
        if (!foundedRecord) {
            res.send({ isError: true, message: 'No wishlist found' });
            return;
        }
        api_1.default.addInWishlist(foundedRecord, req.session.user, function (err, result) {
            if (err)
                res.send({ isError: true, message: err });
            res.send({ isError: false, data: result });
        });
    }
    else {
        res.send({ isError: true, message: 'empty media name' });
    }
});
app.get('/getMedia', checkSignIn, function (req, res) { return res.send(mediaFileData); });
app.get('/api/getMediaData', checkSignIn, function (req, res) {
    var reqData = req.query;
    var name = reqData.name;
    var foundedRecord;
    if (name) {
        for (var i = 0; i < mediaFileData.length; i++) {
            var element = mediaFileData[i];
            if (name == element.name) {
                foundedRecord = element;
                break;
            }
        }
        if (!foundedRecord) {
            res.send({ isError: true, message: 'No record found' });
            return;
        }
        res.send({ isError: false, data: foundedRecord });
    }
    else {
    }
});
app.post('/api/login', function (req, res) {
    var body = req.body;
    if (!body.email || !body.password) {
        res.send({ isError: true, message: 'Please provide email and password' });
    }
    else {
        var userCred = body;
        api_1.default.auth(userCred, function (err, result) {
            if (err)
                res.send({ isError: true, data: 'Authentication failed please try logging in again' });
            if (result.login) {
                var user = { email: body.email, password: body.password };
                req.session.user = user;
                req.session.save();
                res.send({ isError: false });
                return;
            }
            else {
                res.send({ isError: true, data: 'Incorrect email or password' });
            }
        });
    }
});
app.get('/logout', function (req, res) {
    req.session.destroy(function () {
        console.log("user logged out.");
    });
    res.sendFile('client/login.html', { root: __dirname });
});
app.get('/ping', function (req, res) {
    res.send("working");
});
app.use("/", express_1.default.static(__dirname + "./../client/"));
var port = process.env.PORT || 3000;
app.listen(port, function () { return console.log("app working at " + port); });
process
    .on('unhandledRejection', function (reason, p) {
    console.error(reason, 'Unhandled Rejection at Promise', p);
})
    .on('uncaughtException', function (err) {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});
