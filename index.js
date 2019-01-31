const mysql = require('mysql');
const express = require('express');
var fs = require('fs');
var app = express();
const bodyparser = require('body-parser');
var http = require('http');
var server = http.Server(app);
var porta = process.env.PORT || 5000;
var path = require('path');

app.use(express.static('client'));
app.use(bodyparser.json());

var MysqlConnection = mysql.createConnection({
    host:"den1.mysql5.gear.host",
    user:"whatsapp3",
    password:"@AMANDINHA",
    database:"whatsapp3"
})

 app.use(express.static(__dirname + '/views'));

MysqlConnection.connect((err)=>{
    if(err){
        console.log("Erro ao conectar ao banco de dados");
    }else{
        console.log("Conecatado ao banco de dados");
    }
})

app.get("/",(req,res)=>{
    res.writeHead(200,{'content-type':'text/html'})
    fs.readFile('./login.html',null,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.write(data);
        }
        res.end();
    })
});

server.listen(5000,()=>{console.log("rodando na porta 5000")});


app.get('/Valida/:login&:senha',(req,res)=>{
    MysqlConnection.query("SELECT * FROM USUARIO WHERE LOGIN = ? AND SENHA = ?",    [req.params.login,req.params.senha],(err,rows,fields)=>{
        if(err){
            console.log(err);
        }else{
            console.log(rows);
            res.send(rows);
        }
    });
})

app.get("/Conversa/:id",(req,res)=>{
    res.writeHead(200,{'content-type':'text/html'})
    fs.readFile('./Conversa.html',null,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            res.write(data);
        }
        res.end();
    })
});

app.get("/Inserir/:mensagem&:id",(req,res)=>{
    MysqlConnection.query("INSERT INTO CONVERSAS (MENSAGEM,ID_USUARIO) VALUES (?,?)",[req.params.mensagem,req.params.id],(err,rows,fields)=>{
        if(err){
            console.log(err);
        }else{
            res.end();
        }
    });
})

app.get("/SELECIONAR",(req,res)=>{
    MysqlConnection.query("SELECT * FROM CONVERSAS ORDER BY 1 DESC",(err,rows,fields)=>{
        if(err){
            console.log(err);
        }else{
            res.send(rows);
        }
        res.end();
    });
})