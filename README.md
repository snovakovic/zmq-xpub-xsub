# ZeroMQ xpub/xsub

Central hub for ZeroMQ.
Central hub allows us to have multiple publisher and subscribers on same port.

### Dependencies

1) [ZeroMQ](http://zeromq.org/)

### Example of usage

1) Install ZeroMq and run application.
2) By default xsub is run on port 8700 and xpub is run on port 8701 this can be changed by using custom XSUB_PORT and XPUB_PORT environment variables.
3) Now in other application we can connect to xpub/xsub as described in example below


```javascript
//https://github.com/JustinTulloss/zeromq.node
const zmq = require('zmq');

// Subscriber
const subscriber = zmq.socket('sub');
subscriber.connect('xpub-address');

subscriber.on('message', (key, message) => {
  console.log('Message is recived:', key, message);
}));

// Publisher
const publisher = zmq.socket('pub');
publisher.connect('xsub-address');

publisher.send(['key', 'message'])
```

