import Database from './database';


var API:any = {
    auth :async function(userDetails:any, callback:any){
        console.log("auth", userDetails);    
        if(!userDetails){
            return callback('User details not found');
        }
        let usersDB = Database.getCollection('users');
        let email = userDetails.email;
        let password = userDetails.password;
        let searchQury = {$and:[{email:email},{password:password}]}
        try {
            let isFound = await usersDB.findOne(searchQury);
            if(isFound){
                return callback(null,{login:true});
            }else{
                return callback(null,{login:false});
            }
        } catch (error) {
            return callback('Login failed');
        }
        
    },
    
    addInWishlist :async function(whishListData: any, userDetails: any, callback:any){
        let email = userDetails.email;
        let usersDB = Database.getCollection('users');
        try {
            let preWishlist = await usersDB.findOne({ email: email },{watchlist:1});
            if(preWishlist){
                var wishlist = preWishlist.watchlist;
                var count = 0;
                for (let i = 0; i < wishlist.length; i++) {
                    const element = wishlist[i];
                    if(element.name==whishListData.name){
                        count++;
                        break;
                    }                
                    
                }
                console.log("addInWishlist-count--",count);
                
                if(count>0){
                    return callback(null,"Already added in wishlist");
                }            
            }
            let isFound = await usersDB.update({ email: email },{$push: {watchlist:  whishListData}})
            if(isFound){
                return callback(null,"Added successfully");
            }else{
                return callback('Unable to add wishlist');
            }
        } catch (error) {
            return callback('User not found');
        }
        
    },

    getWatchlist :async function (userDetails: any, callback: any){
       
        let usersDB = Database.getCollection('users');
        let email = userDetails.email;
        let searchQury = {email:email};
        try {
            let isFound = await usersDB.findOne(searchQury);
            if(isFound){
                return callback(null,isFound.watchlist);
            }else{
                return callback('No watchlist found');
            }
        } catch (error) {
            return callback('Login failed');
        }
    },

    signUpUser :async function(userDetails:any, callback: any){
        if(!userDetails){
            return callback('User details not found');
        }
        let firstName = userDetails.firstName;
        let lastName = userDetails.lastName;
        let email = userDetails.email;
        let password = userDetails.password;
        let usersDB = Database.getCollection('users');
        let insertQuery = {
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName,
            watchlist:[]
        }
         try {
            let isCreated = await usersDB.insertOne(insertQuery);
            if(isCreated){
               return callback(null,"inserted successfully")
            }
        }catch(error){
           return callback("Something went wrong. Please try again.")
        }
    }
};

export default API;
