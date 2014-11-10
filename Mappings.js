const MKII_MAPPINGS = {
	PROG01: {
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
			{CC: 2}, //K1
			{CC: 3}, //K2
			{CC: 4}, //K3
			{CC: 5}, //K4
			{CC: 6}, //K5
			{CC: 7}, //K6
			{CC: 8}, //K7
			{CC: 9} //K8
		]
	},
	PROG02: {
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
			{CC: 2}, //K1
			{CC: 3}, //K2
			{CC: 4}, //K3
			{CC: 5}, //K4
			{CC: 6}, //K5
			{CC: 7}, //K6
			{CC: 8}, //K7
			{CC: 9} //K8
		]
	},
	PROG03: {
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
			{CC: 10}, //K1
			{CC: 11}, //K2
			{CC: 12}, //K3
			{CC: 13}, //K4
			{CC: 14}, //K5
			{CC: 15}, //K6
			{CC: 16}, //K7
			{CC: 17} //K8
		]
	},
	PROG04: {
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
			{CC: 18}, //K1
			{CC: 19}, //K2
			{CC: 20}, //K3
			{CC: 21}, //K4
			{CC: 22}, //K5
			{CC: 23}, //K6
			{CC: 24}, //K7
			{CC: 25} //K8
		]
	}
};

var mappings = {
	// Transport Controls
	play: MKII_MAPPINGS.PROG01.PADS[0].CC,
	stop: MKII_MAPPINGS.PROG01.PADS[1].CC,
	rec: MKII_MAPPINGS.PROG01.PADS[2].CC,
	loop: MKII_MAPPINGS.PROG01.PADS[3].CC,
	tap: MKII_MAPPINGS.PROG01.PADS[4].CC,
	od: MKII_MAPPINGS.PROG01.PADS[5].CC,
	
	noteInputs = [
		//First element in array is consumeEvent
		[false, "MPKmini mkII Keys", "80????", "90????", "B001??", "B040??", "D0????", "E0????"],
		[true, "MPKmini mkII Pads PROG1", "81????", "91????", "D1????", "E1????"],
		[true, "MPKmini mkII Pads PROG2", "82????", "92????", "D2????", "E2????"],
		[true, "MPKmini mkII Pads PROG3", "83????", "93????", "D3????", "E3????"],
		[true, "MPKmini mkII Pads PROG4", "84????", "94????", "D4????", "E4????"],
	]
};

mappings.isAKnob = function(status) {
	return MKII_MAPPINGS.PROG01.STATUS.KNOBS.CC === status ||
	MKII_MAPPINGS.PROG02.STATUS.KNOBS.CC === status ||
	MKII_MAPPINGS.PROG03.STATUS.KNOBS.CC === status ||
	MKII_MAPPINGS.PROG04.STATUS.KNOBS.CC === status;
};

mappings.isTransportControlStatus = function() {
	return MKII_MAPPINGS.PROG01.STATUS.PADS.CC === status;
};

mappings.getPageParameterControlKnobIndex(status, cc) {
	if (MKII_MAPPINGS.PROG01.STATUS.KNOBS.CC != status &&
		MKII_MAPPINGS.PROG02.STATUS.KNOBS.CC != status)
		return null;
	return mappings.getKnobZeroBasedIndex(MKII_MAPPINGS.PROG01.STATUS.KNOBS.CC, cc) || 
		mappings.getKnobZeroBasedIndex(MKII_MAPPINGS.PROG02.STATUS.KNOBS.CC, cc);
};

mappings.getMacroControlKnobIndex(status, cc) {
	if (MKII_MAPPINGS.PROG03.STATUS.KNOBS.CC != status) return null;
	return mappings.getKnobZeroBasedIndex(MKII_MAPPINGS.PROG03.STATUS.KNOBS.CC, cc);
};

mappings.getUserDeviceControlKnobIndex(status, cc) {
	if (MKII_MAPPINGS.PROG04.STATUS.KNOBS.CC != status) return null;
	return mappings.getKnobZeroBasedIndex(MKII_MAPPINGS.PROG04.STATUS.KNOBS.CC, cc);
};

mappings.isAPadNote(status) {
	return MKII_MAPPINGS.PROG01.STATUS.PADS.NOTE === status ||
		MKII_MAPPINGS.PROG02.STATUS.PADS.NOTE === status ||
		MKII_MAPPINGS.PROG03.STATUS.PADS.NOTE === status ||
		MKII_MAPPINGS.PROG04.STATUS.PADS.NOTE === status;
};

