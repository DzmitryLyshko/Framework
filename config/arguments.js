const options = require('yargs')
    .scriptName('npx wdio run wdio.conf.js')
    .option('b', {
        alias: 'browser',
        type: 'string',
        describe: 'Set browser for testing'
    })
    .option('s', {
        alias: 'suite',
        type: 'string',
        desribe: 'Set testing suite'
    })
    .argv;

module.exports = options;
