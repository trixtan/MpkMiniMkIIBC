co.nri.tk = {};

co.nri.tk.SCENES_NUM = 2;

co.nri.tk.TrackControl = function TrackControl(registry, host, device, transport, track, application) {
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
		self.trackBank = host.createMainTrackBank(4, 2, co.nri.tk.SCENES_NUM);
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
			for (var j=0; j<co.nri.tk.SCENES_NUM; j++) {
				_trackSlots.push({
					isSelected: false,
					hasContent: false,
					isPlaying: false,
					isRecording: false,
					isQueued: false
				});
			}
			self.slots.push({
				trackSelected: false,
				trackSlots: _trackSlots
			});
		}
		//OBSERVERS
		for (var k=0; k<4; k++) {
			function setS(){
				var _track = self['track'+k];
				var _i = k;
				self.trackBank.getChannel(_i).addIsSelectedObserver(function(isSelected){
					self.slots[_i].trackSelected = isSelected;
				});
				_track.addIsSelectedObserver(function(slotIndex, isSelected){
					self.slots[_i].trackSlots[slotIndex].isSelected = isSelected;
				});
				_track.addIsPlayingObserver(function(slotIndex, isPlaying){
					self.slots[_i].trackSlots[slotIndex].isPlaying = isPlaying;
				});
				_track.addHasContentObserver(function(slotIndex, hasContent){
					self.slots[_i].trackSlots[slotIndex].hasContent = hasContent;
				});
				_track.addIsRecordingObserver(function(slotIndex, isRecording){
					self.slots[_i].trackSlots[slotIndex].isRecording = isRecording;
				});
				_track.addIsQueuedObserver(function(slotIndex, isQueued){
					self.slots[_i].trackSlots[slotIndex].isQueued = isQueued;
				});
			};
			setS();
		}
		
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
		registry.setHandler('tk.left', function(direction, status, data1, val) {
			if(val === 0) return;
			track.selectPrevious();
		});

		registry.setHandler('tk.right', function(direction, status, data1, val) {
			if(val === 0) return;
			track.selectNext();
		});

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
		registry.setHandler('tk.deleteSlot1', function(direction, status, data1, val) {
			self.deleteSlot(0, 1);
		});
		registry.setHandler('tk.deleteSlot2', function(direction, status, data1, val) {
			self.deleteSlot(1, 1);
		});
		registry.setHandler('tk.deleteSlot3', function(direction, status, data1, val) {
			self.deleteSlot(2, 1);
		});
		registry.setHandler('tk.deleteSlot4', function(direction, status, data1, val) {
			self.deleteSlot(3, 1);
		});
		registry.setHandler('tk.deleteSlot5', function(direction, status, data1, val) {
			self.deleteSlot(0, 0);
		});
		registry.setHandler('tk.deleteSlot6', function(direction, status, data1, val) {
			self.deleteSlot(1, 0);
		});
		registry.setHandler('tk.deleteSlot7', function(direction, status, data1, val) {
			self.deleteSlot(2, 0);
		});
		registry.setHandler('tk.deleteSlot8', function(direction, status, data1, val) {
			self.deleteSlot(3, 0);
		});
	};
	
	this.selectSlotInBank = function(trackIndex, slotIndex) {
		if(!self.trackBank) return;
		var channel = self.getChannel(trackIndex);
		if(!channel) return;
		var clips = channel.getClipLauncherSlots();
		clips.select(slotIndex);
	};

	this.deleteSlot = function(trackIndex, slotIndex, val) {
		if(val === 0) return;
		self.select(trackIndex, slotIndex);
		application.remove();
	};

	this.slot = function(trackIndex, slotIndex, val) {
		if(val === 0) return;
		var _slot = self.slots[trackIndex].trackSlots[slotIndex];
		var _track = self['track' + trackIndex];

		if(!_slot.isSelected) {
			//println('select track: ' + trackIndex + ' slot: ' + slotIndex);
			self.select(trackIndex, slotIndex);
		}
		else if(!_slot.hasContent) {
			self.select(trackIndex, slotIndex);
			//Start rec on transport
			if(!registry.getStatus('tc.isPlaying')) {
				registry.getHandler('tc.play')();
			}
			_track.record(slotIndex);
		}
		else if(_slot.hasContent && !_slot.isQueued && !_slot.isRecording && !_slot.isPlaying) {
			self.select(trackIndex, slotIndex);
			_track.launch(slotIndex);
		}
		else if(_slot.hasContent && (_slot.isQueued || _slot.isRecording || _slot.isPlaying)) {
			self.select(trackIndex, slotIndex);
			var playAfterStop = _slot.isRecording;
			_track.stop();
			if(playAfterStop) {
				_track.launch(slotIndex);
				_track.showInEditor(slotIndex);
			}
		}
	};

	this.select = function(trackIndex, slotIndex) {
		var _slot = self.slots[trackIndex].trackSlots[slotIndex];
		var _track = self['track' + trackIndex];
		_track.select(slotIndex);
		self.trackBank.getChannel(trackIndex).select();
	};
	
};