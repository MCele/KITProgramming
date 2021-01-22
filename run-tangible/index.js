
require("@babel/register")({ extensions: ['.js', '.ts'] });
// import 'dotenv/config';
var express = require('express');
var https = require('https');
var fs = require('fs');
var app = require('express')();
// var app2 = require('express')();
var http = require('http').Server(app);

const PORT = 8000;//process.env.PORT || 
const HOST = "localhost" //process.env.HOST || 
let dir = __dirname || "/home/celeste/Escritorio/tesis/proyectos/tangible-ejecucion/run-tangible";
console.log("dir=", dir);
app.use(express.static(dir + '/assets/pattern'));
console.log(dir, "/assets/pattern");
app.use(express.static(dir + '/assets/img'));
console.log(dir + '/assets/img');
app.use(express.static(dir + '/assets/ply'));
console.log(dir + '/assets/ply');
app.use(express.static(dir + '/src'));
// app.use(express.static(__dirname + '/Objetos'));
// app.use(express.static(__dirname + '/marcadores'));
app.use(express.static(dir + '/lib'));

//app.use(express.static(dir + '/public/move'));
//console.log(dir + '/public/move');
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
	res.sendFile(dir + '/index.html');
	//res.sendFile(dir + '/client/index.html');
	//console.log(dir, "/index.html");
});

// app.use('/client', express.static(dir + '/client'));
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

https.createServer(options, app).listen(PORT);
// http.listen(PORT);


console.log('Realidad Aumentada funcionando en', `${HOST}: ${PORT}`);

