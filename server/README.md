# IMPORTANT NOTES

If the frontend cannot connect to the backend, it is likely because the proxy server is not set up properly due to caching issues. To fix this, delete the package-lock.json and node_modules of the **client** directory and then run npm install again in the same directory. This will reload everything with the proper server proxy in place, i.e. the one mentioned in the package.json file in the client directory.

## Relating to setting up the database

To connect to MongoDB properly, create a .env file in the server directory and put the certificate file in the server directory as well. Then add the mongo uri under the environment variable MONGO_URI and add the name of the certificate file under the environment variable CRED_PATH