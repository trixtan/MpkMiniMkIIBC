function BaseControl() {
	var self = this;
	this.registry;
	this.midiOut;
	
	this.init = function(registry, midiOut) {
		self.registry = registry;
	};
	
	this.sendMidi = function(functionId, val) {
		var midiMessages = self.registry.getMidiMessages(functionId);
		if(midiMessages) {
			for(var i=0; i<midiMessages.length; i++) {
				self.midiOut.sendMidi(midiMessages[i].status, midiMessages[i].target, val);	
			}
		}
	};
	
};