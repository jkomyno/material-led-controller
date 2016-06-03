// import npm modules
var express = require('express');
var socketio = require('socket.io');
// import debug configuration
var toggleDebug = require('../app/Debug');
var toggleRPi = require('../app/RPi');
toggleDebug(true);
var wpi = toggleRPi(false);
// express/socket.io stuff
var app = express();
var port = 3000;
var server = app.listen(port);
var io = socketio.listen(server);

// rpi related
var pins = [7, 0];
console.log("pins " + pins + " setup");
wpi.setup('wpi');

for(var pin of pins){
	console.log(pin, " in OUTPUT");
	wpi.pinMode(pin, wpi.OUTPUT);
}

function controlSinglePin(pin, status){
	console.log("SINGLEPIN -> " + pin + ": " + status ? 1 : 0);
	wpi.digitalWrite(pin, status ? 1 : 0)
}

function controlEveryPin(status){
	for(var pin of pins){
		console.log("SINGLEPIN -> " + pin + ": " + status ? 1 : 0);
		wpi.digitalWrite(pin, status ? 1 : 0);
	}
}

function controlBothPinsAlternately(status, interval){
	console.log("alt");
}

io.sockets.on('connection', function(socket){
	
	socket.on('ledControlSent', function(payload){
		console.log(payload);
		
		var led = payload.led;
		var status = payload.status;

		switch(led) {
		    case "led1":
		        controlSinglePin(pins[0], status);
		        break;
		    case "led2":
		        controlSinglePin(pins[1], status);
		        break;
		    case "both":
		    	controlEveryPin(status);
		    	break;
		    case "alt":
		    	controlBothPinsAlternately(status, 1000);
		    	break;
		}

		io.emit('ledControlArrived');
	});

});

console.log('Server is running on port ' + port);