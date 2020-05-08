# Group Het, CS 326, UMass Amherst, Website: Media Sense Spring 2020
## Final Report
### Overview

Our product is Media Sense, a resource for those engaged in current news who would like to know just where given entities stack up in comparison to other outlets in terms of bias. The idea is to let users not only view ratings but also keep a watchlist for themselves to consistently keep up with where their entities stand. 

### Team Members:

Manan Patel - Senior 

Achintya Kumar - Junior

Jack Flynn - Senior

### UI:

login: logs user into Media Sense and also has a signup form

![image-20200508023357203](C:\Users\John Flynn\AppData\Roaming\Typora\typora-user-images\image-20200508023357203.png)

search: allows user to browse entities on Media Sense

![image-20200508023518109](C:\Users\John Flynn\AppData\Roaming\Typora\typora-user-images\image-20200508023518109.png)



results: displays scores and topics of an entity

![image-20200508023554946](C:\Users\John Flynn\AppData\Roaming\Typora\typora-user-images\image-20200508023554946.png)

watchlist: displays watched entities selected on the results page of an entity

![image-20200508023631925](C:\Users\John Flynn\AppData\Roaming\Typora\typora-user-images\image-20200508023631925.png)

### API:

/api/login - posts login information

/api/signup - posts signup information

/api/AddInwatchlist - posts new watchlist acquisition for a user

/api/watchlist - gets the watchlist based on user details

/api/logout - gets log out procedure

/api/getMediaData - gets media data (scores)



### URL Routes:



### Database:

Entities : name,partisan score, reliability, talks

###### populate the...

Watchlist : username,entities

###### which is identified by the...

User: first name, last name, email, password



### Design Hurdles/Advice for Future Teams

The most difficult overhead obstacle was the remote nature of working regarding COVID-19, this was less of a design hurdle but it resulted in less day to day communication. Communication is key for these kind of assignments. There were many times that we ran into people working on the same thing without knowing it. We would recommend starting early as this is a very large task that will take everyone working together to complete. Back-end was by far the most difficult for our team and it took a lot of time and effort to get working correctly. In addition, step outside of your comfort zone because this is a great environment to learn something new. Also always reach out for help from course staff but more importantly teammates. A lot of times it is as simple as talking it through to solve bugs and it builds a good environment for a team.