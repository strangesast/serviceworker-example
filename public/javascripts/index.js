// index.js
console.log('hellooo');

var registerWorker = function() {
  return navigator.serviceWorker.register('/sw.js').then(function(registration) {
    var serviceWorker = registration.installing || registration.waiting || registration.active;
    if(serviceWorker.state == 'activated') return Promise.resolve(serviceWorker);
    return new Promise(function(resolve, reject) {
      var stateChangeListener = function(e) {
        if(e.target.state === 'activated') {
          serviceWorker.removeEventListener('statechange', stateChangeListener, false);
          return resolve(e.target);
        }
      };
      serviceWorker.addEventListener('statechange', stateChangeListener, false);
    });
  });
};

var sendMessage = function(message) {
  return new Promise(function(resolve, reject) {
    var messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = function(e) {
      if (e.data.error) {
        reject(e.data.error);
      } else {
        resolve(e.data);
      }
    };
    navigator.serviceWorker.controller.postMessage(message,
      [messageChannel.port2]);
  });
};

navigator.serviceWorker.addEventListener('message', function(e) {
  console.log('new message');
  console.log(e.data);
});
