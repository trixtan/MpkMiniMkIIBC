const PARAMETER_PAGES_COUNT = 32;
const MIN_PAGE_SWITCH_PROGRAM_CHANGE = 0;
const MAX_PAGE_SWITCH_PROGRAM_CHANGE = 31;

function DeviceControl(host, device) {
	var self = this;
	this.parameterPages = [];
	
	this.init = function() {
	
		device.addPageNamesObserver(function () {
			if (!arguments)
				return;
			for (var i = 0; i < arguments.length && i < PARAMETER_PAGES_COUNT; i++) {
				self.parameterPages[i] = arguments[i];
			}
		});
		
	};
	
	this.pPage = function(pageIndex) {
		if(pageIndex < MIN_PAGE_SWITCH_PROGRAM_CHANGE ||
		  pageIndex > MAX_PAGE_SWITCH_PROGRAM_CHANGE) {
		  return;
		}
		device.setParameterpPage(pageIndex);
		host.showPopupNotification(self.parameterPages[pageIndex]);
	};
	
	this.pageParameter = function(index, val) {
		device.getParameter(index).set(val, 128);	
	};
	
	//Handlers
	this.pageParameter1 = function(direction, status, data1, val) {self.pageParameter(0, val);};
	this.pageParameter2 = function(direction, status, data1, val) {self.pageParameter(1, val);};
	this.pageParameter3 = function(direction, status, data1, val) {self.pageParameter(2, val);};
	this.pageParameter4 = function(direction, status, data1, val) {self.pageParameter(3, val);};
	this.pageParameter5 = function(direction, status, data1, val) {self.pageParameter(4, val);};
	this.pageParameter6 = function(direction, status, data1, val) {self.pageParameter(5, val);};
	this.pageParameter7 = function(direction, status, data1, val) {self.pageParameter(6, val);};
	this.pageParameter8 = function(direction, status, data1, val) {self.pageParameter(7, val);};
	
	this.pPage1 = function(direction, status, data1, val) {self.pPage(0);};
	this.pPage2 = function(direction, status, data1, val) {self.pPage(1);};
	this.pPage3 = function(direction, status, data1, val) {self.pPage(2);};
	this.pPage4 = function(direction, status, data1, val) {self.pPage(3);};
	this.pPage5 = function(direction, status, data1, val) {self.pPage(4);};
	this.pPage6 = function(direction, status, data1, val) {self.pPage(5);};
	this.pPage7 = function(direction, status, data1, val) {self.pPage(6);};
	this.pPage8 = function(direction, status, data1, val) {self.pPage(7);};
	this.pPage9 = function(direction, status, data1, val) {self.pPage(8);};
	this.pPage10 = function(direction, status, data1, val) {self.pPage(9);};
	this.pPage11 = function(direction, status, data1, val) {self.pPage(10);};
	this.pPage12 = function(direction, status, data1, val) {self.pPage(11);};
	this.pPage13 = function(direction, status, data1, val) {self.pPage(12);};
	this.pPage14 = function(direction, status, data1, val) {self.pPage(13);};
	this.pPage15 = function(direction, status, data1, val) {self.pPage(14);};
	this.pPage16 = function(direction, status, data1, val) {self.pPage(15);};
	this.pPage17 = function(direction, status, data1, val) {self.pPage(16);};
	this.pPage18 = function(direction, status, data1, val) {self.pPage(17);};
	this.pPage19 = function(direction, status, data1, val) {self.pPage(18);};
	this.pPage20 = function(direction, status, data1, val) {self.pPage(19);};
	this.pPage21 = function(direction, status, data1, val) {self.pPage(20);};
	this.pPage22 = function(direction, status, data1, val) {self.pPage(21);};
	this.pPage23 = function(direction, status, data1, val) {self.pPage(22);};
	this.pPage24 = function(direction, status, data1, val) {self.pPage(23);};
	this.pPage25 = function(direction, status, data1, val) {self.pPage(24);};
	this.pPage26 = function(direction, status, data1, val) {self.pPage(25);};
	this.pPage27 = function(direction, status, data1, val) {self.pPage(26);};
	this.pPage28 = function(direction, status, data1, val) {self.pPage(27);};
	this.pPage29 = function(direction, status, data1, val) {self.pPage(28);};
	this.pPage30 = function(direction, status, data1, val) {self.pPage(29);};
	this.pPage31 = function(direction, status, data1, val) {self.pPage(30);};
	this.pPage32 = function(direction, status, data1, val) {self.pPage(31);};
	
};