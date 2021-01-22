
require("@babel/register")({ extensions: ['.js', '.ts'] });
// import 'dotenv/config';
var express = require('express');
var https = require('https');
var fs = require('fs');
var app = require('express')();
// var app2 = require('express')();
var http = require('http').Server(app);

const PORTNum = process.env.PORT || 8000;
const HOSTName = process.env.HOST || "localhost"
let dir2 = "/home/celeste/Escritorio/tesis/proyectos/tangible-ejecucion/run-tangible" || __dirname;
console.log("dir=", dir2);
app.use(express.static(dir2 + '/assets/pattern'));
console.log(dir2, "/assets/pattern");
app.use(express.static(dir2 + '/assets/img'));
console.log(dir2 + '/assets/img');
app.use(express.static(dir2 + '/assets/ply'));
console.log(dir2 + '/assets/ply');
app.use(express.static(dir2 + '/src'));
// app.use(express.static(__dirname + '/Objetos'));
// app.use(express.static(__dirname + '/marcadores'));
app.use(express.static(dir2 + '/lib'));

//app.use(express.static(dir2 + '/public/move'));
//console.log(dir2 + '/public/move');
// app.use(express.static(__dirname + '/imagenes'));
// app.use(express.static(__dirname + '/Audios'));

/*
app2.use(express.static(__dirname + '/Objetos'));
app2.use(express.static(__dirname + '/marcadores'));
app2.use(express.static(__dirname + '/js'));
app2.use(express.static(__dirname + '/imagenes'));
*/

app.get('/', function (req: any, res: any) {
	//console.log(res);
	res.sendFile(dir2 + '/index.html');
	console.log(dir2, "/index.html");
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

https.createServer(options, app).listen(PORTNum);

//https.createServer(options, app2).listen(3000);

console.log('Realidad Aumentada funcionando en', `${HOSTName}: ${PORTNum}`);
  //console.log('Realidad Virtual funcionando en puerto 3000');
