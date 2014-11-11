load("mkIIControls/DeviceControl.js");
load("mkIIControls/MacroControl.js");
load("mkIIControls/TransportControl.js");
load("mkIIControls/UserDefinedControl.js");
load("HandlersRegistry.js");
load("Mappings.js");

function MpkMiniMkII(host) {
  var self = this;
  this.handlersRegistry;
  this.mappings;

  this.init = function() {
	application = host.createApplication();
	transport = host.createTransport();
	track = host.createCursorTrack(2, 0);
	device = track.getPrimaryDevice();
	var midiOut = host.getMidiOutPort(0);
	
	var tc = new TransportControl(host, device, transport, midiOut);
	var dv = new DeviceControl(host, device, transport, midiOut);
	var mc = new MacroControl(host, device, transport, midiOut);
	var ud = new UserDefinedControl(host, device, transport, midiOut);
	tc.init();
	dv.init();
	mc.init();
	ud.init();
	
	self.handlersRegistry = new handlersRegistry();
	
	self.mappings = new MkIIMappings(self.handlersRegistry);
	
	//NOTE INPUTS
	var createNoteInputFunction = host.getMidiInPort(0).createNoteInput;
	for(var i=0; i<self.mappings.noteInputs.length; i++) {
		var noteInput = createNoteInput.apply(null, self.mappings.noteInputs[i].slice(1));
		noteInput.setShouldConsumeEvents(self.mappings.noteInputs[i][0]);
	}
	
	
	track.getSolo().addValueObserver(function(on)
	{
		sendNoteOn(9, 40, on ? 1 : 0);
		sendMidi(201, 0, on ? 1 : 0);
	}); 
  };

  

  /*
  this.playPadNote = function(status, note, val) {
	var padIndex = mappings.getZeroBasedPadIndexFromNoteStatus(status);
    var padShift = padIndex * 8;
    track.playNote(note + padShift, val);
  };*/

  }; 

  this.handleMidi = function (status, data1, data2) {
	
	var functionId = self.mappings.getFunctionId(status, data1);
	var handler = self.handlersRegistry.getHandler(functionId);
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

function logToNode(message)
{
  /*
	host.connectToRemoteHost('127.0.0.1', 58008, function(conn) {


    conn.send(message.getBytes());
    conn.disconnect();

  });
  */
}