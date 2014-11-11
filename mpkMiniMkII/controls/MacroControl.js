co.nri.mc = {};

co.nri.mc.MacroControl = function MacroControl(registry, host, device) {
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
	registry.setHandler('mc.macro1', function(direction, status, data1, val) {self.macro(0, val);});
	registry.setHandler('mc.macro2', function(direction, status, data1, val) {self.macro(1, val);});
	registry.setHandler('mc.macro3', function(direction, status, data1, val) {self.macro(2, val);});
	registry.setHandler('mc.macro4', function(direction, status, data1, val) {self.macro(3, val);});
	registry.setHandler('mc.macro5', function(direction, status, data1, val) {self.macro(4, val);});
	registry.setHandler('mc.macro6', function(direction, status, data1, val) {self.macro(5, val);});
	registry.setHandler('mc.macro7', function(direction, status, data1, val) {self.macro(6, val);});
	registry.setHandler('mc.macro8', function(direction, status, data1, val) {self.macro(7, val);});
};