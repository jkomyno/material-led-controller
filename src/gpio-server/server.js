var express = require('express');
var socketio = require('socket.io');
var wpi = require('wiring-pi');

var app = express();

var port = 3000;
var server = app.listen(port);
var io = socketio.listen(server);

var pin1 = 7;
var pin2 = 0;

wpi.setup('wpi');
wpi.pinMode(pin1, wpi.OUTPUT);
wpi.pinMode(pin2, wpi.OUTPUT);

io.sockets.on('connection', function(socket){
	
	socket.on('ledControlSent', function(payload){
		console.log(payload);
		
		var led = payload.led;
		var status = payload.status;
		var pin;

		switch(led) {
		    case "led1":
		        pin = pin1;
		        break;
		    case "led2":
		        pin = pin2;
		        break;
		}

		console.log("pin: " + pin + " status " + status);
		wpi.digitalWrite(pin1, status ? 1 : 0);

		io.emit('ledControlArrived');
	});

});

console.log('Server is running on port ' + port);