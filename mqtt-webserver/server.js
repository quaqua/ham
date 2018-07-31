var mosca = require('mosca');
var http = require('http')
  , httpServ = http.createServer()
  , mosca = require('mosca')
  , server = new mosca.Server({});

server.attachHttpServer(httpServ);

const timeouts = {};

httpServ.listen(5111);

server.on('clientConnected', function(client) {
  console.log('client connected', client.id);
});

server.on('clientDisconnected', function(client) {
  console.log('client disconnected', client.id);
});

server.on('published', function(packet, client) {
  var str = packet.payload.toString('utf8');
  var payload = str;
  try {
    payload = JSON.parse(str);
    if (packet.topic === '@shutter/request') {
      payload.acting = payload.value !== 0;
      if (timeouts[payload.port]) {
        clearTimeout(timeouts[payload.port]);
      }
      server.publish({
        topic: '@shutter/act',
        payload: JSON.stringify(payload),
        qos: 0,
      });
      if (payload.acting) {
        timeouts[payload.port] = setTimeout(function() {
          payload.acting = false;
          server.publish({
            topic: '@shutter/act',
            payload: JSON.stringify(payload),
            qos: 1,
            retain: false,
          });
        }, 5000);
      }
    }
  } catch(e) {}
});

server.on('subscribed', function(topic, client) {
  console.log('subscribed: ' + client.id);
});

server.on('unsubscribed', function(topic, client) {
  console.log('unsubscribed: ' + client.id);    
});

server.on('ready', function() {
  console.log('Mosca server is up and running on port 4111');
});
