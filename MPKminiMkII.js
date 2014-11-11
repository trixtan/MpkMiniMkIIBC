load("mkIIControls/DeviceControl.js");
load("mkIIControls/MacroControl.js");
load("mkIIControls/TransportControl.js");
load("mkIIControls/UserDefinedControl.js");
load("Mappings.js");

function MpkMiniMkII(host) {
  var self = this;

  this.init = function() {
	
	// /////////////////////////////////////////////// host sections

	application = host.createApplication();
	transport = host.createTransport();
	track = host.createCursorTrack(2, 0);
	device = track.getPrimaryDevice();
	
	var tc = new TransportControl(host, device, transport);
	var dv = new DeviceControl(host, device);
	var mc = new MacroControl(host, device);
	var ud = new UserDefinedControl(host, device);
	tc.init();
	dv.init();
	mc.init();
	ud.init();
	
	mappings = new MkIIMappings(tc, dv, mc, ud);
	
	//NOTE INPUTS
	var createNoteInputFunction = host.getMidiInPort(0).createNoteInput;
	for(var i=0; i<mappings.noteInputs.length; i++) {
		var noteInput = createNoteInput.apply(null, mappings.noteInputs[i].slice(1));
		noteInput.setShouldConsumeEvents(mappings.noteInputs[i][0]);
	}
	var midi_out = host.getMidiOutPort(0);
	
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
  };

  

  this.playPadNote = function(status, note, val) {
	var padIndex = mappings.getZeroBasedPadIndexFromNoteStatus(status);
    var padShift = padIndex * 8;
    track.playNote(note + padShift, val);
  };

  }; 

  this.handleMidi = function (status, data1, data2) {
	
	var handler = mappings.getHandler(status, data1);
	handler(MidiDirection.IN, status, data1, data2);
	
	/*
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
        
      }
	  else if (knobIndex = mappings.getUserDeviceControlKnobIndex(status, cc)) {
        //User mappable knobs
        userControls.getControl(knobIndex).set(data2, 128);
      }
    } else if(mappings.isAPadNote(status)) {
      self.playPadNote(status, data1, data2);
    }
	*/
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