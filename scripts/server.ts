import {Response} from "express";
import fakeData from './fakeData';

let http = require('http');
let url = require('url');
const express = require('express')
const faker = express();

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
        this.router.post('/WatchList/:username/create', this.createWatchListHandler.bind(this));
        this.router.post('/WatchList/:username/read', this.readWatchListHandler.bind(this));
        this.router.post('/WatchList/:username/readAll', this.readAllWatchListHandler.bind(this));
        this.router.post('/WatchList/:username/update', this.updateWatchListHandler.bind(this));
        this.router.post('/WatchList/:username/delete', this.deleteWatchListHandler.bind(this));


        //fall through handler if nothing matches
        this.router.post('*', async (request, response) => {
            response.send(JSON.stringify({ "result" : "command-not-found" }));
        });
    }

    	//  CRUD handlers
    
      private async createWatchListHandler(request, response) : Promise<void> {
        // get WatchList object from front end
        let username = request.params['username'];
    
        console.log('username: ' + username);
        let WatchListObj = request.body.WatchListObj;
      
        console.log(WatchListObj);
    
        await this.createWatchList(username, WatchListObj, response);
      }
    
      private async readWatchListHandler(request, response) : Promise<void> {
        let username = request.params['username'];
        let category = request.query.category;
        let label = request.query.label;
        console.log('username, category, label: ' + username + ", " + category + " , " + label);
        await this.readWatchList(username, category, label, response);
      }
    
      private async readAllWatchListHandler(request, response) : Promise<void> {
        let username = request.params['username'];
        await this.readAllWatchLists(username, response);
      }
    
      private async updateWatchListHandler(request, response) : Promise<void> {
        let username = request.params['username'];
        let WatchListObj = request.body.WatchListObj;
        await this.updateWatchList(username, WatchListObj, response);
      }
      
      private async deleteWatchListHandler(request, response) : Promise<void> {
        console.log("in deleteWatchListHandler")
        // get WatchList object from front end
        let WatchListObj = request.body.WatchListObj;
        
        let username = request.param['username'];
        console.log('deleting ', WatchListObj);
        await this.deleteWatchList(username, WatchListObj, response);
      }
  ​
     // CRUD functions 
  
      public async createWatchList(username: string, WatchListObj: object, response) : Promise<void> {
      console.log("creating WatchList...")
      await this.db.put(username, WatchListObj);
  
      response.write(JSON.stringify(
              {'result' : 'created',
              'username' : username,
              'WatchListObj': WatchListObj
              }));
      response.end();
    }
  
    public async readWatchList(username : string, category : string, label: string, response) : Promise<void> {
      console.log("reading WatchList...");
      //await this.db.get(username, category, label);
  
      // response.write(JSON.stringify(
      //   {
      //   'bookmarks' : faker.date.recent() + " - " + faker.random.words() + ", " + faker.date.recent() + " - " + faker.random.words(),
      // }
      // ))
      // response.end();
    }
    public async readAllWatchLists(username : string, response) : Promise<void> {
      console.log("\n\nreading all WatchLists...");
  
      let userObj = await this.db.getAll(username);
      let labelWatchLists = this.parseLabelWatchLists(userObj);
  
  
      response.write(JSON.stringify(
        {'result' : 'read all WatchLists',
        'username' : username,
        'WatchListData' : labelWatchLists
      }
      ))
      response.end();
    }
  
    public parseLabelWatchLists(WatchListObj : any) {
      console.log("parsing usr obj");
      let labelWatchLists = WatchListObj.categories[0].labels;
      return labelWatchLists;
    }
  
    public async updateWatchList(username : string, WatchListObj : object, response) : Promise<void> {
      console.log("updating WatchList...");
      //await this.db.put(username, WatchListObj);
  
      response.write(JSON.stringify(
        {
          'result' : 'updated',
          'username' : username,
          'updatedWatchListData' : WatchListObj
        }
      ))
      response.end();
    }

    public async deleteWatchList(username: string, WatchListObj: object, response) : Promise<void> {
      console.log("deleting WatchList")
      await this.db.del(username, WatchListObj);
      response.write(JSON.stringify(
              {'result' : 'deleted',
              'username' : username,
              'WatchList' : WatchListObj
              }));
      response.end();
      }
  ​​
    


    // private async registerHandler(request: Request, response: Response) : Promise<void> {
    //     response.write(JSON.stringify({ success: true }))
    //     response.end();
    //   }

    // private async loginHandler(request: Request, response: Response) : Promise<void> {
    //     response.write(JSON.stringify({ jwt: "JSON Web Token", success: true }))
    //     response.end();
    //   }
    
    // private async resultHandler(request: Request, response: Response) : Promise<void> {
    //     await fakeData.generateMedia(request.body, response);
    //   }

    // private async watchlistHandler(request: Request, response: Response) : Promise<void> {
    //     await fakeData.generateWatchlist(request.body, response);
    //   }
    
} 