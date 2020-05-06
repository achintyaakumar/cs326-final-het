
import express from 'express';
let http = require('http');
let url = require('url');
const app = express();
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import Database from './server/mongodb';
import API from './server/api';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// @ts-ignore
app.use(cookieParser());

let mediaFileData: string | any[] = [];
console.log("directory",__dirname)
fs.readFile(__dirname+'/server/media.json', (err, data:any) => {
    if (err) throw err;
    let hold = JSON.parse(data);
    mediaFileData = hold
});
if (Database.isConnected()) {
    console.log("DB already connected");
  } else {
    console.log("DB not Connected, connecting now...");
    Database.loadDB(function() {
    })
  }
var checkSignIn = function (req:any,res:any, next:any){
   if(req.session.user){
       let userCred = req.session.user;
       API.auth(userCred,function(err: any,result: { login: any; }){
           if(err) res.send({isError:true, data:'Authentication failed please try logging in again'});

           if(result.login){
            next(); 
            return
           }else{
            res.send({isError:true, data:'Authentication failed please try logging in again'});
           }
       })
           //If session exists, proceed to page
   } else {
    // res.sendFile('client/login.html', {root: __dirname }); 
    res.status(401);
    res.send({isError:true,message:'Authentication failed please try logging in again'});
}
}

var checkSignInFrontEnd = function (req:any,res:any, next:any){
  if(req.session.user) next() 
  else res.redirect("/login")
}



// @ts-ignore
app.use(session({
  secret: "reallystrongpassword",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.get('/login',  (req, res) => {
    res.sendFile(path.resolve('./client/login.html'))
});

app.post('/api/signup', (req:any , res:any) => {
    let userDetails = req.body;
    let firstName = userDetails.firstName;
    let lastName = userDetails.lastName;
    let email = userDetails.email;
    let password = userDetails.password;
    if(email && password && lastName && firstName){   
           
        API.signUpUser(userDetails,function(err: any,result: any){
            if(err) res.send({isError:true,message:err})
            let user = {email:email,password:password}
            req.session.user = user;
            req.session.save();
            res.send({isError:false,data:"Added successfully"})
        })
    }else{
        res.send({isError:true,data:"Email, password, lastName, firstName are mendatory"})
    }
})

app.get('/ping', function(req:any,res:any) {
    res.send("working")
})

app.use("/", express.static(__dirname + "./../client/"));
let port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`app working at ${port}`));

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });