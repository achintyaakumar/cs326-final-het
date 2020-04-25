let http = require('http');
let url = require('url');
const express = require('express')
const app = express();
let fakeData = require('./fakeData.js');

export class Server {
    private db;

    private server = express();
    private port = 8080;
    private router = express.Router()

    constructor(db){
        this.db = db;
        
        this.router.use((request, response, next) => {
			response.header('Content-Type','application/json');
			response.header('Access-Control-Allow-Origin', '*');
			response.header('Access-Control-Allow-Headers', '*');
			next();
        });
        this.server.use('/', express.static('./scripts'));
        this.server.use(express.json());
    }
} 