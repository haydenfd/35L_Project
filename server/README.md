# IMPORTANT NOTES

To set up the server just cd into the server directory then `npm run devStart` (this will start a nodemon server for development, you can also do `npm start` to start the server in a production setting)

If the frontend cannot connect to the backend, it is likely because the proxy server is not set up properly due to caching issues. To fix this, delete the package-lock.json and node_modules of the **client** directory and then run npm install again in the same directory. This will reload everything with the proper server proxy in place, i.e. the one mentioned in the package.json file in the client directory.

## Relating to setting up the database

To connect to MongoDB properly, create a .env file in the server directory and put the certificate file in the server directory as well. Then add the Mongo URI under the environment variable MONGO_URI and add the name of the certificate file under the environment variable CRED_PATH

## User info

The user data is structured as follows: <br />
email: <email> <br />
userinfo: { <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password: <password> <---encrypted! <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;first: <first> <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last: <last> <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bio: <bio> <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;followers: <followers> <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;following: <following> <br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pfp: <picturename> <br />
} <br />
  
You (the frontend) can query this data using the following example: <br />
await fetch('/api/getuser', {<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;method: 'POST',<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;body: JSON.stringify({ "userEmail": "someEmail"}),<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;headers: {<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"Content-Type": "application/json"<br />
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />
}).then(res => res.json()).then(response => console.log(response.result))<br />
