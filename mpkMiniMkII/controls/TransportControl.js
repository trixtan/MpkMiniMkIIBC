co.nri.tr = {};

co.nri.tr.PLAY = 'tc.play';
co.nri.tr.STOP = 'tc.stop';
co.nri.tr.REC = 'tc.rec';
co.nri.tr.LOOP = 'tc.loop';
co.nri.tr.TAP = 'tc.tap';
co.nri.tr.OD = 'tc.od';

co.nri.tr.TransportControl = function TransportControl(registry, host, device, transport, midiOut) {
	var self = this;
	
	this.init = function() {

		transport.addIsPlayingObserver(function(isPlaying) {
			registry.setStatus('tc.isPlaying', isPlaying);
		});
		transport.addIsRecordingObserver(function(isRecording) {
			co.nri.sendMidi(co.nri.tr.REC, isRecording);
		});

		transport.addOverdubObserver(function(isOvr) {
			co.nri.sendMidi(co.nri.tr.OD, isOvr);
		});

		transport.addIsLoopActiveObserver(function(isLoop) {
			co.nri.sendMidi(co.nri.tr.LOOP, isLoop);
		});

		transport.addMetronomeTicksObserver(function(isClick) {
			println(isClick);
			// midi_out.sendMidi(0xb9, loop, isLoop ? 127 : 0);
		});
	};

	// Handlers
	registry.setHandler(co.nri.tr.PLAY, function(direction, status, data1, val) {
		if(val === 0) return;
		transport.play();		
	});
	
	registry.setHandler(co.nri.tr.STOP, function(direction, status, data1, val) {
		if(val === 0) return;
		transport.stop();
	});
	
	registry.setHandler(co.nri.tr.REC, function(direction, status, data1, val) {
		if(val === 0) return;
		transport.record();
	});
	
	registry.setHandler(co.nri.tr.LOOP, function(direction, status, data1, val) {
		if(val === 0) return;
		transport.toggleLoop();
	});
	
	registry.setHandler(co.nri.tr.TAP, function(direction, status, data1, val) {
		if(val === 0) return;
                transport.tapTempo();
	});
	
	registry.setHandler(co.nri.tr.OD, function(direction, status, data1, val) {
		if(val === 0) return;
		transport.toggleOverdub();
	});
};

