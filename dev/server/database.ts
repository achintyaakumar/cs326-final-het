import mongodb from 'mongodb';
import config from './config';

var mainDb: { serverConfig: { isConnected: () => any; }; collection: (arg0: any) => any; };
var mClinet:any;
const Database: any = {
    loadDB : function(callback: () => void) {
    var MongoClient = mongodb.MongoClient;
    // var urlString = process.env.DB_URL;
    var urlString = config.mongodbUrl;

    console.log(urlString);
    // @ts-ignore
    mClinet = new MongoClient.connect(urlString,{useUnifiedTopology: true}, function(err: any, client: { db: (arg0: string | undefined) => any; }) {
        if (err) {
            setTimeout(function () {
            console.log("DB not connected - reconnecting : ",urlString);
                Database.loadDB(callback);
            }, 3000);
        }
        else{
            mainDb = client.db(process.env.DB_NAME);
            if (callback)  {
                console.log("DB Connected");
                callback();
            }
        
        }
        }
    );
    },
    isConnected : function() {
        if(mainDb)
        console.log("mainDb.serverConfig.isConnected() : ", mainDb.serverConfig.isConnected());
        if(mainDb && mainDb.serverConfig.isConnected()){
          return true ;
        }
        else{
          return false ;
        }
      },
      getCollection :function(name: any) {
        return mainDb.collection(name);
      },
      init: function(mainCallback: (arg0: { serverConfig: { isConnected: () => any; }; collection: (arg0: any) => any; }) => void) {
        Database.loadDB(async function() {
           mainCallback(mainDb)
        })
      }
}
export default  Database;
