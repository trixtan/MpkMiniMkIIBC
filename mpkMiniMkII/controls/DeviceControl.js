co.nri.dv = {};

co.nri.dv.PARAMETER_PAGES_COUNT = 32;
co.nri.dv.MIN_PAGE_SWITCH_PROGRAM_CHANGE = 0;
co.nri.dv.MAX_PAGE_SWITCH_PROGRAM_CHANGE = 31;

co.nri.dv.DeviceControl = function DeviceControl(registry, host, device) {
	var self = this;
	this.parameterPages = [];
	
	this.init = function() {
		
		registry.dv = {};
	
		device.addPageNamesObserver(function () {
			self.parameterPages.length = 0; //Empty pages
			if (!arguments)
				return;
			for (var i = 0; i < arguments.length && i < co.nri.dv.PARAMETER_PAGES_COUNT; i++) {
				self.parameterPages[i] = arguments[i];
			}
		});
		
	};
	
	this.pPage = function(pageIndex) {
		if(pageIndex < co.nri.dv.MIN_PAGE_SWITCH_PROGRAM_CHANGE ||
		  pageIndex > co.nri.dv.MAX_PAGE_SWITCH_PROGRAM_CHANGE) {
		  return;
		}
		device.setParameterPage(pageIndex);
		host.showPopupNotification(self.parameterPages[pageIndex]);
	};
	
	this.pageParameter = function(index, val) {
		device.getParameter(index).set(val, 128);	
	};
	
	//Handlers
	registry.setHandler('dv.pageParameter1', function(direction, status, data1, val) {self.pageParameter(0, val);});
	registry.setHandler('dv.pageParameter2', function(direction, status, data1, val) {self.pageParameter(1, val);});
	registry.setHandler('dv.pageParameter3', function(direction, status, data1, val) {self.pageParameter(2, val);});
	registry.setHandler('dv.pageParameter4', function(direction, status, data1, val) {self.pageParameter(3, val);});
	registry.setHandler('dv.pageParameter5', function(direction, status, data1, val) {self.pageParameter(4, val);});
	registry.setHandler('dv.pageParameter6', function(direction, status, data1, val) {self.pageParameter(5, val);});
	registry.setHandler('dv.pageParameter7', function(direction, status, data1, val) {self.pageParameter(6, val);});
	registry.setHandler('dv.pageParameter8', function(direction, status, data1, val) {self.pageParameter(7, val);});
	
	registry.setHandler('dv.pPage1', function(direction, status, data1, val) {self.pPage(0);});
	registry.setHandler('dv.pPage2', function(direction, status, data1, val) {self.pPage(1);});
	registry.setHandler('dv.pPage3', function(direction, status, data1, val) {self.pPage(2);});
	registry.setHandler('dv.pPage4', function(direction, status, data1, val) {self.pPage(3);});
	registry.setHandler('dv.pPage5', function(direction, status, data1, val) {self.pPage(4);});
	registry.setHandler('dv.pPage6', function(direction, status, data1, val) {self.pPage(5);});
	registry.setHandler('dv.pPage7', function(direction, status, data1, val) {self.pPage(6);});
	registry.setHandler('dv.pPage8', function(direction, status, data1, val) {self.pPage(7);});
	registry.setHandler('dv.pPage9', function(direction, status, data1, val) {self.pPage(8);});
	registry.setHandler('dv.pPage10', function(direction, status, data1, val) {self.pPage(9);});
	registry.setHandler('dv.pPage11', function(direction, status, data1, val) {self.pPage(10);});
	registry.setHandler('dv.pPage12', function(direction, status, data1, val) {self.pPage(11);});
	registry.setHandler('dv.pPage13', function(direction, status, data1, val) {self.pPage(12);});
	registry.setHandler('dv.pPage14', function(direction, status, data1, val) {self.pPage(13);});
	registry.setHandler('dv.pPage15', function(direction, status, data1, val) {self.pPage(14);});
	registry.setHandler('dv.pPage16', function(direction, status, data1, val) {self.pPage(15);});
	registry.setHandler('dv.pPage17', function(direction, status, data1, val) {self.pPage(16);});
	registry.setHandler('dv.pPage18', function(direction, status, data1, val) {self.pPage(17);});
	registry.setHandler('dv.pPage19', function(direction, status, data1, val) {self.pPage(18);});
	registry.setHandler('dv.pPage20', function(direction, status, data1, val) {self.pPage(19);});
	registry.setHandler('dv.pPage21', function(direction, status, data1, val) {self.pPage(20);});
	registry.setHandler('dv.pPage22', function(direction, status, data1, val) {self.pPage(21);});
	registry.setHandler('dv.pPage23', function(direction, status, data1, val) {self.pPage(22);});
	registry.setHandler('dv.pPage24', function(direction, status, data1, val) {self.pPage(23);});
	registry.setHandler('dv.pPage25', function(direction, status, data1, val) {self.pPage(24);});
	registry.setHandler('dv.pPage26', function(direction, status, data1, val) {self.pPage(25);});
	registry.setHandler('dv.pPage27', function(direction, status, data1, val) {self.pPage(26);});
	registry.setHandler('dv.pPage28', function(direction, status, data1, val) {self.pPage(27);});
	registry.setHandler('dv.pPage29', function(direction, status, data1, val) {self.pPage(28);});
	registry.setHandler('dv.pPage30', function(direction, status, data1, val) {self.pPage(29);});
	registry.setHandler('dv.pPage31', function(direction, status, data1, val) {self.pPage(30);});
	registry.setHandler('dv.pPage32', function(direction, status, data1, val) {self.pPage(31);});
	
};