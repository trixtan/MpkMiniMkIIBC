function TransportControl(host, device, transport) {
	var self = this;

	// Handlers
	this.play = function(direction, status, data1, val) {
		transport.play();		
	};
	
	this.stop = function(direction, status, data1, val) {
		transport.stop();
	};
	
	this.rec = function(direction, status, data1, val) {
		transport.record();
	};
	
	this.loop = function(direction, status, data1, val) {
		transport.toggleLoop();
	};
	
	this.tap = function(direction, status, data1, val) {
		var bpm = tapTempo();
		if (bpm) {
			transport.getTempo().set(bpm - 20, 647);
		}
	};
	
	this.od = function(direction, status, data1, val) {
		transport.toggleOverdub();
	};
};

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