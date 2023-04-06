## Forum project

This project consists in creating a web forum that allows :

communication between users<br />
associating categories to posts<br />
liking and disliking posts and comments<br />
filtering posts

# Stack
Frontend: ReactJS<br />
Backend: Golang<br />
Database: SQLite<br />
Other: Docker

# Tags 
`react.js`, `javascript`, `rest api`, `sqlite`, `go`, `docker`

# Authentication
Client is able to register as a new user on the forum, by inputting credentials. There is also a login session to access the forum and be able to add posts and comments.<br />

Cookies is set to allow each user to have only one opened session. Each of this sessions contains an expiration date. <br />

Instructions for user registration: <br />
Need to provide email <br />
(If the email is already taken an error response is return)
Need to provide username <br />
Need to provide password <br />
The password is encrypted when stored <br />
The forum is able to check if the email provided is present in the database and if all credentials are correct. It will check if the password is the same with the one provided and, if the password is not the same, it will return an error response. 

# Communication
Users can communicate between each other by creating posts and comments.<br />
Only registered users will be able to create posts and comments. <br />
When registered users are creating a post they can associate one or more categories to it. <br />
The posts and comments are visible to all users (registered or not). <br />
Non-registered users will only see posts and comments, but cannot create.  <br />

# Likes and Dislikes
Only registered users are able to like or dislike posts and comments. <br />

The number of likes and dislikes are visible by all users (registered or not). <br />

# Filter
A filter mechanism is implemented which allows users to filter the displayed posts by : <br />
categories <br />
created posts <br />
liked posts <br />


