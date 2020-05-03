export class Database {

	private uri = "mongodb+srv://guest:guest@cluster0-y0tyl.mongodb.net/test?retryWrites=true&w=majority";
    private MongoClient = require('mongodb').MongoClient;
    private client;
	private collectionName: string;
	private dbName: string = "cs_326-hat";

	constructor(collectionName) {
		this.collectionName = collectionName;
		let secrets, password;
    	if (!process.env.PASSWORD) {
        	secrets = require('./secrets.json');
        	password = secrets.password;
    	} else {
        	password = process.env.PASSWORD;
    	}
		this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
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
		(async () => {
			await this.client.connect().catch(err => { 
                console.log(err); 
            });
		})();
	}

	public async put(key: string, value: string): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("put: key = " + key + ", value = " + value);
		let result = await collection.updateOne({ 'name': key }, { $set: { 'value': value } }, { 'upsert': true });
		console.log("result = " + result);
	}

	public async getAll(username: string) : Promise<string> {
		let db = this.client.db(this.dbName); 
		let collection = db.collection(this.collectionName);
		console.log("getAll: key = " + username);
	
		let result = await collection.findOne({'username' : username });
		
		console.log("getAll: returned " + JSON.stringify(result));
		if (result) {
			return result;
		} else {
			return null;
		}
	}
	
	public async get(key: string): Promise<string> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("get: key = " + key);
		let result = await collection.findOne({ 'name': key });
		console.log("get: returned " + JSON.stringify(result));
		if (result) {
			return result.value;
		} else {
			return null;
		}
    }
    
    public async find(): Promise<string> {
		let db = this.client.db(this.dbName);
        let collection = db.collection(this.collectionName);
		let result = await collection.find();// to return all the project 
		console.log("result = " + result);
		if (result) {
			return result.value;
		} else {
			return null;
		}
	}


	public async del(key: string): Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collectionName);
		console.log("delete: key = " + key);
		let result = await collection.deleteOne({ 'name': key });
        console.log("result = " + result);
        await this.del(key);
	}

	public async isFound(key: string) : Promise<boolean>  {
		console.log("isFound: key = " + key);
		let v = await this.get(key);
		console.log("is found result = " + v);
		if (v === null) {
			return false;
		} else {
			return true;
		}
	}
}
