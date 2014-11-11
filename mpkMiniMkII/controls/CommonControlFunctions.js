co.nri.CommonControlFunctions = function CommonControlFunctions(registry, midiOut) {
	var self = this;
	
	co.nri.sendMidi = function(functionId, val) {
		var _val = val ? val : 0;
		if(typeof val === 'boolean') {
			_val = val ? 127 : 0;
		}
		var midiMessages = registry.getMidiMessages(functionId);
		if(midiMessages) {
			for(var i=0; i<midiMessages.length; i++) {
				midiOut.sendMidi(midiMessages[i].status, midiMessages[i].target, _val);	
			}
		}
	};
	
};