var WebSocketServer = require('ws').Server;

module.exports = function(server) {
  var wss = new WebSocketServer({
    server: server,
    path: '/sockets'
  });

  wss.addEventListener('connect', function(ws) {
    console.log('new connection!');

    ws.on('message', function(message) {
      console.log('message:', message);
    });

    ws.on('close', function() {
      console.log('connection closed');
    });

    ws.send('welcome');
  });
};
