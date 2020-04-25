import {Response} from "express";

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
        //serve static
        this.server.use('/', express.static('./scripts'));

        //parse as JSON
        this.server.use(express.json());

        //endpoint for API
        this.server.use('/scripts', this.router);

        //API routes
        this.router.post('/create', this.registerHandler.bind(this));
        this.router.post('/login', this.loginHandler.bind(this));
        this.router.post('/watchlist', this.watchlistHandler.bind(this));


        //fall through handler if nothing matches
        this.router.post('*', async (request, response) => {
            response.send(JSON.stringify({ "result" : "command-not-found" }));
        });
    }


    private async registerHandler(request: Request, response: Response) : Promise<void> {
        response.write(JSON.stringify({ success: true }))
        response.end();
      }

    private async loginHandler(request: Request, response: Response) : Promise<void> {
        response.write(JSON.stringify({ jwt: "JSON Web Token", success: true }))
        response.end();
      }
    
    private async watchlistHandler(request: Request, response: Response) : Promise<void> {
        await fakeData.generateMedia(request.body, response);
      }

    

    
    
} 