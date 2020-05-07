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
// console.log("directory",__dirname)
// fs.readFile(__dirname+'/server/media.json', (err, data:any) => {
//     if (err) throw err;
//     let hold = JSON.parse(data);
//     mediaFileData = hold
// });
// if (Database.isConnected()) {
//     console.log("DB already connected");
//   } else {
//     console.log("DB not Connected, connecting now...");
//     Database.loadDB(function() {
//     })
//   }
// var checkSignIn = function (req:any,res:any, next:any){
//    if(req.session.user){
//        let userCred = req.session.user;
//        API.auth(userCred,function(err: any,result: { login: any; }){
//            if(err) res.send({isError:true, data:'Authentication failed please try logging in again'});
//            if(result.login){
//             next(); 
//             return
//            }else{
//             res.send({isError:true, data:'Authentication failed please try logging in again'});
//            }
//        })
//            //If session exists, proceed to page
//    } else {
//     // res.sendFile('client/login.html', {root: __dirname }); 
//     res.status(401);
//     res.send({isError:true,message:'Authentication failed please try logging in again'});
// }
// }
// // @ts-ignore
// app.use(session({
//   secret: "reallystrongestpassword",
//   resave: false,
//   saveUninitialized: true,
//   cookie: { secure: false }
// }));
// app.get('/login',  (req, res) => {
//     res.sendFile(path.resolve('./client/login.html'))
// });
// app.post('/api/signup', (req:any , res:any) => {
//     let userDetails = req.body;
//     let firstName = userDetails.firstName;
//     let lastName = userDetails.lastName;
//     let email = userDetails.email;
//     let password = userDetails.password;
//     if(email && password && lastName && firstName){   
//         API.signUpUser(userDetails,function(err: any,result: any){
//             if(err) res.send({isError:true,message:err})
//             let user = {email:email,password:password}
//             req.session.user = user;
//             req.session.save();
//             res.send({isError:false,data:"Added successfully"})
//         })
//     }else{
//         res.send({isError:true,data:"Email, password, lastName, firstName are mendatory"})
//     }
// })
// app.get('/home', checkSignIn,(req:any, res:any) => res.redirect('index.html'));
// app.get('/', checkSignIn , (req: any, res: { redirect: (arg0: string) => any; }) => res.redirect('index.html'));
// app.get('/watchlist', checkSignIn , (req: any, res: any) => res.redirect('watchlist.html'));
// app.get('/api/watchlist', checkSignIn, (req: any, res: any) => {
//     let userDetails = req.session.user;
//     API.getWatchlist(userDetails,function(err: any,result: any){
//         console.log("wachlist",result);        
//         if(err) res.send({isError:true,message:err})
//         res.send({isError:false,data:result})
//     })
// });
// app.post('/api/AddInwatchlist', checkSignIn, (req:any, res:any) => {
//     let name = req.body.name;
//     let foundedRecord;
//     if(name){
//         for (let i = 0; i < mediaFileData.length; i++) {
//             const element = mediaFileData[i];
//             if(name == element.name){
//                 foundedRecord = element;
//                 break;
//             }
//         }
//         if(!foundedRecord){
//             res.send({isError:true,message:'No wishlist found'});
//             return
//         }
//         API.addInWishlist(foundedRecord,req.session.user,function(err: any,result: any){
//             if(err) res.send({isError:true,message:err})
//             res.send({isError:false,data:result})
//         })
//     }else{
//         res.send({isError:true,message:'empty media name'});
//     }
// });
// app.get('/getMedia', checkSignIn, (req: any, res:any ) => res.send(mediaFileData));
// app.get('/api/getMediaData', checkSignIn, function(req: { query: any; }, res: { send: (arg0: { isError: boolean; message?: string; data?: any; }) => void; }){  
//     let reqData = req.query;
//     let name = reqData.name;
//     let foundedRecord;
//     if(name){
//         for (let i = 0; i < mediaFileData.length; i++) {
//             const element = mediaFileData[i];
//             if(name == element.name){
//                 foundedRecord = element;
//                 break;
//             }
//         }
//         if(!foundedRecord){
//             res.send({isError:true,message:'No record found'});
//             return
//         }
//         res.send({isError:false,data:foundedRecord});
//     }else{
//     }
// });
// app.post('/api/login', function(req: any, res: any){
//     let body = req.body;    
//     if(!body.email || !body.password){
//        res.send({ isError: true, message:'Please provide email and password'  });
//     } else {
//         let userCred = body;
//         API.auth(userCred,function(err: any,result: { login: any; }){
//            if(err) res.send({isError:true, data:'Authentication failed please try logging in again'});
//            if(result.login){
//                 let user = {email:body.email,password:body.password}
//                 req.session.user = user;
//                 req.session.save();
//                 res.send({ isError: false });
//             return
//            }else{
//             res.send({isError:true, data:'Incorrect email or password'});
//            }
//        })
//     }
// });
// app.get('/logout', function(req:any, res:any){
//    req.session.destroy(function(){
//       console.log("user logged out.")
//    });
//    res.sendFile('client/login.html', {root: __dirname });
// });
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
