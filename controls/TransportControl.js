var PLAY = 'tc.play';
var STOP = 'tc.stop';
var REC = 'tc.rec';
var LOOP = 'tc.loop';
var TAP = 'tc.tap';
var OD = 'tc.od';

function TransportControl() {
	//Extends BaseControl
	BaseControl.call(this);
	var self = this;
	
	this.init = function(registry, host, device, transport, midiOut) {
		BaseControl.call(this, )
		
		transport.addIsRecordingObserver(function(isRecording) {
			midi_out.sendMidi(PADS_PROG_1_CC_STATUS, rec, isRecording ? 127 : 0);
		});

		transport.addOverdubObserver(function(isOvr) {
			midi_out.sendMidi(PADS_PROG_1_CC_STATUS, od, isOvr ? 127 : 0);
		});

		transport.addIsLoopActiveObserver(function(isLoop) {
			midi_out.sendMidi(PADS_PROG_1_CC_STATUS, loop, isLoop ? 127 : 0);
		});

		transport.addMetronomeTicksObserver(function(isClick) {
			println(isClick);
			// midi_out.sendMidi(0xb9, loop, isLoop ? 127 : 0);
		});
	};

	// Handlers
	registry.addHandler('tc.play') = function(direction, status, data1, val) {
		transport.play();		
	};
	
	registry.addHandler('tc.stop') = function(direction, status, data1, val) {
		transport.stop();
	};
	
	registry.addHandler('tc.rec') = function(direction, status, data1, val) {
		transport.record();
	};
	
	registry.addHandler('tc.loop') = function(direction, status, data1, val) {
		transport.toggleLoop();
	};
	
	registry.addHandler('tc.tap') = function(direction, status, data1, val) {
		var bpm = tapTempo();
		if (bpm) {
			transport.getTempo().set(bpm - 20, 647);
		}
	};
	
	registry.addHandler('tc.od') = function(direction, status, data1, val) {
		transport.toggleOverdub();
	};
};

BaseControl.prototype = new BaseControl();

//TAP Tempo
function timestamp() {
    return (new Date()).getTime();
};

var state = {
	bpm_tap: {
		bpm: [],
		ts: []
	}
};

function tapTempo() {
	var bpm, bpm_last, bpm_median, bpm_average = 0;
	var ts_now = timestamp();
	var ts_len = state.bpm_tap.ts.length;
	var ts_len_h = parseInt( ts_len/2 );
	var ts_last = state.bpm_tap.ts[ ts_len - 1 ];
	if ( ts_last === undefined || ts_now - ts_last > 1000 ) {
		state.bpm_tap.bpm = [];
		state.bpm_tap.ts = [ ts_now ];
		return false;
	} else {
		bpm = 60000 / ( ts_now - ts_last );
		state.bpm_tap.bpm.push( bpm );
		state.bpm_tap.ts.push( ts_now );
	}
	if ( ts_len > 5 ) {
		bpm_median = Math.round( state.bpm_tap.bpm.sort()[ ts_len_h - 1 ] );
		//bpm_average += state.bpm_tap.bpm[ ts_len_h - 2 ];
		bpm_average += state.bpm_tap.bpm[ ts_len_h - 1 ];
		bpm_average += state.bpm_tap.bpm[ ts_len_h - 0 ];
		bpm_average += state.bpm_tap.bpm[ ts_len_h + 1 ];
		bpm_average = Math.round( bpm_average / 3 );
		return Math.round(( bpm_median + bpm_average ) / 2);
	}
	return false;
};