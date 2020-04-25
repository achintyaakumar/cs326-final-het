export class Database {

	private uri = "mongodb+srv://guest:guest@cluster0-y0tyl.mongodb.net/test?retryWrites=true&w=majority";
    private MongoClient = require('mongodb').MongoClient;
    private client;
	private collectionName: string;
	private dbName: string = "cs_326-hat";

	constructor(collectionName: string) {
		this.collectionName = collectionName;
		this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
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

	public async isFound(key: string): Promise<boolean> {
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
