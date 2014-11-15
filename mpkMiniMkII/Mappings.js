load("Joystick.js");

const MidiDirection = {
	IN: 0, OUT:1
};


co.nri.MkIIMappings = function MkIIMappings(handlersRegistry) {
	var self = this;
	
	this.noteInputs= [
		//First element in array is consumeEvent
		[true, "MPKmini mkII Keys", "80????", "90????", "B001??", "B040??", "D0????", "E0????"],
		[true, "MPKmini mkII Pads PROG1", "81????", "91????", "D1????", "E1????"],
		[true, "MPKmini mkII Pads PROG2", "82????", "92????", "D2????", "E2????"],
		[true, "MPKmini mkII Pads PROG3", "83????", "93????", "D3????", "E3????"],
		[true, "MPKmini mkII Pads PROG4", "84????", "94????", "D4????", "E4????"],
	];

	this.PROGS = [
		// PROG1 START ***************
		{
			STATUS: {
				KNOBS: {
					CC: 176
				},
				PADS: {
					NOTE: 145,
					CC: 177,
					PC: 193
				}
			},
			PADS: [
				{CC:1, PC:0, ccH: 'tc.stop', pcH: 'dv.pPage1'}, //PAD01
				{CC:2, PC:1, ccH: 'tc.play', pcH: 'dv.pPage2'}, //PAD02
				{CC:3, PC:2, ccH: 'tc.rec', pcH: 'dv.pPage3'}, //PAD03
				{CC:4, PC:3, ccH: null, pcH: 'dv.pPage4'}, //PAD04
				{CC:5, PC:4, ccH: 'tc.loop', pcH: 'dv.pPage5'}, //PAD05
				{CC:6, PC:5, ccH: 'tc.tap', pcH: 'dv.pPage6'}, //PAD06
				{CC:7, PC:6, ccH: 'tc.od', pcH: 'dv.pPage7'}, //PAD07
				{CC:8, PC:7, ccH: null, pcH: 'dv.pPage8'}, //PAD08
				{CC:9, PC:8, ccH: null, pcH: 'dv.pPage9'}, //PAD09
				{CC:10, PC:9, ccH: null, pcH: 'dv.pPage10'}, //PAD10
				{CC:11, PC:10, ccH: null, pcH: 'dv.pPage11'}, //PAD11
				{CC:12, PC:11, ccH: null, pcH: 'dv.pPage12'}, //PAD12
				{CC:13, PC:12, ccH: null, pcH: 'dv.pPage13'}, //PAD13
				{CC:14, PC:13, ccH: null, pcH: 'dv.pPage14'}, //PAD14
				{CC:15, PC:14, ccH: null, pcH: 'dv.pPage15'}, //PAD15
				{CC:16, PC:15, ccH: null, pcH: 'dv.pPage16'} //PAD16
			],
			KNOBS: [
				{CC: 2, ccH: 'dv.pageParameter1'}, //K1
				{CC: 3, ccH: 'dv.pageParameter2'}, //K2
				{CC: 4, ccH: 'dv.pageParameter3'}, //K3
				{CC: 5, ccH: 'dv.pageParameter4'}, //K4
				{CC: 6, ccH: 'dv.pageParameter5'}, //K5
				{CC: 7, ccH: 'dv.pageParameter6'}, //K6
				{CC: 8, ccH: 'dv.pageParameter7'}, //K7
				{CC: 9, ccH: 'dv.pageParameter8'} //K8
			],
			JOYSTICK: {
				LEFT: {CC: 26, ccH: 'tk.left'},
				RIGHT: {CC: 27, ccH: 'tk.right'},
				UP: {CC: null},
				DOWN: {CC: null}
			}
		},
		// PROG2 START ***************
		{
			STATUS: {
				KNOBS: {
					CC: 176
				},
				PADS: {
					NOTE: 146, 
					CC: 178,
					PC: 194
				}
			},
			PADS: [
				{CC:1, PC:0, ccH: 'tk.slot1', pcH: 'dv.pPage17'}, //PAD01
				{CC:2, PC:1, ccH: 'tk.slot2', pcH: 'dv.pPage18'}, //PAD02
				{CC:3, PC:2, ccH: 'tk.slot3', pcH: 'dv.pPage19'}, //PAD03
				{CC:4, PC:3, ccH: 'tk.slot4', pcH: 'dv.pPage20'}, //PAD04
				{CC:5, PC:4, ccH: 'tk.slot5', pcH: 'dv.pPage21'}, //PAD05
				{CC:6, PC:5, ccH: 'tk.slot6', pcH: 'dv.pPage22'}, //PAD06
				{CC:7, PC:6, ccH: 'tk.slot7', pcH: 'dv.pPage23'}, //PAD07
				{CC:8, PC:7, ccH: 'tk.slot8', pcH: 'dv.pPage24'}, //PAD08
				{CC:9, PC:8, ccH: 'tk.deleteSlot1', pcH: 'dv.pPage25'}, //PAD09
				{CC:10, PC:9, ccH: 'tk.deleteSlot2', pcH: 'dv.pPage26'}, //PAD10
				{CC:11, PC:10, ccH: 'tk.deleteSlot3', pcH: 'dv.pPage27'}, //PAD11
				{CC:12, PC:11, ccH: 'tk.deleteSlot4', pcH: 'dv.pPage29'}, //PAD13
				{CC:13, PC:12, ccH: 'tk.deleteSlot5', pcH: 'dv.pPage28'}, //PAD12
				{CC:14, PC:13, ccH: 'tk.deleteSlot6', pcH: 'dv.pPage30'}, //PAD14
				{CC:15, PC:14, ccH: 'tk.deleteSlot7', pcH: 'dv.pPage31'}, //PAD15
				{CC:16, PC:15, ccH: 'tk.deleteSlot8', pcH: 'dv.pPage32'} //PAD16
			],
			KNOBS: [
				{CC: 2, ccH: 'dv.pageParameter1'}, //K1
				{CC: 3, ccH: 'dv.pageParameter2'}, //K2
				{CC: 4, ccH: 'dv.pageParameter3'}, //K3
				{CC: 5, ccH: 'dv.pageParameter4'}, //K4
				{CC: 6, ccH: 'dv.pageParameter5'}, //K5
				{CC: 7, ccH: 'dv.pageParameter6'}, //K6
				{CC: 8, ccH: 'dv.pageParameter7'}, //K7
				{CC: 9, ccH: 'dv.pageParameter8'} //K8
			],
			JOYSTICK: {
				LEFT: {CC:30, ccH: 'tk.trackBankLeft'},
				RIGHT: {CC: 31, ccH: 'tk.trackBankRight'},
				UP: {CC: 32, ccH: 'tk.trackBankUp'},
				DOWN: {CC: 33, ccH: 'tk.trackBankDown'}
			}
		},
		// PROG3 START ***************
		{
			STATUS: {
				KNOBS: {
					CC: 176
				},
				PADS: {
					NOTE: 147,
					CC: 179,
					PC: 195
				}
			},
			PADS: [
				{CC:1, PC:0, ccH: 'tk.slot1'}, //PAD01
				{CC:2, PC:1, ccH: 'tk.slot2'}, //PAD02
				{CC:3, PC:2, ccH: 'tk.slot3'}, //PAD03
				{CC:4, PC:3, ccH: 'tk.slot4'}, //PAD04
				{CC:5, PC:4, ccH: 'tk.slot5'}, //PAD05
				{CC:6, PC:5, ccH: 'tk.slot6'}, //PAD06
				{CC:7, PC:6, ccH: 'tk.slot7'}, //PAD07
				{CC:8, PC:7, ccH: 'tk.slot8'}, //PAD08
				{CC:9, PC:8, ccH: 'tk.deleteSlot1'}, //PAD09
				{CC:10, PC:9, ccH: 'tk.deleteSlot2'}, //PAD10
				{CC:11, PC:10, ccH: 'tk.deleteSlot3'}, //PAD11
				{CC:12, PC:11, ccH: 'tk.deleteSlot4'}, //PAD13
				{CC:13, PC:12, ccH: 'tk.deleteSlot5'}, //PAD12
				{CC:14, PC:13, ccH: 'tk.deleteSlot6'}, //PAD14
				{CC:15, PC:14, ccH: 'tk.deleteSlot7'}, //PAD15
				{CC:16, PC:15, ccH: 'tk.deleteSlot8'} //PAD16
			],
			KNOBS: [
				{CC: 10, ccH: 'mc.macro1'}, //K1
				{CC: 11, ccH: 'mc.macro2'}, //K2
				{CC: 12, ccH: 'mc.macro3'}, //K3
				{CC: 13, ccH: 'mc.macro4'}, //K4
				{CC: 14, ccH: 'mc.macro5'}, //K5
				{CC: 15, ccH: 'mc.macro6'}, //K6
				{CC: 16, ccH: 'mc.macro7'}, //K7
				{CC: 17, ccH: 'mc.macro8'} //K8
			],
			JOYSTICK: {
				LEFT: {CC:34, ccH: 'tk.trackBankLeft'},
				RIGHT: {CC: 35, ccH: 'tk.trackBankRight'},
				UP: {CC: 36, ccH: 'tk.trackBankUp'},
				DOWN: {CC: 37, ccH: 'tk.trackBankDown'}
			}
		},
		// PROG4 START ***************
		{
			STATUS: {
				KNOBS: {
					CC: 176
				},
				PADS: {
					NOTE: 148,
					CC: 180,
					PC: 196
				}
			},
			PADS: [
				{CC:1, PC:0}, //PAD01
				{CC:2, PC:1}, //PAD02
				{CC:3, PC:2}, //PAD03
				{CC:4, PC:3}, //PAD04
				{CC:5, PC:4}, //PAD05
				{CC:6, PC:5}, //PAD06
				{CC:7, PC:6}, //PAD07
				{CC:8, PC:7}, //PAD08
				{CC:9, PC:8}, //PAD09
				{CC:10, PC:9}, //PAD10
				{CC:11, PC:10}, //PAD11
				{CC:12, PC:11}, //PAD12
				{CC:13, PC:12}, //PAD13
				{CC:14, PC:13}, //PAD14
				{CC:15, PC:14}, //PAD15
				{CC:16, PC:15} //PAD16
			],
			KNOBS: [
				{CC: 18, ccH: 'ud.userControl1'}, //K1
				{CC: 19, ccH: 'ud.userControl2'}, //K2
				{CC: 20, ccH: 'ud.userControl3'}, //K3
				{CC: 21, ccH: 'ud.userControl4'}, //K4
				{CC: 22, ccH: 'ud.userControl5'}, //K5
				{CC: 23, ccH: 'ud.userControl6'}, //K6
				{CC: 24, ccH: 'ud.userControl7'}, //K7
				{CC: 25, ccH: 'ud.userControl8'} //K8
			],
			JOYSTICK: {
				LEFT: {CC:38, ccH: 'tk.trackBankLeft'},
				RIGHT: {CC: 39, ccH: 'tk.trackBankRight'},
				UP: {CC: 40, ccH: 'tk.trackBankUp'},
				DOWN: {CC: 41, ccH: 'tk.trackBankDown'}
			}
		}
	];

	this.joysticks = [
		new co.nri.Joystick(),
		new co.nri.Joystick(),
		new co.nri.Joystick(),
		new co.nri.Joystick()
	];

	this.init = function() {
		//Build functions map
		for(var i=0; i<self.PROGS.length; i++) {
			var prog = self.PROGS[i];
			for(var j=0; j<prog.KNOBS; j++) {
				var knob = prog.KNOBS[j];
				handlersRegistry.addMidiMessage(knob.ccH, prog.STATUS.KNOBS.CC, knob.CC);
			}
			for(var j=0; j<prog.PADS; j++) {
				var pad = prog.PADS[j];
				handlersRegistry.addMidiMessage(pad.ccH, prog.STATUS.PADS.CC, pad.CC);
				handlersRegistry.addMidiMessage(pad.pcH, prog.STATUS.PADS.PC, pad.PC);
			}
			handlersRegistry.addMidiMessage(prog.JOYSTICK.LEFT.ccH, prog.STATUS.KNOBS.CC, prog.JOYSTICK.LEFT.CC);
			handlersRegistry.addMidiMessage(prog.JOYSTICK.RIGHT.ccH, prog.STATUS.KNOBS.CC, prog.JOYSTICK.RIGHT.CC);
			handlersRegistry.addMidiMessage(prog.JOYSTICK.UP.ccH, prog.STATUS.KNOBS.CC, prog.JOYSTICK.UP.CC);
			handlersRegistry.addMidiMessage(prog.JOYSTICK.DOWN.ccH, prog.STATUS.KNOBS.CC, prog.JOYSTICK.DOWN.CC);

			//Wrap Joystick handlers.
			self.wrapInJoystick('up', i, prog.JOYSTICK.UP.ccH);
			self.wrapInJoystick('down', i, prog.JOYSTICK.DOWN.ccH);
			self.wrapInJoystick('left', i, prog.JOYSTICK.LEFT.ccH);
			self.wrapInJoystick('right', i, prog.JOYSTICK.RIGHT.ccH);
		}
	};

	this.wrapInJoystick = function(direction, prog, handlerId) {
		var _handler = handlersRegistry.getHandler(handlerId);
		if(!_handler) return;
		var wrappedHandlerId = self.encodeJoystickHandlerId(prog, handlerId);
		switch(direction) {
			case 'up':
				self.joysticks[prog].addUpCallback(_handler);
				handlersRegistry.setHandler(wrappedHandlerId, self.joysticks[prog].up);
				break;
			case 'down':
				self.joysticks[prog].addDownCallback(_handler);
				handlersRegistry.setHandler(wrappedHandlerId, self.joysticks[prog].down);
				break;
			case 'left':
				self.joysticks[prog].addLeftCallback(_handler);
				handlersRegistry.setHandler(wrappedHandlerId, self.joysticks[prog].left);
				break;
			case 'right':
				self.joysticks[prog].addRightCallback(_handler);
				handlersRegistry.setHandler(wrappedHandlerId, self.joysticks[prog].right);
				break;
		}
	};

	this.getFunctionId = function (status, data1) {
		for(var i=0; i<self.PROGS.length; i++) {
			var handler;
			if(self.PROGS[i].STATUS.KNOBS.CC === status) {
				handler = self.getKnobOrJoystickHandler(i, data1);
			}
			if(self.PROGS[i].STATUS.PADS.CC === status) {
				handler = self.getPadCCHandler(i, data1);
			}
			if(self.PROGS[i].STATUS.PADS.PC === status) {
				handler = self.getPadPCHandler(i, data1);
			}
			if (handler) return handler;
		}
		return null;
	};

	this.encodeJoystickHandlerId = function(prog, handlerId) {
		return 'j.' + prog + '.' + handlerId;

	};
	
	this.getKnobOrJoystickHandler = function(prog, cc) {
		var knobs = self.PROGS[prog].KNOBS;
		for(var i=0; i<knobs.length; i++) {
			if(knobs[i].CC === cc) {
				return knobs[i].ccH;
			}
		}
		var joystick = self.PROGS[prog].JOYSTICK;
		if(joystick.LEFT.CC === cc) {
			return self.encodeJoystickHandlerId(prog, joystick.LEFT.ccH);
		}
		if(joystick.RIGHT.CC === cc) {
			return self.encodeJoystickHandlerId(prog, joystick.RIGHT.ccH);
		}
		if(joystick.UP.CC === cc) {
			return self.encodeJoystickHandlerId(prog, joystick.UP.ccH);
		}
		if(joystick.DOWN.CC === cc) {
			return self.encodeJoystickHandlerId(prog, joystick.DOWN.ccH)		;
		}
		return null;
	};
	
	this.getPadCCHandler = function(prog, cc) {
		var pads = self.PROGS[prog].PADS;
		for(var i=0; i<pads.length; i++) {
			if(pads[i].CC === cc) {
				return pads[i].ccH;
			}
		}
		return null;
	};
	
	this.getPadPCHandler = function(prog, pc) {
		var pads = self.PROGS[prog].PADS;
		for(var i=0; i<pads.length; i++) {
			if(pads[i].PC === pc) {
				return pads[i].pcH;
			}
		}
		return null;
	};
};