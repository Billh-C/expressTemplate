#Express App template + guide

##Initialising the project

create a directory and navgiate to it
```
mkdir Example
cd Example
```

##initalise a NodeJS application and install necessary modules##
```
npm init
npm i express cors mssql nodemon
```
**Express** - Web framework for handling HTTP requests
**CORS** - Cross Origin Resource Sharing, this is to allow different origins to access the API (Different ports, paths, protocols)
**MSSQL** - Specific module for interacting with mssql databases, *all database systems will have modules and syntaxes that may not be applicable here*
**Nodemon** - Used to refresh while the application in running if source code change is detected
