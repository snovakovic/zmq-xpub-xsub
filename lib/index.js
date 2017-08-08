const minimist = require('minimist');
const Zmq = require('zmq');


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
};


// Launched as standalone script
if (require.main === module) {
  const argv = minimist((process.argv.slice(2)));
  exports.run(argv);
}
