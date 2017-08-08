#!/usr/bin/env node

const ZmqPs = require('../lib/index.js');
const minimist = require('minimist');


const argv = minimist((process.argv.slice(2)));

if (argv.debug) {
  ZmqPs.set('debug', true);
}

ZmqPs.run({
  xSubPort: argv.xSubPort,
  xPubPort: argv.xPubPort
});