mappings.getZeroBasedPadIndexFromNoteStatus(status) {
	if(MKII_MAPPINGS.PROG01.STATUS.PADS.NOTE === status) return 0;
	if(MKII_MAPPINGS.PROG02.STATUS.PADS.NOTE === status) return 1;
	if(MKII_MAPPINGS.PROG03.STATUS.PADS.NOTE === status) return 2;
	if(MKII_MAPPINGS.PROG04.STATUS.PADS.NOTE === status) return 3;
	return 0;
};

mappings.isAParameterPageChangeStatus(status) {
	return MKII_MAPPINGS.PROG01.STATUS.PADS.PC === status ||
		MKII_MAPPINGS.PROG02.STATUS.PADS.PC === status;
};

function getParameterPageFromStatusAndPc(pcStatus, pc) {
  if (MKII_MAPPINGS.PROG01.STATUS.PADS.PC != status &&
		MKII_MAPPINGS.PROG02.STATUS.PADS.PC != status)
		return null;
	return mappings.getPadZeroBasedIndexFromPc(MKII_MAPPINGS.PROG01.STATUS.PADS.PC, pc) || 
		mappings.getPadZeroBasedIndexFromPc(MKII_MAPPINGS.PROG02.STATUS.PADS.PC, pc);
}

mappings.getKnobZeroBasedIndex = function (status, cc) {
	//Find first knob bank matching the status
	var knobs = null;
	if(MKII_MAPPINGS.PROG01.STATUS.KNOBS.CC === status) {
		knobs = MKII_MAPPINGS.PROG01.KNOBS;
	}
	else if(MKII_MAPPINGS.PROG02.STATUS.KNOBS.CC === status) {
		knobs = MKII_MAPPINGS.PROG02.KNOBS;
	}
	else if(MKII_MAPPINGS.PROG03.STATUS.KNOBS.CC === status) {
		knobs = MKII_MAPPINGS.PROG03.KNOBS;
	}
	else if(MKII_MAPPINGS.PROG04.STATUS.KNOBS.CC === status) {
		knobs = MKII_MAPPINGS.PROG04.KNOBS;
	}
	if(!knobs) return null;
	//Search first knob with this CC
	for (var i=0; i<knobs.length; i++) {
		if(cc === knobs[i].cc) {
			return i;
		}
	}
	return null;
};

mappings.getPadZeroBasedIndexFromPc = function (status, pc) {
	var pads = null;
	if(MKII_MAPPINGS.PROG01.STATUS.PADS.PC === status) {
		pads = MKII_MAPPINGS.PROG01.PADS;
	}
	else if(MKII_MAPPINGS.PROG02.STATUS.PADS.PC === status) {
		pads = MKII_MAPPINGS.PROG02.PADS;
	}
	else if(MKII_MAPPINGS.PROG03.STATUS.PADS.PC === status) {
		pads = MKII_MAPPINGS.PROG03.PADS;
	}
	else if(MKII_MAPPINGS.PROG04.STATUS.PADS.PC === status) {
		pads = MKII_MAPPINGS.PROG04.PADS;
	}
	if(!pads) return null;
	//Search first pad with this PC
	for (var i=0; i<pads.length; i++) {
		if(pc === pads[i].pc) {
			return i;
		}
	}
	return null;
};

mappings.getPadZeroBasedIndexFromCc = function (status, cc) {
	var pads = null;
	if(MKII_MAPPINGS.PROG01.STATUS.PADS.CC === status) {
		pads = MKII_MAPPINGS.PROG01.PADS;
	}
	else if(MKII_MAPPINGS.PROG02.STATUS.PADS.CC === status) {
		pads = MKII_MAPPINGS.PROG02.PADS;
	}
	else if(MKII_MAPPINGS.PROG03.STATUS.PADS.CC === status) {
		pads = MKII_MAPPINGS.PROG03.PADS;
	}
	else if(MKII_MAPPINGS.PROG04.STATUS.PADS.CC === status) {
		pads = MKII_MAPPINGS.PROG04.PADS;
	}
	if(!pads) return null;
	//Search first pad with this PC
	for (var i=0; i<pads.length; i++) {
		if(pc === pads[i].cc) {
			return i;
		}
	}
	return null;
};