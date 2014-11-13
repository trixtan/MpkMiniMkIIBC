co.nri.JOYSTICK_THRESHOLD = 27; //cc value

co.nri.Joystick = function Joystick() {
	var self = this;
	this.cc = {left:true, right:true, up:true, down:true};
	this.callbacks = {left:[], right:[], up:[], down:[]};

	this.init = function() {
	
	};

	this.addLeftCallback = function(callback) {
		self.addCallback('left', callback);
	};

	this.addRightCallback = function(callback) {
		self.addCallback('right', callback);
	};

	this.addUpCallback = function(callback) {
		self.addCallback('up', callback);
	};

	this.addDownCallback = function(callback) {
		self.addCallback('down', callback);
	};

	this.addCallback = function(direction, callback) {
		if(!callback) return;
		if(!direction) return;
		if(typeof callback != 'function') return;
		self.callbacks[direction].push(callback);
	};
	
	this.down = function(direction, status, data1, val) {
		self.move('down', status, data1, val);
	};

	this.up= function(direction, status, data1, val) {
		self.move('up', status, data1, val);
	};

	this.left = function(direction, status, data1, val) {
		self.move('left', status, data1, val);
	};

	this.right = function(direction, status, data1, val) {
		self.move('right', status, data1, val);
	};

	this.move = function (direction, status, data1, val) {
		if(val > co.nri.JOYSTICK_THRESHOLD) {
			if(self.cc[direction]) {
				self.callbacks[direction].forEach(function (callback) {
					callback(direction, status, data1, val);
				});
				self.cc[direction] = false;
			}
		}else {
			self.cc[direction] = true;
		}
	};
	
};