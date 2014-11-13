const co.nri.JOYSTICK_DELAY = 500; //ms

co.nri.Joystick = function Joystick() {
	var self = this;
	var canLeft = true;
	var canRight = true;
	var canUp = true;
	var canDown = true;
	
	this.init = function() {
	
	};
	
	this.down = function(val) {
		if(val === 0) {
			self.canDown = true;
		} else if(self.canDown) {
				self.canDown = false;
				setTimeout(function(){self.canDown = true;}, JOYSTICK_DELAY);
				return true;
		}
		return false;
	};
	
	
};