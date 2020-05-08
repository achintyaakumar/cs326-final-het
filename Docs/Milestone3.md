# Group Het, CS 326, UMass Amherst, Website: Media Sense 
## Backend Implementation - From Milestone 3:
### Database Documentation



entity document {

​    "name": // entity name : String

​      "partisan" // partisan score : double

​      "reliability"  //reliability score: double

​      "talks"://Their topics of interest : String

}

​	user document {

​	"first name": String

​	"last name": String

​	"email": String

​	"password": String

}

​	watchlist document{

​	"Username": String

​	"Entities": String[]

}



Using MongoDB, we have created collections as listed above. 1. User which is used to reference accounts made. 2. Entity which is used to reference a followable media entity. 3. Watchlists of entities that have users whom they belong to.





