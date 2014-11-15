load("controls/CommonControlFunctions.js");
load("controls/DeviceControl.js");
load("controls/MacroControl.js");
load("controls/TransportControl.js");
load("controls/UserDefinedControl.js");
load("controls/TrackControl.js");
load("HandlersRegistry.js");
load("Mappings.js");

co.nri.DBL_CLICK_THRESHOLD = 200; //ms

co.nri.MpkMiniMkII = function MpkMiniMkII(host) {
  var self = this;
  this.handlersRegistry;
  this.mappings;

  this.init = function() {
	application = host.createApplication();
	transport = host.createTransport();
	track = host.createCursorTrack(2, 0);
	device = track.getPrimaryDevice();
	var midiOut = host.getMidiOutPort(0);
	var midiIn = host.getMidiInPort(0);
	
	self.handlersRegistry = new co.nri.HandlersRegistry();
	co.nri.CommonControlFunctions(self.handlersRegistry, midiOut);
	self.mappings = new co.nri.MkIIMappings(self.handlersRegistry);
	
	var tc = new co.nri.tr.TransportControl(self.handlersRegistry, host, device, transport, track);
	var dv = new co.nri.dv.DeviceControl(self.handlersRegistry, host, device, transport, track);
	var mc = new co.nri.mc.MacroControl(self.handlersRegistry, host, device, transport, track);
	var ud = new co.nri.ud.UserDefinedControl(self.handlersRegistry, host, device, transport, track);
	var tk = new co.nri.tk.TrackControl(self.handlersRegistry, host, device, transport, track, application);
	tc.init();
	dv.init();
	mc.init();
	ud.init();
	tk.init();
	self.mappings.init();
	
	//NOTE INPUTS
	var createNoteInputFunction = midiIn.createNoteInput;
	for(var i=0; i<self.mappings.noteInputs.length; i++) {
		var noteInput = createNoteInputFunction.apply(midiIn, self.mappings.noteInputs[i].slice(1));
		noteInput.setShouldConsumeEvents(self.mappings.noteInputs[i][0]);
	} 
  };

  

  /*
  this.playPadNote = function(status, note, val) {
	var padIndex = mappings.getZeroBasedPadIndexFromNoteStatus(status);
    var padShift = padIndex * 8;
    track.playNote(note + padShift, val);
  };*/

  this.handleMidi = function (status, data1, data2) {
		var functionId = self.mappings.getFunctionId(status, data1);
		var handler = self.handlersRegistry.getHandler(functionId);
		if(handler) {
			handler(MidiDirection.IN, status, data1, data2);
		} else {
			println('WARNING: no map for status: ' + status + ' data1: ' + data1 + ' data2: ' + data2);
		}
  };

};