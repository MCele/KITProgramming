/*
var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res)
{
  res.sendFile(__dirname + '/index.html');
});
//El servidor funcionara en el puerto 3000 pero podria cambiarse a cualquiera que se desee.

http.listen(3000, function()
{
  console.log('Funcionando en el puerto 3000');
});
*/
require("@babel/register")({ extensions: ['.js', '.ts'] })
var express = require('express');
var https = require('https');
var fs = require('fs');
var app = require('express')();
// var app2 = require('express')();
var http = require('http').Server(app);

app.use(express.static(__dirname + '../assets/pattern'));
console.log(express.static(__dirname + '/assets/pattern'));

app.use(express.static(__dirname + '/assets/img'));
console.log(express.static(__dirname + '/assets/img'))
app.use(express.static(__dirname + '/assets/ply'));
console.log(__dirname + '/assets/ply');
app.use(express.static(__dirname + '/src'));
console.log(__dirname + '/src');
// app.use(express.static(__dirname + '/Objetos'));
// app.use(express.static(__dirname + '/marcadores'));
app.use(express.static(__dirname));
console.log(__dirname);
app.use(express.static(__dirname + '../move'));
console.log(__dirname + '/../move');
//console.log(express.static());
// app.use(express.static(__dirname + '/dist'));
// console.log(__dirname + '/dist');
// app.use(express.static(__dirname + '/imagenes'));
// app.use(express.static(__dirname + '/Audios'));

/*
app2.use(express.static(__dirname + '/Objetos'));
app2.use(express.static(__dirname + '/marcadores'));
app2.use(express.static(__dirname + '/js'));
app2.use(express.static(__dirname + '/imagenes'));
*/

app.get('/', function (req: any, res: any) {
  res.sendFile(__dirname + './../index.html');
  console.log(__dirname, "nombreDir");
});

/*
app2.get('/', function(req, res)
{
  res.sendFile(__dirname + '/index2.html');
});
*/

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(8000);

//https.createServer(options, app2).listen(3000);

console.log('Realidad Aumentada funcionando en puerto 8000');
  //console.log('Realidad Virtual funcionando en puerto 3000');
