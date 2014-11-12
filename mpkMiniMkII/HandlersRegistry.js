co.nri.HandlersRegistry = function HandlersRegistry() {
	var self = this;
	this._registry = {
		status: {}
	};
	
	this._initHandlerIfNeeded = function(functionId) {
		if('status' === functionId) return;
		if(!self._registry[functionId]) {
			self._registry[functionId] = {
				handler: null,
				midiMessages: []
			};
		}
	};
	
	this.setHandler = function(functionId, handler) {
		self._initHandlerIfNeeded(functionId);
		self._registry[functionId].handler = handler;
	};
	
	this.addMidiMessage = function(functionId, status, target) {
		self._initHandlerIfNeeded(functionId);
		self._registry[functionId].midiMessages.push({
			status: status,
			target: target
		});
	};
	
	this.getHandler = function(functionId) {
		return self._registry[functionId] ? self._registry[functionId].handler : null;
	};
	
	this.getMidiMessages = function(functionId) {
		return self._registry[functionId] ? self._registry[functionId].midiMessages : null;
	};
	
	this.getStatus = function(statusId) {
		return self._registry.status[statusId] ? self._registry.status[statusId] : null;
	};
	
	this.setStatus = function(statusId, status) {
		self._registry.status[statusId] = status;
	};
	
};