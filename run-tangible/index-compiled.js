/*
var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res)
{
  res.sendFile(__dirname + '/index.html');
});
/*
io.on('connection', function(socket)
{
	//Enviamos el mensaje con el nombre del emisor concatenado al princpio del mensaje
	socket.nombre = "";
	socket.on('chat message', function(msg)
	{
		if(socket.nombre != "")
			if(msg != "")
    			io.emit('chat message', socket.nombre+": "+msg);
    });
    
    //Al cerrar la ventana automaticamente el servidor se desconectara y avisa a los aun presentes en la sala de su ausencia.
	
	socket.on('disconnect', function(msg)
	{
		if(socket.nombre != "")
    		io.emit('chat message',socket.nombre+ " se ha desconectado");
	});
	
	//Seteamos el nombre del usuario

	socket.on("unirse", function(name)
	{
		socket.nombre = name;
	});

	// indicamos a todos los usuarios conectados que el nuevo usuario entro en la sala
	// para comunicarse

	socket.on("aparecer", function(name)
	{
		io.emit('chat message',socket.nombre+ " ha ingresado a la sala");
	});
});

//El servidor funcionara en el puerto 3000 pero podria cambiarse a cualquiera que se desee.

http.listen(3000, function()
{
  console.log('Funcionando en el puerto 3000');
});
*/
var express = require('express');
var https = require('https');
var fs = require('fs');
var app = require('express')();
// var app2 = require('express')();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/assets/patrones'));
app.use(express.static(__dirname + '/assets/ply'));
app.use(express.static(__dirname + '/src'));
// app.use(express.static(__dirname + '/Objetos'));
// app.use(express.static(__dirname + '/marcadores'));
app.use(express.static(__dirname + '/lib'));
app.use(express.static(__dirname + '/move'));
// app.use(express.static(__dirname + '/imagenes'));
// app.use(express.static(__dirname + '/Audios'));

/*
app2.use(express.static(__dirname + '/Objetos'));
app2.use(express.static(__dirname + '/marcadores'));
app2.use(express.static(__dirname + '/js'));
app2.use(express.static(__dirname + '/imagenes'));
*/

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
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
