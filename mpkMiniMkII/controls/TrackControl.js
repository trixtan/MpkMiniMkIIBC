co.nri.tk = {};

co.nri.tk.TrackControl = function TrackControl(registry, host, device, transport, track) {
	var self = this;
	this.trackBank;
	
	this.canScrollUp = false;
	this.canScrollDown = false;
	this.canScrollLeft = false;
	this.canScrollRight = false;
	
	this.track0;
	this.track1;
	this.track2;
	this.track3;
	
	this.slots = [];
	
	this.init = function() {
			
		self.trackBank = host.createMainTrackBank(4, 2, 4);
		self.track0 = self.trackBank.getChannel(0).getClipLauncherSlots();
		self.track1 = self.trackBank.getChannel(1).getClipLauncherSlots();
		self.track2 = self.trackBank.getChannel(2).getClipLauncherSlots();
		self.track3 = self.trackBank.getChannel(3).getClipLauncherSlots();
		self.track0.setIndication(true);
		self.track1.setIndication(true);
		self.track2.setIndication(true);
		self.track3.setIndication(true);
		
		for (var i=0; i<4; i++) {
			var _trackSlots = [];
			for (var j=0; j<4; j++) {
				_trackSlots.push({
					isSelected: false,
					hasContent: false,
					isPlaying: false,
					isRecording: false,
					isQueued: false
				});
			}
			self.slots.push(_trackSlots);
		}
		//OBSERVERS
		for (var k=0; k<4; k++) {
			function setS(){
				var _track = self['track'+k];
				var _i = k;
				_track.addIsSelectedObserver(function(slotIndex, isSelected){
					//println('track : ' +_i + ' slot: ' + _i + ' is selected: '+ isSelected);
					self.slots[_i][slotIndex].isSelected = isSelected;
				});
				_track.addIsPlayingObserver(function(slotIndex, isPlaying){
					self.slots[_i][slotIndex].isPlaying = isPlaying;
				});
				_track.addHasContentObserver(function(slotIndex, hasContent){
					self.slots[_i][slotIndex].hasContent = hasContent;
				});
				_track.addIsRecordingObserver(function(slotIndex, isRecording){
					self.slots[_i][slotIndex].isRecording = isRecording;
				});
				_track.addIsQueuedObserver(function(slotIndex, isQueued){
					self.slots[_i][slotIndex].isQueued = isQueued;
				});
			};
			setS();
		}
		self.track1.addIsSelectedObserver(function(slotIndex){
			
		});
		
		self.trackBank.addChannelScrollPositionObserver(function(idx){
			self.trackIndex = idx;
			
		},-1);
		self.trackBank.addSceneScrollPositionObserver(function(idx){
			self.sceneIndex = idx;
	
		},-1);
		self.trackBank.addCanScrollTracksUpObserver(function(can){
			self.canScrollLeft = can;
		});
		self.trackBank.addCanScrollTracksDownObserver(function(can){
			self.canScrollRight = can;
		});
		self.trackBank.addCanScrollScenesUpObserver(function(can){
			self.canScrollUp = can;
		});
		self.trackBank.addCanScrollScenesDownObserver(function(can){
			self.canScrollDown = can;
		});
		
		//HANDLERS
		registry.setHandler('tk.trackBankRight', function(direction, status, data1, val) {
			if(val === 0) return;
			if(!self.canScrollRight) return;
			self.trackBank.scrollTracksPageDown();
		});
		
		registry.setHandler('tk.trackBankLeft', function(direction, status, data1, val) {
			if(val === 0) return;
			if(!self.canScrollLeft) return;
			self.trackBank.scrollTracksPageUp();
		});
		
		registry.setHandler('tk.trackBankDown', function(direction, status, data1, val) {
			if(val === 0) return;
			if(!self.canScrollDown) return;
			self.trackBank.scrollScenesPageDown();
		});
		
		registry.setHandler('tk.trackBankUp', function(direction, status, data1, val) {
			if(val === 0) return;
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
			self.slot(0, 1, val);
		});
		registry.setHandler('tk.slot2', function(direction, status, data1, val) {
			self.slot(1, 1, val);
		});
		registry.setHandler('tk.slot3', function(direction, status, data1, val) {
			self.slot(2, 1, val);
		});
		registry.setHandler('tk.slot4', function(direction, status, data1, val) {
			self.slot(3, 1, val);
		});
		registry.setHandler('tk.slot5', function(direction, status, data1, val) {
			self.slot(0, 0, val);
		});
		registry.setHandler('tk.slot6', function(direction, status, data1, val) {
			self.slot(1, 0, val);
		});
		registry.setHandler('tk.slot7', function(direction, status, data1, val) {
			self.slot(2, 0, val);
		});
		registry.setHandler('tk.slot8', function(direction, status, data1, val) {
			self.slot(3, 0, val);
		});
		registry.setHandler('tk.slot9', function(direction, status, data1, val) {
			self.slot(0, 3, val);
		});
		registry.setHandler('tk.slot10', function(direction, status, data1, val) {
			self.slot(1, 3, val);
		});
		registry.setHandler('tk.slot11', function(direction, status, data1, val) {
			self.slot(2, 3, val);
		});
		registry.setHandler('tk.slot12', function(direction, status, data1, val) {
			self.slot(3, 3, val);
		});
		registry.setHandler('tk.slot13', function(direction, status, data1, val) {
			self.slot(0, 2, val);
		});
		registry.setHandler('tk.slot14', function(direction, status, data1, val) {
			self.slot(1, 2, val);
		});
		registry.setHandler('tk.slot15', function(direction, status, data1, val) {
			self.slot(2, 2, val);
		});
		registry.setHandler('tk.slot16', function(direction, status, data1, val) {
			self.slot(3, 2, val);
		});
	};
	
	this.handleTrackBankScroll = function () {
		
		
	};
	
	this.selectSlotInBank = function(trackIndex, slotIndex) {
		if(!self.trackBank) return;
		var channel = self.getChannel(trackIndex);
		if(!channel) return;
		var clips = channel.getClipLauncherSlots();
		clips.select(slotIndex);
	};
	
	this.slot = function(trackIndex, slotIndex, val) {
		if(val === 0) return;
		var _track = self['track' + trackIndex];
		var _slot = self.slots[trackIndex][slotIndex];
		if (!_slot.isSelected) {
			println('selecting slot ' + slotIndex);
			_track.select(slotIndex);
			self.trackBank.getChannel(trackIndex).select();
		}
		else if(!_slot.hasContent) {
			println('record');
			//Start rec on transport
			if(!registry.getStatus('tc.isPlaying')) {
				registry.getHandler('tc.play')();
			}
			_track.record(slotIndex);
		}
		else if(_slot.hasContent && !_slot.isQueued && !_slot.isRecording && !_slot.isPlaying) {
			println('launching');
			_track.launch(slotIndex);
		}
		else if(_slot.hasContent && (_slot.isQueued || _slot.isRecording || _slot.isPlaying)) {
			println('stopping');
			var playAfterStop = _slot.isRecording;
			_track.stop();
			if(playAfterStop) {
				//registry.getHandler('tc.play')();
				_track.showInEditor(slotIndex);
			}
		}
		
		//is playing or is recording? -> stop
		//is not empty and double click? -> overdub
	};
	
};