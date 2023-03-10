# <strong>Welcome to Trek!</strong>

## How to Use Trek
<strong>Getting Started:</strong><br>
Login to Trek using any Google Account. If you don't already have a Trek account, don't worry, an account will automatically be created with the Google information used to log in.
<br>  
<strong>Making a Post:</strong><br> 
Now that you've logged in, it's time to start posting! Navigate to the ***Post*** panel to create a post. Simply fill out the post fields with the information about your travel plans and hit Submit. Now your post has been created!
 <br>  
<strong>Viewing Your Posts:</strong><br> 
To view all of your posts, navigate to the ***Account*** panel. Here you can see all of your posts of both past and upcoming trips. Additionally, your profile information is viewable here, which matches your Google Account information.
 <br>  
<strong>Friending:</strong><br> 
Use Trek to keep up with your friends' travel plans by friending them! On the ***Friends*** panel, search up friends and send a friend request. Once another user has sent you a friend request, you can accept or reject it on the ***Friends*** page. Once you accept this request, you will be able to see each other's posts on the ***Posts*** page.
 <br>  
<strong>Viewing Friends' Posts:</strong><br> 
The ***Posts*** page features a custom order of recommended posts from accounts you have friended. For more information on this recommendation algorithm, see the description of the algorithm [here](#recalgo).
<br>  
<strong>Editing Your Account</strong> <br>
Edit Your Account Information in the ***Settings*** Panel. Here you can change your profile picture, account name, personal information, and delete your account. 
<br>  
<strong>Deleting a Post</strong><br> 
Deleting a post is mocked and the functionality is supported in the backend; however, not in the front-end
 <br>  
<strong>Logging Out:</strong><br> 
Log out at any time by pressing the Logout Button at the top right of your screen.
 <br>  
<strong>Deleting Your Account</strong> <br> 
As of right now, account deletion has not been implemented to be possible through the User Interface of Trek. If you want to delete your Trek account, email one of the developers and we'll be happy to remove your account. <br>

----

## Accessibility<br>
Created an 'About Us' page to let the user know how all about what Trek is about, how they can use it, and what our privacy policy is. We also added aria-labels to the major components of the app, such as the navigation bar and post creation page to guide the users who rely on the Voice Over feature. In our Page Not Found custom pages, we also provide links back to the web application so that they can easily go back to the webapp without having to npm start or type in the url again. 

---
## Working on Trek
If you would like to work on Trek, look ahead to see how it was built!

Technologies used - Google OAuth, Firebase realtime database (NOSQL), Spark, Maven, JEST/JUnit testing

## Design choices <br>

<div href=firebase> <strong> Firebase Database </strong>
We chose to use Firebase's Realtime Database for our data storage needs. This is a NoSQL DB which is useful in cases like ours where different kinds of Posts may have different fields and values associated with them. Further, using a NoSQL DB makes it easier to port code when adding new functionalities and tracking new features across classes. We integrate the Firebase DB with the Java backend and create functions to create, read, update and delete various components of this database. These functions, written in Java, provide an accessible way for the Java backend to interact with Firebase. For our purposes, we chose to use Firebase's REST API documentation. We also create functions for more complex queries such as getting posts from all friends of a particular user. 
<br></br>
</div>

<div href=recalgo> <strong> Recommendation Algorithm </strong> 
Our recommendation algorithm displays the posts of a user's friends in a custom order to that user. This is achieved by recursing through the database (comprised of all the friend posts) and generating a score for each post in comparison to the user's most recent post (in terms of start date). Scores are affected by if the dates of posts overlap, if the origin and/or destinations match, if the mode of travel is the same, and if the same flights or train lines are being taken. If a user has not made any posts yet, the algorithm sorts all of the posts in their friend database by dates, giving preference to ongoing trips, then upcoming trips (ordered by closest start date), and finally past trips (ordered by proximity to the current date). <br></br> </div> 
---

## Testing
### Unit Testing:<br>
To run these tests, run ```firebase emulators:start``` in the root directory of the project. If you want to stop the emulator, you can press ```Ctrl + C``` to kill the program.

This file contains unit tests for the Firebase.java class and the functions in it. We cover setting and getting User and different kinds of Posts when a user has and hasn't been previously set. We look at setting friends and adding posts to pre-existing User objects and the outcome when the User object doesn't already exist. Finally, we look at deleting users and posts to check if the DB is adequately updated after calls to delete.

### Backend Intermediate/Integration Tests:<br>
The HandlerTestUtilities file contains helpers for other handler test files. It contains 2 functions - tryRequestConnection and tryRequestBody. The first one sets up the connection for the a specific endpoint on the URL used for testing (we use port 111 for testing purposes). The second creates a request to an external API and returns the response body. This response body is undefined for failed requests and may return null values in such a case.
Injection testing is managed through these utilities and setup/teardown within the testing suites for the API handlers, located in the server folder within tests.
The TestPostHandler file has unit tests on post creation showing how one can create Train, Car and Plane posts and even posts that do not specify a particular journey type. It tests basic error cases such as not passing in the required parameters, having a start date after the end date, etc. These tests mirror the functionality in the Firebase functions.

### Random Testing - Fuzz Testing Boundaries<br>
For random testing, we try multiple setUser and delete User calls. This models how we can carry out random testing for the rest of the testing suite.
It was hard to randomly test the server because we would want to cover cases with each endpoint and pass in none, some or all parameters. However, a random test that has awareness of these criterions would need to loop through multiple arrays or objects to ensure the random testing is of some value to the testing suite quality. Thus, the most appropriate place to randomly test was where we had functions that took in fewer parameters.

Developers: Mithi Jethwa (mjethwa1), Molly McHenry (mmchenr1), and Sandra Martinez (smarti86) <br>
