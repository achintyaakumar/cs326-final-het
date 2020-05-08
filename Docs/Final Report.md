# Group Het, CS 326, UMass Amherst, Website: Media Sense - Spring 2020
## Final Report
### Overview

Our creation is **Media Sense**, a resource for those engaged in current news who would like to know just where given entities stack up. By comparing outlets in terms of bias and reliability, Media Sense is aiming to give a closer look at "Fake News". The idea is to let users not only view these ratings but also keep a watchlist for themselves to consistently keep up with where their entities stand. **Root Out Bias**

### Team Members:

Manan Patel - Senior 

Achintya Kumar - Junior

Jack Flynn - Senior

### UI:

login: logs user into Media Sense and also has a signup form

![image-20200508023357203](https://user-images.githubusercontent.com/47226319/81391551-47878700-90eb-11ea-84ee-9b92d5802dbf.png)

search: allows user to browse entities on Media Sense

![image-20200508023518109](https://user-images.githubusercontent.com/47226319/81391590-5a9a5700-90eb-11ea-9d03-0b7f0e732f88.png)




results: displays scores and topics of an entity

![image-20200508023554946](https://user-images.githubusercontent.com/47226319/81391647-6e45bd80-90eb-11ea-98a8-a559bcfcd041.png)

watchlist: displays watched entities selected on the results page of an entity

![image-20200508023631925](https://user-images.githubusercontent.com/47226319/81391674-7867bc00-90eb-11ea-8878-d47f53b0a0c6.png)


### API:



**/api/login:** posts login information

**/api/signup:** posts signup information

**/api/AddInwatchlist:**  posts new watchlist acquisition for a user

**/api/watchlist:** gets the watchlist based on user details

**/api/logout:** gets log out procedure

**/api/getMediaData:** gets media data (scores)



### URL Routes:



**/login** 

- Maps to login page

  

##### Needs Authentication:

**/watchlist** 

- Maps to watchlist

**/home** 

- Maps to search

  

### Database:



**Entities** : name,partisan score, reliability, talks

###### populate the...

**Watchlist** : username,entities

###### which is identified by the...

**User**: first name, last name, email, password



### Authentication/Authorization:



​	Users are authenticated with the sign-up email and password they have chosen. As shown above in the URL routes, the user will be blocked from entering if not previously authenticated. This check for previous authentication is done with a checkSignIn function that is called when a URL is entered that is blocked by authentication.



### Design Hurdles/Advice for Future Teams



​	The most difficult overhead obstacle was the remote nature of working regarding COVID-19, this was not as much of a design hurdle but it resulted in less day to day communication. Communication is key for these kind of assignments and you should try and check in multiple times peer week. There were many times that we ran into people working on the same thing without knowing it and losing efficiency.

​	We would recommend starting early as this is a very large task that will take everyone working together to complete. Back-end was by far the most difficult portion for our team and it took a lot of time and effort to get working correctly. With that in mind, step outside of your comfort zone because this is a great environment to learn something new. 

Always reach out for help from course staff but most importantly teammates. A lot of times it is as simple as talking it through to solve bugs and it builds a good environment for a team to grow.