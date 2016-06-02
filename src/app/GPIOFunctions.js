const wpi = require('wiring-pi');
const pin1 = 7;
const pin2 = 0;

wpi.setup('wpi');
wpi.pinMode(pin1, wpi.OUTPUT);
wpi.pinMode(pin2, wpi.OUTPUT);

export function setFirstLed(status){
  wpi.digitalWrite(pin1, status ? 1 : 0);
}

export function setSecondLed(status){
	wpi.digitalWrite(pin2, status ? 1 : 0);
}