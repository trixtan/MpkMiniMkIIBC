function UserDefinedControl(host) {
	var self = this;
	this.userControls;
	
	this.init = function() {
		self.userControls = host.createUserControls(8);
	};
		
	this.userControl = function(index, val) {
		userControls.getControl(index).set(val, 128);
	};
	
	//Handlers
	this.userControl1 = function(direction, status, data1, val) {self.userControl(0, val);};
	this.userControl2 = function(direction, status, data1, val) {self.userControl(1, val);};
	this.userControl3 = function(direction, status, data1, val) {self.userControl(2, val);};
	this.userControl4 = function(direction, status, data1, val) {self.userControl(3, val);};
	this.userControl5 = function(direction, status, data1, val) {self.userControl(4, val);};
	this.userControl6 = function(direction, status, data1, val) {self.userControl(5, val);};
	this.userControl7 = function(direction, status, data1, val) {self.userControl(6, val);};
	this.userControl8 = function(direction, status, data1, val) {self.userControl(7, val);};
};