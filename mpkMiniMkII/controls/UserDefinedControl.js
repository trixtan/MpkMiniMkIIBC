co.nri.ud = {};

co.nri.ud.UserDefinedControl = function UserDefinedControl(registry, host) {
	var self = this;
	this.userControls;
	
	this.init = function() {
		self.userControls = host.createUserControls(8);
	};
		
	this.userControl = function(index, val) {
		userControls.getControl(index).set(val, 128);
	};
	
	//Handlers
	registry.setHandler('ud.userControl1', function(direction, status, data1, val) {self.userControl(0, val);});
	registry.setHandler('ud.userControl2', function(direction, status, data1, val) {self.userControl(1, val);});
	registry.setHandler('ud.userControl3', function(direction, status, data1, val) {self.userControl(2, val);});
	registry.setHandler('ud.userControl4', function(direction, status, data1, val) {self.userControl(3, val);});
	registry.setHandler('ud.userControl5', function(direction, status, data1, val) {self.userControl(4, val);});
	registry.setHandler('ud.userControl6', function(direction, status, data1, val) {self.userControl(5, val);});
	registry.setHandler('ud.userControl7', function(direction, status, data1, val) {self.userControl(6, val);});
	registry.setHandler('ud.userControl8', function(direction, status, data1, val) {self.userControl(7, val);});
};