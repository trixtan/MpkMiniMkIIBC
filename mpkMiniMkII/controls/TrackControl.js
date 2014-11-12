co.nri.tk = {};

co.nri.tk.TrackControl = function TrackControl(registry, host, device, transport, track) {
	var self = this;
	this.trackBank;
	
	this.slots = [];
	this.grid = [];
	this.canScrollUp = false;
	this.canScrollDown = false;
	this.canScrollLeft = false;
	this.canScrollRight = false;
	
	this.init = function() {
			
		self.trackBank = host.createMainTrackBank(4, 2, 2);
		
		self.trackBank.addCanScrollTracksUpObserver(function(can){
			self.canScrollRight = can;
		});
		self.trackBank.addCanScrollTracksDownObserver(function(can){
			self.canScrollLeft = can;
		});
		self.trackBank.ddCanScrollScenesUpObserver(function(can){
			self.canScrollUp = can;
		});
		self.trackBank.ddCanScrollScenesDownObserver(function(can){
			self.canScrollDown = can;
		});
		
			
		registry.setHandler('tk.trackBankRight', function(direction, status, data1, val) {
			if(!self.canScrollRight) return;
			self.trackBank.scrollTracksPageUp();
		});
		
		registry.setHandler('tk.trackBankLeft', function(direction, status, data1, val) {
			if(!self.canScrollLeft) return;
			self.trackBank.scrollTracksPageDown();
		});
		
		registry.setHandler('tk.trackBankDown', function(direction, status, data1, val) {
			if(!self.canScrollDown) return;
			self.trackBank.scrollScenesPageDown();
		});
		
		registry.setHandler('tk.trackBankUp', function(direction, status, data1, val) {
			if(!self.canScrollUp) return;
			self.trackBank.scrollScenesPageUp();
		});
		
		registry.setHandler('tk.record', function(direction, status, data1, val) {
			if(val === 0) return;
			if(self.selectedSlot === 0) return;
			self.slots.select(self.selectedSlot);
			self.slots.record(self.selectedSlot);
		});
		
		registry.setHandler('tk.launch', function(direction, status, data1, val) {
			if(val === 0) return;
			if(self.selectedSlot === 0) return;
			self.slots.select(self.selectedSlot);
			self.slots.launch(self.selectedSlot);
		});
		
		registry.setHandler('tk.stop', function(direction, status, data1, val) {
			if(val === 0) return;
			if(self.selectedSlot === 0) return;
			
			self.slots.stop();
		});
		
		registry.setHandler('tk.slot1', function(direction, status, data1, val) {
			if(val === 0) return;
			if(self.selectedSlot === 0) return;
			
			self.slots.stop();
		});
	};
	
	this.handleTrackBankScroll = function () {
		//TODO: indication
	};
	
	this.selectSlotInBank = function(trackIndex, slotIndex) {
		//TODO: can I select? do observers!
		self.getChannel(trackIndex).getClipLauncherSlots().select(slotIndex);
	};
	
	this.slot = function () {
		//is empty? -> record
		//is not empty? -> launch
		//is playing or is recording? -> stop
		//is not empty and double click? -> overdub
	};
	
};