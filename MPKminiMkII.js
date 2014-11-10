load("Mappings.js");

const PARAMETER_PAGES_COUNT = 32;

const MIN_PAGE_SWITCH_PROGRAM_CHANGE = 0;
const MAX_PAGE_SWITCH_PROGRAM_CHANGE = 31;

function MpkMiniMkII(host) {
  var self = this;
  this.parameterPages = [];
    
  this.loadMappings = function() {
	for (var key in MKII_MAPPINGS.PROG01.PADS) {
		var obj = validation_messages[key];
	}
  };

  this.init = function() {
	this.loadMappings();

	var createNoteInputFunction = host.getMidiInPort(0).createNoteInput;
	for(var i=0; i<mappings.noteInputs.length; i++) {
		var noteInput = createNoteInput.apply(null, mappings.noteInputs[i].slice(1));
		noteInput.setShouldConsumeEvents(mappings.noteInputs[i][0]);
	}
	/*
	var keys = host.getMidiInPort(0).createNoteInput("MPKmini mkII Keys", "80????", "90????", "B001??", "B040??", "D0????", "E0????");
	var padsProg1 = host.getMidiInPort(0).createNoteInput("MPKmini mkII Pads PROG1", "81????", "91????", "D1????", "E1????");
    padsProg1.setShouldConsumeEvents(false);
	var padsProg2 = host.getMidiInPort(0).createNoteInput("MPKmini mkII Pads PROG2", "82????", "92????", "D2????", "E2????");
    padsProg2.setShouldConsumeEvents(false);
	var padsProg3 = host.getMidiInPort(0).createNoteInput("MPKmini mkII Pads PROG3", "83????", "93????", "D3????", "E3????");
    padsProg3.setShouldConsumeEvents(false);
	var padsProg4 = host.getMidiInPort(0).createNoteInput("MPKmini mkII Pads PROG4", "84????", "94????", "D4????", "E4????");
    padsProg4.setShouldConsumeEvents(false);
	*/
	var midi_out = host.getMidiOutPort(0);

	// /////////////////////////////////////////////// host sections

	application = host.createApplication();
	transport = host.createTransport();
	track = host.createCursorTrack(2, 0);
	device = track.getPrimaryDevice();
	
	track.getSolo().addValueObserver(function(on)
	{
		sendNoteOn(9, 40, on ? 1 : 0);
		sendMidi(201, 0, on ? 1 : 0);
	});
	
	
	// Transport observers
	/*
    transport.addIsPlayingObserver(function(isPlaying) {
        midi_out.sendMidi(PADS_PROG_1_CC_STATUS, play, isPlaying ? 127 : 0);
    });

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
	*/
	

    //Initializes pages
    for(var i=0; i<PARAMETER_PAGES_COUNT; i++) {
      self.parameterPages.push(new ParameterPage());
    }

    device.addPageNamesObserver(function () {
      if(!arguments) return;
      for(var i=0; i<arguments.length && i<PARAMETER_PAGES_COUNT; i++) {
        self.parameterPages[i].name = arguments[i];
      }
    });

    //Macro for Knobs CC 10 to 17
    for ( var p = 0; p < 8; p++)
    {
      var macro = device.getMacro(p);
      macro.getAmount().setIndication(true);
    }

    // Knobs CC 18 to 25 are freely mappable
    userControls = host.createUserControls(8);
  };

  this.togglePage = function(pageIndex) {
    if(pageIndex < MIN_PAGE_SWITCH_PROGRAM_CHANGE ||
      pageIndex > MAX_PAGE_SWITCH_PROGRAM_CHANGE) {
      return;
    }
    device.setParameterPage(pageIndex);
    host.showPopupNotification(self.parameterPages[pageIndex].name);
  };

  this.playPadNote = function(status, note, val) {
	var padIndex = mappings.getZeroBasedPadIndexFromNoteStatus(status);
    var padShift = padIndex * 8;
    track.playNote(note + padShift, val);
  };

  
  this.handleTransportControl = function(cc, val) {
	switch (cc)
	{
		case mappings.play:
			transport.play();
			break;
		case mappings.stop:
			transport.stop();
			break;
		case mappings.rec:
			transport.record();
			break;
		case mappings.loop:
			transport.toggleLoop();
			break;
		case mappings.tap:
			var bpm = tapTempo();
			if ( bpm ) {
				transport.getTempo().set( bpm - 20, 647 );
			}
			break;
		case mappings.od:
			transport.toggleOverdub();
			break;
		case note:
			application.toggleNoteEditor();
			break;
		case automation:
			application.toggleAutomationEditor();
			break;
		case mixer:
			application.toggleMixer();
			break;
		case device:
			application.toggleDevices();
			break;
		case shiftPadsUp:
			if (padShift < 88)
			{
				padShift += 8;
			}
			break;
		case shiftPadsDown:
			if (padShift > -40)
			{
				padShift -= 8;
			}
			break;
		case prevDevice:
			device.selectPrevious();
			break;
		case nextDevice:
			device.selectNext();
			break;
		case cursorTrackUp:
			track.selectPrevious();
			break;
		case cursorTrackDown:
			track.selectNext();
			break;
	};
  }; 

  this.handleMidi = function (status, data1, data2) {
    logToNode(status + ' ' + data1 + ' ' + data2);
    if(mappings.isAParameterPageChangeStatus(status)) {
      //Handle page change
	  if(var padIndex = mappings.getParameterPageFromStatusAndPc(status, data1)) {
		self.togglePage(padIndex);
	  }
    } else if (mappings.isTransportControlStatus(status)) {
      self.handleTransportControl(data1, data2);
    } else if(mappings.isAKnob()) {
	  var knobIndex;
      if(knobIndex = mappings.getPageParameterControlKnobIndex(status, data1)) {
		//Page Parameter
        device.getParameter(knobIndex).set(data2, 128);
      } 
	  else if (knobIndex = mappings.getMacroControlKnobIndex(status, data1)) {
		//Macros
        device.getMacro(knobIndex).getAmount().set(data2, 128);
      }
	  else if (knobIndex = mappings.getUserDeviceControlKnobIndex(status, cc)) {
        //User mappable knobs
        userControls.getControl(knobIndex).set(data2, 128);
      }
    } else if(mappings.isAPadNote(status)) {
      self.playPadNote(status, data1, data2);
    }
  };

};

function getKnobParameterIndexFromCC(cc) {
  //In every page, positions 0 to 7 are for knobs controls
  return (cc - 2) % 8;
};

function logToNode(message)
{
  /*
	host.connectToRemoteHost('127.0.0.1', 58008, function(conn) {


    conn.send(message.getBytes());
    conn.disconnect();

  });
  */
}

function ParameterPage() {
  var self = this;
  this.name = null;

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