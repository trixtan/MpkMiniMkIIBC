function MacroControl(host, device) {
	var self = this;
	
	this.init = function() {
	
		for ( var p = 0; p < 8; p++)
		{
		  var macro = device.getMacro(p);
		  macro.getAmount().setIndication(true);
		}
		
	};
		
	this.macro = function(index, val) {
		device.getMacro(index).getAmount().set(val, 127);	
	};
	
	//Handlers
	this.macro1 = function(direction, status, data1, val) {self.macro(0, val);};
	this.macro2 = function(direction, status, data1, val) {self.macro(1, val);};
	this.macro3 = function(direction, status, data1, val) {self.macro(2, val);};
	this.macro4 = function(direction, status, data1, val) {self.macro(3, val);};
	this.macro5 = function(direction, status, data1, val) {self.macro(4, val);};
	this.macro6 = function(direction, status, data1, val) {self.macro(5, val);};
	this.macro7 = function(direction, status, data1, val) {self.macro(6, val);};
	this.macro8 = function(direction, status, data1, val) {self.macro(7, val);};
};