import express from 'express';
import mssql from 'mssql';

import cors from 'cors';
//cors -- Cross Origin Resource Sharing
//Allows fordifferences in ports and paths -- good practise
//used as middleware for express
const port = 3000;

const app = express(); //create new instance of express

//.use(defines middleware)
app.use(cors()) 
app.use(express.json()) //parses incoming requests to JSON objects


//example configuration for mssql database
const sqlConfig = {
    server: "10.10.1.47",
    database: "CMG_Live_DB",
    user: "crystalnine",
    password: "crystalnine",
    trustServerCertificate: true
}


//ROUTES

//GETALL
app.get('/', async (req, res) => { //sql connection must be async
    const db = await mssql.connect(sqlConfig) //new connection
    const newquery = "SELECT * FROM "
    db.query(newquery, (err,result) => {//runs a query against the connection with result or error parameters, always returns json object/array
        if(err) return res.json({Message: "Server Error!"});
        return res.json(result.recordset);
    })
})

//GET by id
app.get('/read/:Id', async (req, res) => {
    const db = await mssql.connect(sqlConfig)
    const id = req.params.Id;
    const newquery = "SELECT * FROM BPReport WHERE Id = "+id;
    db.query(newquery, (err, result) => {
        if(err) return res.json({error: "Server Error!"})
        return res.json(result.recordset);
    })
})

//UPDATE
//parameters are passed in within the request
//
//E.G: Axiom request for other JS app --> axios.put('http://localhost:3001/update/'+Id, values)
//
app.put('/update/:Id', async (req, res) => {
    const db = await mssql.connect(sqlConfig)
    const id = req.params.Id;
    const newquery = "UPDATE table_name SET column1= "+ req.body.Value1 + ", column2= " + req.body.Value2 + ", column3 = " + req.body.Value3 + " WHERE Id = "+id;

    db.query(newquery, (err, result) => {
        if(err) return res.json({error: "Server Error!"})
        return res.json(result.recordset);
    })
})

//CREATE
app.put('/create', async (req, res) => {
    const db = await mssql.connect(sqlConfig)
    const id = req.params.Id;
    const newquery = "INSERT INTO table_name (column1, column2, column3, ...) VALUES ("+ req.body.Value1 +", "+ req.body.Value2 +", "+ req.body.Value3 +", ...);"
    db.query(newquery, (err, result) => {
        if(err) return res.json({error: "Server Error!"})
        return res.json(result.recordset);
    })
})

//DELETE
app.delete('/delete/:Id', async (req, res) => {
    const db = await mssql.connect(sqlConfig)
    const id = req.params.Id;
    const newquery = "DELETE FROM BPReport WHERE Id = "+id;
    db.query(newquery, (err, result) => {
        if(err) return res.json({error: "Server Error!"})
        return res.json({message: "Deleted "+id+" successfully"});
    })
})

//starts a server which listens on defined port
app.listen(port, ()=> {
    console.log(`Listening on port: ${port}`);
})