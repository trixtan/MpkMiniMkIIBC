co.nri.tk = {};

co.nri.tk.TrackControl = function TrackControl(registry, host, device, transport, track) {
	var self = this;
	
	this.slots;
	this.selectedSlot = 0;
	this.selectedTrack;
	
	this.init = function() {
		
		var trackBank;
		self.slots = host.createCursorTrack(8,8).getClipLauncherSlots();
		self.slots.setIndication(false)
		
		registry.setHandler('tk.nextTrack', function(direction, status, data1, val) {
			if(val === 0) return;
			track.selectNext();
		});
		
		registry.setHandler('tk.prevTrack', function(direction, status, data1, val) {
			if(val === 0) return;
			track.selectPrevious();
			//println(trackBank.getTrack(0));
			
		});
		
		registry.setHandler('tk.nextSlot', function(direction, status, data1, val) {
			if(val === 0) return;
			//track.getClipLauncherSlots().select(++self.selectedSlot);#
			//println(trackBank.getTrack(0).getClipLauncherSlots());
			self.slots.select(++self.selectedSlot);
		});
		
		registry.setHandler('tk.prevSlot', function(direction, status, data1, val) {
			if(val === 0) return;
			if(self.selectedSlot === 0) return;
			
			self.slots.select(--self.selectedSlot);
		});
		
	};
	
};