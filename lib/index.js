const Zmq = require('zmq');


const internals = {
  debug: false
};

/**
 * zmq-xpub-xsub can be started from hosted application by requiring module
 * or it can be started directly from console
 */
exports.run = (options = {}) => {
  const xSubPort = Number(options.xSubPort) || 8700;
  const xPubPort = Number(options.xPubPort) || 8701;

  const xsub = Zmq.socket('xsub');
  xsub.bindSync(`tcp://*:${xSubPort}`);

  const xpub = Zmq.socket('xpub');
  xpub.setsockopt(Zmq.ZMQ_XPUB_VERBOSE, 1);
  xpub.bindSync(`tcp://*:${xPubPort}`);

  // Message pump
  xsub.on('message', (...args) => xpub.send(args));

  // Subscription pump
  xpub.on('message', data => xsub.send(data));

  if (internals.debug === true) {
    console.info(`zmq-xpub-xsub listening at { xSubPort: ${xSubPort}, xPubPort: ${xPubPort} }`);
  }
};

exports.set = (key, value) => {
  if (key in internals) {
    internals[key] = value;
  }
};
