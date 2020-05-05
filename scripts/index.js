const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const fs = require('fs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

let mediaFileData = [];
fs.readFile('./server/media.json', (err, data) => {
    if (err) throw err;
    let hold = JSON.parse(data);
    mediaFileData = hold
});

var checkSignIn = function (req, res, next){
   if(req.session.user){
       next();//If session exists, then it proceed to page
   } else {
    res.sendFile('client/login.html', {root: __dirname }); 
    }
}

app.use(session({
  secret: "reallystrongestpassword",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

var Users = [
    'admin',
];

app.get('/login',  (req, res) => res.sendFile('login.html'));
app.get('/home',checkSignIn , (req, res) => res.redirect('index.html'));
app.get('/watchlist', checkSignIn, (req, res) => res.send('protected_page'));
app.get('/getMedia', checkSignIn, (req, res) => res.send(mediaFileData));

app.get('/api/getMediaData', checkSignIn, function(req, res){  
      
    let reqData = req.query;
    let name = reqData.name;
    let foundedRecord;
    if(name){
        for (let i = 0; i < mediaFileData.length; i++) {
            const element = mediaFileData[i];
            if(name == element.name){
                foundedRecord = element;
                break;
            }
        }
        if(!foundedRecord){
            res.send({isError:true,message:'No record found'});
            return
        }
        res.send({isError:false,data:foundedRecord});
    }else{

    }

 });