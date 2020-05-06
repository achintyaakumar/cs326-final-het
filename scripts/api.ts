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
        
    }
};

export default API;