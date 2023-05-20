var express = require('express')
var app = express()
var path = require('path');
var sqlite = require('sqlite-sync');

app.use(express.static(path.resolve(__dirname,'main')));
app.use(express.json());

app.get('/', (req,res) => {
    res.sendFile(__dirname,'main','index.html');
});

app.get('/api/getusers',(req,res)=>
{
    try 
    {
      sqlite.connect('./db/db.sqlite3');
      var result = sqlite.run("SELECT * FROM users");
      res.json(result);
      sqlite.close();
    }
    catch (err) 
    {
      res.send("fail");
    }
});

app.post('/api/authuser',(req,res)=>
{
    try
    {
        var log = req.body.log;
        var pas = req.body.pas;
        sqlite.connect('./db/db.sqlite3');
        var result = sqlite.run(`SELECT log FROM users where log = '${log}' and pas = '${pas}'`);
        sqlite.close();
        res.json(result);
    }
    catch
    {
        res.json("fail");
    }
});


app.post('/api/createuser',(req,res)=>
{
    try
    {
        var log = req.body.log;
        var pas = req.body.pas;
        var phone = req.body.phone;
        var mail = req.body.mail;
        sqlite.connect('./db/db.sqlite3');
        var result = sqlite.run(`insert into users values('${log}','${pas}','${phone}','${mail}')`);
        sqlite.close();
        res.json(result);
    }
    catch
    {
        res.json("fail");
    }
});

app.post('/api/deleteuser',(req,res)=>
{
    try
    {
        var log = req.body.log;
        sqlite.connect('./db/db.sqlite3');
        sqlite.run(`DELETE users WHERE log = '${log}'`);
        sqlite.close();
        res.json("complete");
    }
    catch
    {
        res.json("fail");
    }
});

app.listen(3000, () =>
{
    console.log('Server start!');
});