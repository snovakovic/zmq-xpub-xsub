const Config = require('config');
const Zmq = require('zmq');


// xsub
const xsub = Zmq.socket('xsub');
xsub.bindSync(`tcp://*:${Config.get('xsub.port')}`);

// xpub
const xpub = Zmq.socket('xpub');
xpub.setsockopt(Zmq.ZMQ_XPUB_VERBOSE, 1);
xpub.bindSync(`tcp://*:${Config.get('xpub.port')}`);

// Message pump
xsub.on('message', (...args) => xpub.send(args));

// Subscription pump
xpub.on('message', data => xsub.send(data));
