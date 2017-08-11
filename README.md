# zmq-xpub-xsub

Central hub for ZeroMQ that allows multiple publisher and subscribers on same port.

### Dependencies

* [ZeroMQ](http://zeromq.org/)

### Options

* xSubPort - 8700 default
* xPubPort - 8701 default

### Starting zmq-xpub-xsub

zmq-xpub-xsub can be started directly from terminal or it can be required and started from hosted application.
Host application can be used for purpose of deploying to different environments
where host application will define deployment configuration.

* Starting zmq-xpub-xsub with host application

```javascript
const ZmqPs= require('zmq-xpub-xsub');

// Log xSubPort and xPubPort to console
ZmqPs.set('debug', true);

// Start zmq-xpub-xsub on provided ports
ZmqPs.run({ xSubPort: 8000, xPubPort: 8001 });
```

* Starting zmq-xpub-xsub from terminal (after running **npm install zmq-xpub-xsub -g**)

```javascript
>> zqm-xpub-xsub --xSubPort 8000 --xPubPort 8001

// If we want to see ports on which xpub-xsub is listening we can provide --debug flag
>> zmq-xpub-xsub --debug
```

### Example of usage

1) Install and configure ZeroMq.
2) Start zmq-xpub-xsub lib
3) Example below illustrate usage of xpub/xsub application as a messaging hub.

subscriber.connect &&  publisher.connect will now work in node cluster mode.

```javascript
// Not required! used for example only
const zmq = require('zmq'); //https://github.com/JustinTulloss/zeromq.node

const config = {
  baseAddress: 'tcp://127.0.0.1',
  xSubPort: 8000,
  xPubPort: 8001
}

// Subscriber
const subscriber = zmq.socket('sub');
subscriber.connect(`${config.baseAddress}:${config.xPubPort}`);

subscriber.on('message', (key, message) => {
  console.log('Message is recived:', key, message);
}));

// Publisher
const publisher = zmq.socket('pub');
publisher.connect(`${config.baseAddress}:${config.xSubPort}`);

publisher.send(['key', 'message'])
```

