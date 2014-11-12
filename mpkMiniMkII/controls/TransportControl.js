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
		var bpm = co.nri.tr.tapTempo();
		if (bpm) {
			transport.getTempo().set(bpm - 20, 647);
		}
	});
	
	registry.setHandler(co.nri.tr.OD, function(direction, status, data1, val) {
		if(val === 0) return;
		transport.toggleOverdub();
	});
};

//TAP Tempo
co.nri.tr.timestamp = function timestamp() {
    return (new Date()).getTime();
};

co.nri.tr.state = {
	bpm_tap: {
		bpm: [],
		ts: []
	}
};

co.nri.tr.tapTempo = function tapTempo() {
	var bpm, bpm_last, bpm_median, bpm_average = 0;
	var ts_now = co.nri.tr.timestamp();
	var ts_len = co.nri.tr.state.bpm_tap.ts.length;
	var ts_len_h = parseInt( ts_len/2 );
	var ts_last = co.nri.tr.state.bpm_tap.ts[ ts_len - 1 ];
	if ( ts_last === undefined || ts_now - ts_last > 1000 ) {
		co.nri.tr.state.bpm_tap.bpm = [];
		co.nri.tr.state.bpm_tap.ts = [ ts_now ];
		return false;
	} else {
		bpm = 60000 / ( ts_now - ts_last );
		co.nri.tr.state.bpm_tap.bpm.push( bpm );
		co.nri.tr.state.bpm_tap.ts.push( ts_now );
	}
	if ( ts_len > 5 ) {
		bpm_median = Math.round( co.nri.tr.state.bpm_tap.bpm.sort()[ ts_len_h - 1 ] );
		//bpm_average += state.bpm_tap.bpm[ ts_len_h - 2 ];
		bpm_average += co.nri.tr.state.bpm_tap.bpm[ ts_len_h - 1 ];
		bpm_average += co.nri.tr.state.bpm_tap.bpm[ ts_len_h - 0 ];
		bpm_average += co.nri.tr.state.bpm_tap.bpm[ ts_len_h + 1 ];
		bpm_average = Math.round( bpm_average / 3 );
		return Math.round(( bpm_median + bpm_average ) / 2);
	}
	return false;
};