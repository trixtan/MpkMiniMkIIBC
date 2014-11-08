var net = require('net');
var fs = require('fs');

var server = net.createServer(
  function (socket) {

    socket.on('data', function(data) {

      var messagetxt = "";

      // Convert bytes to string
      for(var i = 0; i < data.length; i++) {
        messagetxt += String.fromCharCode(data[i]);
      }
      // Print message to console
      console.log(messagetxt);
    });
  }

);

// Start server
console.log("Listening on 127.0.0.1:58008 ...");
server.listen(58008, '127.0.0.1');