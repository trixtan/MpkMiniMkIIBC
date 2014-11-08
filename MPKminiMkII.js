const PARAMETER_PAGES_COUNT = 32;

const MIN_PAGE_SWITCH_PROGRAM_CHANGE = 0;
const MAX_PAGE_SWITCH_PROGRAM_CHANGE = 31;

const KNOBS_CC_STATUS = 176;
const PADS_PROG_1_CC_STATUS = 177;
const PADS_PROG_2_CC_STATUS = 178;
const PAGE_MODE_1_PC_STATUS = 193;
const PAGE_MODE_2_PC_STATUS = 194;

function MpkMiniMkII(device, host) {
  var self = this;
  this.parameterPages = [];

  this.init = function() {

    //Initializes pages
    for(var i=0; i<PARAMETER_PAGES_COUNT; i++) {
      self.parameterPages.push(new ParameterPage());
    }

    //Popup active Page name observer
    device.addSelectedPageObserver(-1, function (pageIndex) {
      if(pageIndex < 0 ) return;

    });

    device.addPageNamesObserver(function () {
      if(!arguments) return;
      for(var i=0; i<arguments.length && i<PARAMETER_PAGES_COUNT; i++) {
        self.parameterPages[i].name = arguments[i];
      }
    });
  };

  this.togglePage = function(pageIndex) {
    if(pageIndex < MIN_PAGE_SWITCH_PROGRAM_CHANGE ||
      pageIndex > MAX_PAGE_SWITCH_PROGRAM_CHANGE) {
      return;
    }
    device.setParameterPage(pageIndex);
    host.showPopupNotification(self.parameterPages[pageIndex].name);
  };

  this.toggleOnOffParameter = function(parameterIndex, val) {
    device.getParameter(parameterIndex).set(val > 0 ? 128 : 0, 128);
  };

  this.handleMidi = function (status, data1, data2) {
    if(status === PAGE_MODE_1_PC_STATUS || status === PAGE_MODE_2_PC_STATUS) {
      //Handle page change
      self.togglePage(getPageFromStatusAndPC(status, data1));
    } else if (status === PADS_PROG_1_CC_STATUS || status === PADS_PROG_2_CC_STATUS) {
      //Handle toggles
      this.toggleOnOffParameter(getToggleParameterIndexFromCC(data1), data2);
    } else if(status === KNOBS_CC_STATUS) {
      device.getParameter(getKnobParameterIndexFromCC(data1)).set(data2, 128);
    }
  };

};

function getToggleParameterIndexFromCC(cc) {
  //In every page, positions 8 to 23 are for on/off controls
  return cc - 1 + 8;
};

function getKnobParameterIndexFromCC(cc) {
  //In every page, positions 0 to 7 are for knobs controls
  return cc - 2;
};

function logToNode(message)
{
	host.connectToRemoteHost('127.0.0.1', 58008, function(conn) {


    conn.send(message.getBytes());
    conn.disconnect();

  });
}

function getPageFromStatusAndPC (pcStatus, pc) {
  if(pcStatus === PAGE_MODE_1_PC_STATUS) return pc;
  if(pcStatus === PAGE_MODE_2_PC_STATUS) return pc + 15;
}

function ParameterPage() {
  var self = this;
  this.name = null;

};