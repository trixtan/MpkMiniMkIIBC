loadAPI(1);

host.defineController("Akai", "MPKmini mkII", "1.0", "c790467a-ce30-42d9-8deb-8070a6039c4b");
// "F0 7E 00 06 02 47 72 00 19 00 01 00 03 00 7F 7F 7F 7F 00 4B 01 00 09 00 09 00 02 03 09 00 08 09 07 02 F7";

host.defineSysexIdentityReply("F0 7E 00 06 02 47 7C 00 19 00 ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? ?? F7");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["MPK mini mkII"], ["MPK mini mkII"]);


String.prototype.getBytes = function () {
  var bytes = [];
  for (var i = 0; i < this.length; ++i) {
    bytes.push(this.charCodeAt(i));
  }

  return bytes;
};
load("MPKminiMkII.js");

function init()
{
	host.getMidiInPort(0).setMidiCallback(onMidi);
	host.getMidiInPort(0).createNoteInput("MPKmini mkII Keys", "80????", "90????", "B001??", "B040??", "D0????", "E0????");

	// /////////////////////////////////////////////// host sections

	application = host.createApplication();
	transport = host.createTransport();
	cursorTrack = host.createCursorTrack(2, 0);
	cursorDevice = cursorTrack.getPrimaryDevice();
	cursorTrack.getSolo().addValueObserver(function(on)
	{
		sendNoteOn(9, 40, on ? 1 : 0);
		sendMidi(201, 0, on ? 1 : 0);
	});

  mpkMiniMkII = new MpkMiniMkII(cursorDevice, host, cursorTrack);
  mpkMiniMkII.init();

}

function exit()
{
}

function onMidi(status, data1, data2)
{
  mpkMiniMkII.handleMidi(status, data1, data2);
}

function onSysex(data)
{
	// printSysex(data);
}